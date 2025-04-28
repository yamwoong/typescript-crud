import request from 'supertest';
import { app } from '../../src/app';

describe('Security Middleware Integration', () => {
    it('should set Helmet security headers on GET /api/posts', async() => {
        const res = await request(app).get('/api/posts');

        // Helmet Header checks
        expect(res.headers).toHaveProperty('x-content-type-options', 'nosniff');
        expect(res.headers).toHaveProperty('x-frame-options');
        expect(res.headers['x-frame-options']).toMatch(/SAMEORIGIN|DENY/);
    });

    it('should allow CORS for any origin', async() => {
        const res = await request(app)
            .get('/api/posts')
            .set('Origin', 'http://example.com');

        // CORS headers checks
        expect(res.headers).toHaveProperty('access-control-allow-origin', '*');
    });
});