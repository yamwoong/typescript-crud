import type { Post } from './generated/models/Post'
import { DefaultService } from './generated/services/DefaultService'

// Fetch all posts (모든 게시글 조회)
export async function fetchPosts(): Promise<Post[]> {
    const resp = await DefaultService.getApiPosts()
    return resp.posts ?? []
}  

// Fetch a single post by ID (ID로 게시글 조회)
export async function fetchPostById(id: string): Promise<Post> {
    const resp = await DefaultService.getApiPosts1(id)
    if (!resp.post) throw new Error('Post not found')
    return resp.post
}

// Create a new post (새 게시글 생성)
export async function createPost(data: { title: string; content: string }): Promise<Post> {
    const resp = await DefaultService.postApiPosts(data)
    if (!resp.post) throw new Error('Failed to create post')
    return resp.post
  }

// Update an existing post (기존 게시글 수정)
export async function updatePost(
  id: string,
  data: Partial<{ title: string; content: string }>
): Promise<Post> {
  const resp = await DefaultService.putApiPosts(id, data)
  if (!resp.post) throw new Error('Failed to update post')
  return resp.post
}

// Delete a post (게시글 삭제)
export async function deletePost(id: string): Promise<void> {
    await DefaultService.deleteApiPosts(id)
}