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

// Group of tests for POST /api/posts endpoint (POST /api/posts 엔드포인트에 대한 테스트 그룹)
describe('POST /api/posts', () => {
    // Test: should create a post with valid input (유효한 입력이 주어졌을 때 게시글을 생성해야 함)
    it('shold create a post with valid data is send(유효한 데이터로 요청 시 post 생성)', async() => {
        const response = await request(app)
            .post('/api/posts')
            .send({title: 'Test Title', content: 'Test Content'});
            expect(response.status).toBe(201); // Expect HTTP status 201 (201 응답 코드여야 함)
            expect(response.body.post).toHaveProperty('_id'); // Response should include _id (응답에 _id 속성이 있어야 함)
            expect(response.body.post.title).toBe('Test Title'); // Title should match input (제목이 입력값과 일치해야 함)
    });
    
    // Test: should return 400 if title or content is missing (title 또는 content가 누락되면 400을 반환해야 함)
    it('should return 400 when title or content is missing (title 또는 content가 없을 경우 400 에러)', async() => {
        const response = await request(app)
            .post('/api/posts')
            .send({title: ''}); // Missing content (content 누락)
        
        expect(response.status).toBe(400); // Expect HTTP status 400 (400 응답 코드여야 함)
        expect(response.body.message).toBe('Title and content are required'); // Should return correct error message (에러 메시지가 정확해야 함)
    });
});