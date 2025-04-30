import { useState, useEffect } from 'react';
import type { Post } from '../api/generated/models/Post';
import { DefaultService } from '../api/generated/services/DefaultService';

/**
 * Fetch a single post by ID (ID로 게시글 단건 조회)
 * @param id Post ID (게시글 ID)
 */
export function usePost(id: string) {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    DefaultService.getApiPosts1(id)
      .then(response => {
        console.log('📦 API 응답:', response);         // 전체 응답
      console.log('🧩 response.post:', response.post); // post 객체
        if (response.post) {
          setPost(response.post);
        } else {
          throw new Error('Post not found');
        }
      })
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, [id]);

  return { post, loading, error };
}
