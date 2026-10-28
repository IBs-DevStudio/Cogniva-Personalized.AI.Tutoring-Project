"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export interface BookmarkedCompanionData {
  id: string;
  name: string;
  topic: string;
  subject: string;
  duration: number;
  color?: string;
  voice?: string;
  style?: string;
  bookmarkedAt?: string;
}

/**
 * Retrieve all bookmarks for the currently authenticated user
 */
export const getBookmarks = async (): Promise<BookmarkedCompanionData[]> => {
  const { userId } = await auth();
  if (!userId) return [];

  try {
    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    const bookmarks = (user.unsafeMetadata?.bookmarks as BookmarkedCompanionData[]) || [];
    return Array.isArray(bookmarks) ? bookmarks : [];
  } catch (error: any) {
    if (error?.status === 429) {
      console.warn("Clerk rate limit on getBookmarks; returning empty list fallback.");
    } else {
      console.error("Failed to fetch bookmarks for user:", error);
    }
    return [];
  }
};

/**
 * Sync entire bookmark list directly to Clerk user metadata (used by debounced client sync)
 */
export const syncBookmarksAction = async (
  bookmarks: BookmarkedCompanionData[],
  path?: string
): Promise<{ success: boolean; count: number }> => {
  const { userId } = await auth();
  if (!userId) return { success: false, count: 0 };

  try {
    const client = await clerkClient();
    await client.users.updateUserMetadata(userId, {
      unsafeMetadata: {
        bookmarks: bookmarks.slice(0, 100),
      },
    });

    revalidatePath("/bookmarks");
    if (path) revalidatePath(path);
    return { success: true, count: bookmarks.length };
  } catch (err: any) {
    if (err?.status === 429) {
      console.warn("Clerk rate-limit (429) during bookmark sync. Preserved in local storage.");
      return { success: false, count: bookmarks.length };
    }
    console.error("Failed to sync bookmarks to Clerk:", err);
    return { success: false, count: bookmarks.length };
  }
};

/**
 * Toggle bookmark state for a companion (add if not present, remove if present)
 */
export const toggleBookmarkAction = async (
  companion: BookmarkedCompanionData,
  path?: string
): Promise<{ isBookmarked: boolean; bookmarks: BookmarkedCompanionData[] }> => {
  const { userId } = await auth();
  if (!userId) {
    return { isBookmarked: false, bookmarks: [] };
  }

  try {
    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    const currentBookmarks = (user.unsafeMetadata?.bookmarks as BookmarkedCompanionData[]) || [];
    const existingList = Array.isArray(currentBookmarks) ? currentBookmarks : [];

    const isExisting = existingList.some((item) => String(item.id) === String(companion.id));
    let updatedList: BookmarkedCompanionData[];

    if (isExisting) {
      updatedList = existingList.filter((item) => String(item.id) !== String(companion.id));
    } else {
      const newEntry: BookmarkedCompanionData = {
        ...companion,
        bookmarkedAt: new Date().toISOString(),
      };
      updatedList = [newEntry, ...existingList];
    }

    try {
      await client.users.updateUserMetadata(userId, {
        unsafeMetadata: {
          ...user.unsafeMetadata,
          bookmarks: updatedList,
        },
      });
    } catch (updateErr: any) {
      if (updateErr?.status === 429) {
        console.warn("Clerk rate-limit (429) on metadata update; local state remains active.");
      } else {
        console.error("Error updating Clerk metadata:", updateErr);
      }
    }

    revalidatePath("/bookmarks");
    revalidatePath("/dashboard");
    revalidatePath("/companions");
    revalidatePath("/explore-more");
    if (path) {
      revalidatePath(path);
    }

    return {
      isBookmarked: !isExisting,
      bookmarks: updatedList,
    };
  } catch (err: any) {
    if (err?.status === 429) {
      console.warn("Clerk 429 in toggleBookmarkAction");
    } else {
      console.error("Error in toggleBookmarkAction:", err);
    }
    return { isBookmarked: false, bookmarks: [] };
  }
};

/**
 * Remove a specific bookmark by companion ID
 */
export const removeBookmarkAction = async (
  companionId: string,
  path?: string
): Promise<{ success: boolean; bookmarks: BookmarkedCompanionData[] }> => {
  const { userId } = await auth();
  if (!userId) {
    return { success: false, bookmarks: [] };
  }

  try {
    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    const currentBookmarks = (user.unsafeMetadata?.bookmarks as BookmarkedCompanionData[]) || [];
    const existingList = Array.isArray(currentBookmarks) ? currentBookmarks : [];

    const updatedList = existingList.filter(
      (item) => String(item.id) !== String(companionId)
    );

    try {
      await client.users.updateUserMetadata(userId, {
        unsafeMetadata: {
          ...user.unsafeMetadata,
          bookmarks: updatedList,
        },
      });
    } catch (updateErr: any) {
      if (updateErr?.status === 429) {
        console.warn("Clerk rate-limit (429) on removeBookmarkAction update.");
      } else {
        console.error("Error updating Clerk metadata:", updateErr);
      }
    }

    revalidatePath("/bookmarks");
    if (path) {
      revalidatePath(path);
    }

    return { success: true, bookmarks: updatedList };
  } catch (err: any) {
    if (err?.status === 429) {
      console.warn("Clerk 429 in removeBookmarkAction");
    } else {
      console.error("Error in removeBookmarkAction:", err);
    }
    return { success: false, bookmarks: [] };
  }
};
