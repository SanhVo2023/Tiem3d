"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import type { BlogPostMeta } from "@/lib/blog";

interface BlogSearchProps {
  posts: BlogPostMeta[];
}

export function BlogSearch({ posts }: BlogSearchProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<BlogPostMeta[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Search logic
  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }

    const searchTerms = query.toLowerCase().trim().split(/\s+/);

    const filtered = posts.filter((post) => {
      const searchableText = [
        post.title,
        post.description,
        post.tags.join(" "),
      ]
        .join(" ")
        .toLowerCase();

      return searchTerms.every((term) => searchableText.includes(term));
    });

    setResults(filtered.slice(0, 5));
  }, [query, posts]);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        setIsOpen(true);
        inputRef.current?.focus();
      }
      if (event.key === "Escape") {
        setIsOpen(false);
        setQuery("");
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Tim kiem bai viet... (Ctrl+K)"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className="w-full pl-10 pr-10 py-2.5 bg-zinc-100 border border-zinc-200 rounded-full text-sm text-zinc-900 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
        />
        {query && (
          <button
            onClick={() => {
              setQuery("");
              setResults([]);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-zinc-200 rounded-full transition-colors"
          >
            <X className="h-3 w-3 text-zinc-500" />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && query.length >= 2 && (
        <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-lg border border-zinc-200 overflow-hidden z-50">
          {results.length > 0 ? (
            <div className="max-h-80 overflow-y-auto">
              {results.map((post) => (
                <Link
                  key={post.slug}
                  href={post.url}
                  onClick={() => {
                    setIsOpen(false);
                    setQuery("");
                  }}
                  className="block p-4 hover:bg-zinc-50 border-b border-zinc-100 last:border-0 transition-colors"
                >
                  <h4 className="font-medium text-zinc-900 mb-1 line-clamp-1">
                    {post.title}
                  </h4>
                  <p className="text-sm text-zinc-500 line-clamp-2">
                    {post.description}
                  </p>
                  <div className="flex gap-2 mt-2">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 bg-zinc-100 text-zinc-600 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-zinc-500 text-sm">
              Khong tim thay bai viet nao voi tu khoa "{query}"
            </div>
          )}
        </div>
      )}
    </div>
  );
}
