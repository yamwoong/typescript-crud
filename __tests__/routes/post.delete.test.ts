import request from 'supertest';
import { app } from '../../src/app';
import Post from '../../src/models/postModel';
import type { PostDocument } from '../../src/models/postModel';

describe('DELETE /api/posts/:id', () => {
    // Clean up DB after each test
    afterEach(async () => {
        await Post.deleteMany({});
    });

    it('should delete the post and return 204 when a valid ID is provided', async () => {
        // Arrange: Create a post
        const created: PostDocument = await Post.create({title:'Test', content: 'Content'});

        // Act: send DELETE request
        const res = await request(app).delete(`/api/posts/${created._id.toString()}`);

        // Assert: 204 No Content and ensure it's gone from DB
        expect(res.status).toBe(204);                         // 204 No Content
        const deletedPost = await Post.findById(created._id);
        expect(deletedPost).toBeNull();                       // should be deleted
    });

    it('should return 404 when trying to delete a non-existent post', async () => {
        // Arrange: random ObjectId
        const fakeId = '507f1f77bcf86cd799439011';
    
        // Act: send DELETE to non-existent ID
        const res = await request(app).delete(`/api/posts/${fakeId}`);
    
        // Assert: 404 Not Found and error message
        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty('message');
    });
});