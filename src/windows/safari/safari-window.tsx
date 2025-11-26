import {
  ChevronLeft,
  ChevronRight,
  Copy,
  MoveRight,
  PanelLeft,
  Plus,
  Search,
  Share,
  ShieldHalf,
} from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/constants";
import { WindowWrapper } from "@/components/window-wrapper";

export function SafariWindow() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = blogPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.date.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const featuredPost = filteredPosts[0] || blogPosts[0];
  const remainingPosts = filteredPosts.slice(1);

  return (
    <WindowWrapper
      windowType="safari"
      title="Articles"
      defaultWidth={900}
      defaultHeight={600}
      minWidth={700}
      minHeight={500}
      headerContent={
        <>
          <PanelLeft className="ml-2 h-5 w-5 cursor-pointer text-gray-600 hover:text-gray-800" />
          <div className="flex items-center gap-1">
            <ChevronLeft className="h-5 w-5 cursor-pointer text-gray-600 hover:text-gray-800" />
            <ChevronRight className="h-5 w-5 cursor-pointer text-gray-600 hover:text-gray-800" />
          </div>
          <div className="flex flex-1 items-center gap-3">
            <ShieldHalf className="h-5 w-5 text-gray-600" />
            <div className="flex flex-1 items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-1.5">
              <Search className="h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 border-none text-sm shadow-none outline-none"
              />
            </div>
          </div>
          <div className="ml-3 flex items-center gap-3">
            <Share className="h-5 w-5 cursor-pointer text-gray-600 hover:text-gray-800" />
            <Plus className="h-5 w-5 cursor-pointer text-gray-600 hover:text-gray-800" />
            <Copy className="h-5 w-5 cursor-pointer text-gray-600 hover:text-gray-800" />
          </div>
        </>
      }
    >
      <div className="h-full overflow-y-auto bg-linear-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        {/* Hero Section */}
        <div className="relative bg-linear-to-r from-blue-600 to-purple-600 px-8 py-16 text-white">
          <div className="mx-auto max-w-4xl">
            <h1 className="mb-4 text-5xl font-bold tracking-tight">
              Developer Insights
            </h1>
            <p className="max-w-2xl text-xl text-blue-100">
              Exploring modern web development, best practices, and the latest
              technologies shaping the future of the web.
            </p>
          </div>
          <div className="absolute right-0 bottom-0 left-0 h-16 bg-linear-to-t from-gray-50 to-transparent" />
        </div>

        {/* Search Results Info */}
        {searchQuery && (
          <div className="mx-auto max-w-5xl px-8 py-4">
            <p className="text-gray-600 dark:text-gray-400">
              Found{" "}
              <span className="font-semibold">{filteredPosts.length}</span>{" "}
              {filteredPosts.length === 1 ? "article" : "articles"} matching "
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                {searchQuery}
              </span>
              "
            </p>
          </div>
        )}

        {/* Featured Post */}
        {featuredPost && (
          <div className="mx-auto -mt-12 mb-12 max-w-5xl px-8">
            <div className="hover:shadow-3xl group overflow-hidden rounded-2xl bg-white shadow-2xl transition-all duration-300 dark:bg-gray-800">
              <div className="grid gap-0 md:grid-cols-2">
                <div className="relative h-64 overflow-hidden md:h-auto">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 rounded-full bg-blue-600 px-4 py-1.5 text-xs font-semibold tracking-wider text-white uppercase">
                    {searchQuery ? "Match" : "Featured"}
                  </div>
                </div>
                <div className="flex flex-col justify-center p-8">
                  <div className="mb-3 flex items-center gap-2 text-sm text-gray-500">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-blue-600" />
                    {featuredPost.date}
                  </div>
                  <h2 className="mb-4 text-3xl leading-tight font-bold text-gray-900 transition-colors group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400">
                    {featuredPost.title}
                  </h2>
                  <p className="mb-6 line-clamp-3 text-gray-600 dark:text-gray-400">
                    Dive deep into the world of TypeScript and discover why it's
                    become the go-to choice for modern developers building
                    scalable applications.
                  </p>
                  <a
                    href={featuredPost.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link inline-flex items-center gap-2 font-semibold text-blue-600 transition-all hover:gap-3"
                  >
                    Read Full Article
                    <MoveRight className="h-5 w-5 transition-transform group-hover/link:translate-x-1" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* No Results Message */}
        {searchQuery && filteredPosts.length === 0 && (
          <div className="mx-auto max-w-5xl px-8 py-16 text-center">
            <div className="rounded-2xl bg-white p-12 shadow-lg dark:bg-gray-800">
              <Search className="mx-auto mb-4 h-16 w-16 text-gray-300 dark:text-gray-600" />
              <h3 className="mb-2 text-2xl font-bold text-gray-900 dark:text-gray-100">
                No articles found
              </h3>
              <p className="mb-6 text-gray-600 dark:text-gray-400">
                We couldn't find any articles matching "
                <span className="font-semibold text-blue-600">
                  {searchQuery}
                </span>
                "
              </p>
              <Button
                variant="default"
                onClick={() => setSearchQuery("")}
                className="px-6 py-3"
              >
                Clear Search
              </Button>
            </div>
          </div>
        )}

        {/* Latest Articles Section */}
        {remainingPosts.length > 0 && (
          <div className="mx-auto max-w-5xl px-8 pb-16">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                {searchQuery ? "More Results" : "Latest Articles"}
              </h2>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <div className="h-0.5 w-8 bg-linear-to-r from-blue-600 to-purple-600" />
                <span>{filteredPosts.length} Posts</span>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {remainingPosts.map((post, index) => (
                <article
                  key={post.id}
                  className="group overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl dark:bg-gray-800"
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                  }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>
                  <div className="p-6">
                    <div className="mb-3 flex items-center gap-2 text-xs text-gray-500">
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      {post.date}
                    </div>
                    <h3 className="mb-3 line-clamp-2 text-xl leading-snug font-bold text-gray-900 transition-colors group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400">
                      {post.title}
                    </h3>
                    <a
                      href={post.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/link mt-2 inline-flex items-center gap-2 text-sm font-medium text-blue-600 transition-all hover:gap-3 dark:text-blue-400"
                    >
                      Continue Reading
                      <MoveRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                    </a>
                  </div>
                </article>
              ))}
            </div>

            {/* Newsletter CTA */}
            {!searchQuery && (
              <div className="relative mt-12 overflow-hidden rounded-2xl bg-linear-to-br from-blue-600 via-purple-600 to-pink-600 p-8 text-white">
                <div className="absolute top-0 right-0 -mt-32 -mr-32 h-64 w-64 rounded-full bg-white/10" />
                <div className="absolute bottom-0 left-0 -mb-24 -ml-24 h-48 w-48 rounded-full bg-white/10" />
                <div className="relative z-10">
                  <h3 className="mb-2 text-2xl font-bold">
                    Stay Updated with Latest Posts
                  </h3>
                  <p className="mb-6 max-w-2xl text-blue-100">
                    Get the latest articles, tutorials, and development insights
                    delivered straight to your inbox.
                  </p>
                  <div className="flex max-w-md gap-3">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      className="flex-1 rounded-lg border border-white/30 bg-white/20 px-4 py-3 text-white backdrop-blur-sm placeholder:text-white/60 focus:ring-2 focus:ring-white/50 focus:outline-none"
                    />
                    <Button className="bg-white px-6 py-3 font-semibold whitespace-nowrap text-blue-600 hover:bg-blue-50">
                      Subscribe
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </WindowWrapper>
  );
}
