"use client";

import { useState, useEffect, useCallback } from "react";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { toggleBookmarkAction, removeBookmarkAction } from "@/lib/actions/bookmarks.action";

export interface BookmarkedItem {
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

const BOOKMARK_EVENT = "cogniva-bookmarks-change";

export const useBookmarks = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const [bookmarks, setBookmarks] = useState<BookmarkedItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Helper to load bookmarks for the current user
  const loadUserBookmarks = useCallback(() => {
    if (!isSignedIn || !user) {
      setBookmarks([]);
      setIsLoading(false);
      return;
    }

    const storageKey = `cogniva_bookmarks_${user.id}`;
    let cachedList: BookmarkedItem[] = [];

    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        cachedList = JSON.parse(stored);
      }
    } catch {
      // ignore JSON parse errors
    }

    // Merge/check with user.unsafeMetadata if available
    const metadataBookmarks = (user.unsafeMetadata?.bookmarks as BookmarkedItem[]) || [];

    // Use metadata if available, otherwise cachedList
    const finalList = metadataBookmarks.length > 0 ? metadataBookmarks : cachedList;
    setBookmarks(finalList);

    // Ensure localStorage has it
    if (finalList.length > 0) {
      try {
        localStorage.setItem(storageKey, JSON.stringify(finalList));
      } catch {
        // ignore storage errors
      }
    }

    setIsLoading(false);
  }, [user, isSignedIn]);

  useEffect(() => {
    if (isLoaded) {
      loadUserBookmarks();
    }
  }, [isLoaded, loadUserBookmarks]);

  // Listen for bookmark change events across components
  useEffect(() => {
    const handleBookmarkChange = (e: Event) => {
      const customEvent = e as CustomEvent<BookmarkedItem[]>;
      if (customEvent.detail && Array.isArray(customEvent.detail)) {
        setBookmarks(customEvent.detail);
      } else {
        loadUserBookmarks();
      }
    };

    window.addEventListener(BOOKMARK_EVENT, handleBookmarkChange);
    return () => {
      window.removeEventListener(BOOKMARK_EVENT, handleBookmarkChange);
    };
  }, [loadUserBookmarks]);

  const isBookmarked = useCallback(
    (id: string) => {
      return bookmarks.some((item) => String(item.id) === String(id));
    },
    [bookmarks]
  );

  const toggleBookmark = useCallback(
    async (companion: BookmarkedItem): Promise<boolean> => {
      if (!isLoaded) return false;

      if (!isSignedIn || !user) {
        toast.error("Sign-in required", {
          description: "Please sign in to bookmark your favorite tutors and access them anytime.",
        });
        return false;
      }

      const companionIdStr = String(companion.id);
      const isCurrentlyBookmarked = bookmarks.some(
        (b) => String(b.id) === companionIdStr
      );

      // Optimistic update
      let updatedList: BookmarkedItem[];
      if (isCurrentlyBookmarked) {
        updatedList = bookmarks.filter((b) => String(b.id) !== companionIdStr);
      } else {
        updatedList = [
          {
            ...companion,
            bookmarkedAt: new Date().toISOString(),
          },
          ...bookmarks,
        ];
      }

      setBookmarks(updatedList);

      // Update local storage cache
      try {
        localStorage.setItem(
          `cogniva_bookmarks_${user.id}`,
          JSON.stringify(updatedList)
        );
      } catch {
        // ignore
      }

      // Notify other components
      window.dispatchEvent(
        new CustomEvent(BOOKMARK_EVENT, { detail: updatedList })
      );

      // Show user feedback
      if (!isCurrentlyBookmarked) {
        toast.success(`Saved to bookmarks`, {
          description: `"${companion.name}" is now in your bookmarked collection.`,
        });
      } else {
        toast.info(`Removed from bookmarks`, {
          description: `"${companion.name}" was removed from your collection.`,
        });
      }

      // Sync with server action in background
      try {
        await toggleBookmarkAction(companion);
      } catch (err) {
        console.error("Failed to sync bookmark with server:", err);
      }

      return !isCurrentlyBookmarked;
    },
    [bookmarks, isLoaded, isSignedIn, user]
  );

  const removeBookmark = useCallback(
    async (companionId: string): Promise<void> => {
      if (!isSignedIn || !user) return;

      const companionIdStr = String(companionId);
      const target = bookmarks.find((b) => String(b.id) === companionIdStr);
      const updatedList = bookmarks.filter((b) => String(b.id) !== companionIdStr);

      setBookmarks(updatedList);
      try {
        localStorage.setItem(
          `cogniva_bookmarks_${user.id}`,
          JSON.stringify(updatedList)
        );
      } catch {
        // ignore
      }

      window.dispatchEvent(
        new CustomEvent(BOOKMARK_EVENT, { detail: updatedList })
      );

      if (target) {
        toast.info(`Removed from bookmarks`, {
          description: `"${target.name}" was removed from your collection.`,
        });
      }

      try {
        await removeBookmarkAction(companionId);
      } catch (err) {
        console.error("Failed to sync removal with server:", err);
      }
    },
    [bookmarks, isSignedIn, user]
  );

  return {
    bookmarks,
    isLoading,
    isBookmarked,
    toggleBookmark,
    removeBookmark,
    isAuthenticated: !!isSignedIn,
  };
};
