import { useState, useEffect } from "react";
import { DefaultService } from "../api/generated";
import type { Post } from "../api/generated/models/Post";

export const usePost = (id: string) => {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await DefaultService.getApiPosts1(id); // ✅ 올바른 메서드
        setPost(response.post ?? null); // ✅ 올바른 응답 구조
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch post");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id]);

  return { post, loading, error };
};
