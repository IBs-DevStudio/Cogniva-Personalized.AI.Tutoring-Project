import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getBookmarks } from "@/lib/actions/bookmarks.action";
import BookmarksClient from "@/components/bookmarks/BookmarksClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bookmarked Companions - Cogniva",
  description: "View and launch your saved AI companions and practice sessions.",
};

const BookmarksPage = async () => {
  const { userId } = await auth();

  // Guard: Only signed-in users can access this page
  if (!userId) {
    redirect("/sign-in");
  }

  const initialBookmarks = await getBookmarks();

  return (
    <main className="min-h-[85vh]">
      <BookmarksClient initialBookmarks={initialBookmarks} />
    </main>
  );
};

export default BookmarksPage;
