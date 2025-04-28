import request from 'supertest';
import {app} from '../../src/app';

describe('PUT /api/posts/:id Validation', () => {
    const fakeId = '507f1f77bcf86cd799439011';

    it('should return 400 when no fields are provided', async() => {
        // Act: send empty body
        const res = await request(app)
            .put(`/api/posts/${fakeId}`)
            .send({});

        // Assert: 400 Validation failed
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toBe('Validation failed');
    });

    it('should return 404 when only title is provided', async() => {
        // Act: send only title
        const res = await request(app)
            .put(`/api/posts/${fakeId}`)
            .send({title: 'New Title'});
    });

    it('should return 404 when only content is provided', async () => {
        // Act: send only content
        const res = await request(app)
          .put(`/api/posts/${fakeId}`)
          .send({ content: 'New Content' });
    
        // Assert: validation passed, but post not found → 404
        expect(res.status).toBe(404);                   
        expect(res.body).toHaveProperty('message');     
    });
    
      it('should return 404 when both title and content are provided', async () => {
        // Act: send both title and content
        const res = await request(app)
          .put(`/api/posts/${fakeId}`)
          .send({ title: 'New Title', content: 'New Content' });
    
        // Assert: validation passed, but post not found → 404
        expect(res.status).toBe(404);                   
        expect(res.body).toHaveProperty('message');     
    });
});