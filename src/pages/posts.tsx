"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; // Import motion from framer-motion for animations

const PostsPage: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]); // Store the posts
  const [page, setPage] = useState(1); // Track the current page for infinite scroll
  const [loading, setLoading] = useState(false); // Loader state
  const [error, setError] = useState<string | null>(null); // Error state
  const [hasMore, setHasMore] = useState(true); // Track if more posts are available

  // Function to fetch posts from the API
  const fetchPosts = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`);
      const newPosts = await response.json();

      // Check if there are more posts to load
      if (newPosts.length === 0) {
        setHasMore(false);
      }

      setPosts((prevPosts) => [...prevPosts, ...newPosts]);
    } catch (error) {
      setError('Failed to load posts.');
    }

    setLoading(false);
  };

  // Infinite scrolling: load more posts when the user scrolls near the bottom
  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 10) {
      if (hasMore && !loading) {
        setPage((prevPage) => prevPage + 1);
      }
    }
  };

  // Fetch posts on page load or when the page number changes
  useEffect(() => {
    fetchPosts();
  }, [page]);

  // Add scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loading, hasMore]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Posts</h1>

      {/* Display posts */}
      <div className="space-y-4">
        {posts.map((post) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="border p-4 rounded-md shadow-sm"
          >
            <h2 className="text-lg font-semibold">{post.title}</h2>
            <p>{post.body}</p>
          </motion.div>
        ))}
      </div>

      {/* Display loading spinner when loading more posts */}
      {loading && (
        <div className="mt-4 text-center">
          <div className="loader">Loading...</div> {/* You can replace with an actual spinner */}
        </div>
      )}

      {/* Display error if there's any */}
      {error && <div className="text-red-500 mt-4">{error}</div>}

      {/* No more posts */}
      {!hasMore && <div className="text-gray-500 mt-4">No more posts to load.</div>}
    </div>
  );
};

export default PostsPage;
