import request from 'supertest';
import app from '../../src/app';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Before all tests, connect to the MongoDB database (모든 테스트 전에 MongoDB에 연결)
beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI || '', {});
});

// After all tests, disconnect from the database (모든 테스트 후 MongoDB 연결 해제)
afterAll(async () => {
    await mongoose.connection.close();
});

// Test group for GET /api/posts (GET /api/posts 전체 조회 테스트)
describe('GET /api/posts', () => {
    // Test: should return an array of posts (게시글 배열을 반환해야 함)
    it('should return an array of posts (게시글 목록을 반환해야 함)', async () => {
        const response = await request(app).get('/api/posts');

        console.log('Posts fetched:', response.body.posts); // Check the flow of post data (게시글 데이터 흐름 확인)

        expect(response.status).toBe(200); // Expect status 200 (200 응답 코드여야 함)
        expect(Array.isArray(response.body.posts)).toBe(true); // Response should be an array (응답은 배열이어야 함)
        expect(response.body.posts.length).toBeGreaterThan(0); // Should contain at least one post (하나 이상의 게시글이 있어야 함)
        expect(response.body.posts[0]).toHaveProperty('title'); // Each post should have a title field (title 필드가 있어야 함)
        expect(response.body.posts[0]).toHaveProperty('content'); // Each post should have a content field (content 필드가 있어야 함)
    });
});