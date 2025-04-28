import request from 'supertest';
import {app} from '../../src/app';

describe('POST /api/posts Validation', () => {
    it('should return 400 when title is missing', async() => {
        // Act: send only content, omit title
        const res = await request(app)
            .post('/api/posts')
            .send({content: 'Some content'});

        // Assert: 400 Bad Request and appropriate message
        expect(res.status).toBe(400);                               // Expect HTTP 400
        expect(res.body).toHaveProperty('message');                 // Error response includes message
        expect(res.body.message).toMatch('Validation failed');      // Joi reports missing title
    });

    it('should return 400 when content is missing', async() => {
        // Act: send valid title and content
        const res = await request(app)
            .post('/api/posts')
            .send({title: 'My Title', content: 'My Content'});
        
        // Assert: 201 Created and post object
        expect(res.status).toBe(201);                               // Expect HTTP 201
        expect(res.body).toHaveProperty('post');                    // Response contains post
        expect(res.body.post).toHaveProperty('_id');                // Post has an _id
        expect(res.body.post.title).toBe('My Title');               // Title matches
        expect(res.body.post.content).toBe('My Content');           // Content matches
    });
});