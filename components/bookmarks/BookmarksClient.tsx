"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import CompanionCard from "@/components/CompanionCard";
import { useBookmarks, BookmarkedItem } from "@/hooks/useBookmarks";
import { formatSubjectName, getSubjectColor } from "@/lib/utils";
import { subjects } from "@/constants";
import {
  Bookmark,
  Search,
  Sparkles,
  ArrowRight,
  Compass,
  LayoutGrid,
} from "lucide-react";

interface BookmarksClientProps {
  initialBookmarks: BookmarkedItem[];
}

const BookmarksClient = ({ initialBookmarks }: BookmarksClientProps) => {
  const { bookmarks, removeBookmark } = useBookmarks();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<string>("all");

  // Effective list: use hook's active state if loaded, otherwise fallback to server initial
  const activeBookmarks = bookmarks.length > 0 ? bookmarks : initialBookmarks;

  // Filter bookmarks by search keyword and category
  const filteredBookmarks = useMemo(() => {
    return activeBookmarks.filter((item) => {
      const matchesSearch =
        searchQuery.trim() === "" ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subject.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesSubject =
        selectedSubject === "all" ||
        item.subject.toLowerCase() === selectedSubject.toLowerCase();

      return matchesSearch && matchesSubject;
    });
  }, [activeBookmarks, searchQuery, selectedSubject]);

  // Unique subjects present in the user's bookmarks
  const availableSubjects = useMemo(() => {
    const present = new Set(activeBookmarks.map((b) => b.subject));
    return subjects.filter((s) => present.has(s));
  }, [activeBookmarks]);

  return (
    <section className="flex flex-col gap-8 pb-12">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-200 pb-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider w-fit">
            <Bookmark className="w-3.5 h-3.5 fill-current" />
            <span>Personal Collection</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Bookmarked Companions
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl">
            Quickly jump into your saved AI tutors, custom lessons, and favorite
            practice sessions.
          </p>
        </div>

        {/* Total Bookmarks Pill */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-2xl text-sm font-semibold shadow-sm">
            <Bookmark className="w-4 h-4 fill-white text-white" />
            <span>
              {activeBookmarks.length}{" "}
              {activeBookmarks.length === 1 ? "Companion" : "Companions"} Saved
            </span>
          </div>
        </div>
      </div>

      {activeBookmarks.length > 0 ? (
        <>
          {/* Controls: Search and Subject Category Filter */}
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search saved companions or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary text-sm transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600 bg-gray-100 rounded-full px-1.5 py-0.5"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Subject Filters (Horizontal scroll on mobile) */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              <button
                type="button"
                onClick={() => setSelectedSubject("all")}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedSubject === "all"
                    ? "bg-black text-white shadow-sm"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                All ({activeBookmarks.length})
              </button>
              {availableSubjects.map((sub) => {
                const count = activeBookmarks.filter(
                  (b) => b.subject === sub
                ).length;
                const isSelected = selectedSubject === sub;
                return (
                  <button
                    key={sub}
                    type="button"
                    onClick={() => setSelectedSubject(sub)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      isSelected
                        ? "bg-black text-white shadow-sm"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {formatSubjectName(sub)} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Grid of Bookmarked Companions */}
          {filteredBookmarks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBookmarks.map((companion) => (
                <CompanionCard
                  key={companion.id}
                  id={companion.id}
                  name={companion.name}
                  topic={companion.topic}
                  subject={companion.subject}
                  duration={companion.duration}
                  color={companion.color || getSubjectColor(companion.subject)}
                  onBookmarkToggle={(id, isBookmarked) => {
                    if (!isBookmarked) {
                      removeBookmark(id);
                    }
                  }}
                />
              ))}
            </div>
          ) : (
            /* Search yielded no matches */
            <div className="flex flex-col items-center justify-center py-16 px-4 text-center border-2 border-dashed border-gray-200 rounded-3xl bg-gray-50/60">
              <Search className="w-10 h-10 text-gray-400 mb-3" />
              <h3 className="text-lg font-bold text-gray-800">
                No matching bookmarks found
              </h3>
              <p className="text-sm text-gray-500 max-w-sm mt-1">
                We couldn&apos;t find any saved companions matching &ldquo;
                {searchQuery}&rdquo;. Try another term or reset filters.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedSubject("all");
                }}
                className="mt-4 px-4 py-2 bg-black text-white text-xs font-semibold rounded-xl hover:bg-black/85 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}
        </>
      ) : (
        /* Empty State: 0 Bookmarks */
        <div className="flex flex-col items-center justify-center py-16 px-6 text-center border-2 border-black/10 rounded-3xl bg-gradient-to-b from-white to-gray-50 shadow-sm max-w-2xl mx-auto w-full my-6">
          <div className="relative mb-5">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary shadow-inner">
              <Bookmark className="w-9 h-9" />
            </div>
            <div className="absolute -top-1 -right-1 bg-amber-400 text-black p-1.5 rounded-full shadow-md animate-bounce">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-2">
            No Bookmarked Companions Yet
          </h2>
          <p className="text-gray-600 text-sm sm:text-base max-w-md mb-8 leading-relaxed">
            Whenever you discover a tutor or lesson you love, click the{" "}
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-black text-white text-xs font-bold mx-1">
              <Image
                src="/icons/bookmark.svg"
                alt="bookmark"
                width={10}
                height={12}
                className="mr-1 inline"
              />
              Bookmark
            </span>{" "}
            button on their card to pin them here for fast one-click access.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Link
              href="/companions"
              className="flex items-center justify-center gap-2 bg-primary text-white font-semibold px-6 py-3 rounded-xl hover:bg-primary/90 transition-all shadow-md active:scale-95"
            >
              <LayoutGrid className="w-4 h-4" />
              <span>Browse Companion Library</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/explore-more"
              className="flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-800 font-semibold px-6 py-3 rounded-xl hover:bg-gray-50 transition-all active:scale-95"
            >
              <Compass className="w-4 h-4" />
              <span>Explore More Subjects</span>
            </Link>
          </div>
        </div>
      )}
    </section>
  );
};

export default BookmarksClient;
