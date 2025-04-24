import request from 'supertest';
import app from '../../src/app';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

let testPostId: string; // Shared post ID between tests (테스트 간 공유할 게시글 ID)

// Connect to MongoDB before all tests (모든 테스트 전에 MongoDB 연결)
beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI || '', {});
});

// Disconnect from MongoDB after all tests (모든 테스트 후 MongoDB 연결 해제)
afterAll(async () => {
    await mongoose.connection.close();
});

// Create a fresh post before each test (각 테스트 전에 새 게시글 생성)
beforeEach(async () => {
    const res = await request(app).post('/api/posts').send({
        title: 'Test Post',
        content: 'This is a test post.'
    });

    testPostId = res.body.post._id; // Save ID for use in tests (테스트에서 사용할 ID 저장)
    console.log('✅ Created post:', res.body.post); // Confirm created post
});

// Test group for GET /api/posts/:id (GET /api/posts/:id 단일 조회 테스트)
describe('GET /api/posts/:id', () => {
    // Test: should return a single post when valid ID is provided (유효한 ID로 요청 시 게시글 반환)
    it('should return a single post when valid ID is provided (유효한 ID로 요청 시 게시글 반환)', async () => {
        const response = await request(app).get(`/api/posts/${testPostId}`);

        console.log('📦 Fetched post:', response.body.post); // Log fetched post

        expect(response.status).toBe(200); // Expect 200 OK (200 응답이어야 함)
        expect(response.body.post).toHaveProperty('_id'); // Should include _id (응답에 _id 있어야 함)
        expect(response.body.post.title).toBe('Test Post'); // Title should match (제목 일치해야 함)
    });

    // Test: should return 404 if post not found (존재하지 않는 ID일 경우 404 반환)
    it('should return 404 when post is not found (존재하지 않는 ID로 요청 시 404 반환)', async() => {
        const fakeId = new mongoose.Types.ObjectId(); // Generate random ID (랜덤 ID 생성)

        const response = await request(app).get(`/api/posts/${fakeId}`);

        console.log('🚫 Response for non-existent ID:', response.body); // Log 404 case
        
        expect(response.status).toBe(404); // Should return 404 (404 반환해야 함)
        expect(response.body.message).toBe('Post not found'); // Error message should match (에러 메시지 일치해야 함)
    });
});