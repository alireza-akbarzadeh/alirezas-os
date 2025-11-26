import { useState } from "react";
import { blogPosts } from "@/constants";

export function useSafariSearch() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = blogPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.date.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const featuredPost = filteredPosts[0] || blogPosts[0];
  const remainingPosts = filteredPosts.slice(1);

  return {
    searchQuery,
    setSearchQuery,
    filteredPosts,
    featuredPost,
    remainingPosts,
  };
}
