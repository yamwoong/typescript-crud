import request from 'supertest';
import { app } from '../../src/app';
import Post from '../../src/models/postModel';
import type { PostDocument } from '../../src/models/postModel';

describe('GET /api/posts', () => {
    // afterEach: Clean up the posts collection after each test
    afterEach(async () => {
      await Post.deleteMany({});
    });
  
    it('should return an empty array when no posts exist', async () => {
      // Act: Send GET request without any posts in DB
      const res = await request(app).get('/api/posts');
  
      // Assert: Response status and body structure
      expect(res.status).toBe(200);                       // Expect status 200 (200 응답 코드여야 함)
      expect(Array.isArray(res.body.posts)).toBe(true);   // Response should be an array (응답은 배열이어야 함)
      expect(res.body.posts).toHaveLength(0);             // Should be empty (빈 배열이어야 함)
    });
  
    it('should return all posts when they exist', async () => {
      // Arrange: Seed two posts into the database
      const p1 = await Post.create({ title: 'Post 1', content: 'Content 1' });
      const p2 = await Post.create({ title: 'Post 2', content: 'Content 2' });
  
      // Act: Send GET request to fetch all posts
      const res = await request(app).get('/api/posts');
  
      // Assert: Verify status and number of posts returned
      expect(res.status).toBe(200);                       // Expect status 200 (200 응답 코드여야 함)
      expect(res.body.posts).toHaveLength(2);             // Should return two posts (두 개의 게시글이 있어야 함)
  
      // Extract and sort IDs for comparison
      const posts: PostDocument[] = res.body.posts;
      const ids = posts.map(p => p._id.toString()).sort(); 
      expect(ids).toEqual([p1._id.toString(), p2._id.toString()].sort()); // IDs should match (ID가 일치해야 함)
    });
  });