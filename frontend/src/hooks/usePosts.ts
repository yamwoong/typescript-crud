import { useState, useEffect } from "react";
import { DefaultService } from "../api/generated";
import type { Post } from "../api/generated/models/Post";

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await DefaultService.getApiPosts();
        setPosts(response.posts ?? []); // ✅ 안전한 추출
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return { posts, loading, error };
};
