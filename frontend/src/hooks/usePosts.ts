import { useState, useEffect } from 'react'
import { DefaultService } from '../api/generated/services/DefaultService' // 생성된 API 클라이언트
import type { Post } from '../api/generated/models/Post'

export function usePosts() {
  const [posts, setPosts]     = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState<Error | null>(null)

  useEffect(() => {
    DefaultService.getApiPosts()  // codegen된 함수 호출
      .then(res => res.posts && setPosts(res.posts))
      .catch(err => setError(err as Error))
      .finally(() => setLoading(false))
  }, [])

  return { posts, loading, error }
}