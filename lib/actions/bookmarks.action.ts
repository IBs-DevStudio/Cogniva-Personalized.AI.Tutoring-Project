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
  } catch (error) {
    console.error("Failed to fetch bookmarks for user:", error);
    return [];
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
    throw new Error("Unauthorized: Please sign in to bookmark companions");
  }

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

  await client.users.updateUserMetadata(userId, {
    unsafeMetadata: {
      ...user.unsafeMetadata,
      bookmarks: updatedList,
    },
  });

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
    throw new Error("Unauthorized: Please sign in to modify bookmarks");
  }

  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  const currentBookmarks = (user.unsafeMetadata?.bookmarks as BookmarkedCompanionData[]) || [];
  const existingList = Array.isArray(currentBookmarks) ? currentBookmarks : [];

  const updatedList = existingList.filter(
    (item) => String(item.id) !== String(companionId)
  );

  await client.users.updateUserMetadata(userId, {
    unsafeMetadata: {
      ...user.unsafeMetadata,
      bookmarks: updatedList,
    },
  });

  revalidatePath("/bookmarks");
  if (path) {
    revalidatePath(path);
  }

  return { success: true, bookmarks: updatedList };
};
