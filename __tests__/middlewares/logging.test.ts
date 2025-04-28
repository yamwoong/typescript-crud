import request from 'supertest';
import { app } from '../../src/app';

describe('Logging Middleware Integration', () => {
    it('should not interfere with normal request handling', async() => {
        // Even with logging enabled, the response should still be 200 OK
        const res = await request(app).get('/api/posts');
        expect(res.status).toBe(200);
    });
});