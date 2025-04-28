import request from 'supertest';
import {app} from '../../src/app';
import Post from '../../src/models/postModel';
import type { PostDocument } from '../../src/models/postModel';

describe('GET /api/posts/:id', () => {
    // Clean up DB after each test
    afterEach(async() => {
        await Post.deleteMany({});
    });

    it('should return the post when a valid ID is provided', async () => {
        // Arrange: Create a post
        const created: PostDocument = await Post.create({title: 'Test', content: 'Content'});

        // Act: Fetch by ID
        const res = await request(app).get(`/api/posts/${created._id.toString()}`);

        // Assert: 200 and correct post data
        expect(res.status).toBe(200);                         // 200 OK
        expect(res.body.post).toHaveProperty('_id');          // Contains _id
        expect(res.body.post.title).toBe('Test');             // Title matches
        expect(res.body.post.content).toBe('Content');        // Content matches
    });

    it('should return 404 when the post does not exist', async() => {
        // Arrange: Generate a random ObjectId
        const fakeId = '507f1f77bcf86cd799439011';

        // Act: Try fetching non-existent post
        const res = await request(app).get(`/api/posts/${fakeId}`);

        // Assert: 404 Not Found and error message
        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty('message');             // Error message present
    });
});