import request from 'supertest';
import {app} from '../../src/app';
import Post from '../../src/models/postModel';
import type { PostDocument } from '../../src/models/postModel';

describe('PUT /api/posts/:id', () => {
    // Clean up DB after each test
    afterEach(async() => {
        await Post.deleteMany({});
    });

    it('should update and return the post when valid data is provided', async() => {
        // Arrange: create a post
        const created: PostDocument = await Post.create({title: 'Original', content: 'Original content'});

        // Act: send a PUT request to update title and content
        const res = await request(app)
            .put(`/api/posts/${created._id.toString()}`)
            .send({title: 'Updated', content: 'Updated content'});

        // Assert: 200 OK and updated fields
        expect(res.status).toBe(200);                           // 200 OK
        expect(res.body.post).toHaveProperty('_id');            // Contains _id
        expect(res.body.post.title).toBe('Updated');            // Title matches
        expect(res.body.post.content).toBe('Updated content');  // Content matches
    });

    it('should return 400 when no fields to update are provided', async() => {
        // Arrange: create a post
        const created: PostDocument = await Post.create({title: 'Original', content: 'Original content'});

        // Act: send PUT with empty body
        const res = await request(app)
            .put(`/api/posts/${created._id.toString()}`)
            .send({});

        // Assert: 400 Bad Request and error message
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('message');
    });

    it('should return 404 when trying to update a non-existent post', async() => {
        // Arrange: random ObjectId
        const fakeId = '507f1f77bcf86cd799439011';

        // Act: send PUT to non-existent ID
        const res = await request(app)
            .put(`/api/posts/${fakeId}`)
            .send({title: 'X'});

        // Assert: 404 Not Found and error message
        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty('message');
    });
});