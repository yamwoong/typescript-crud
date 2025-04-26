import request from 'supertest';
import {app} from '../../src/app';
import Post from '../../src/models/postModel';

describe('POST /api/posts', () => {
    // afterEach: Clean up the posts collection after each test
    afterEach(async () => {
        await Post.deleteMany({});
    });

    it('should create a post with valid data', async() => {
        // Act: Send a POST request with valid title and content
        const res = await request(app)
            .post('/api/posts')
            .send({title: 'Test Title', content: 'Test Content'});
            
            // Assert: Verify response status and body
            expect(res.status).toBe(201);                           // 201 Created
            expect(res.body.post).toHaveProperty('_id');            // Should include generated _id (_id가 있어야 함)
            expect(res.body.post.title).toBe('Test Title');         // Title matches (제목 일치)
            expect(res.body.post.content).toBe('Test Content');     // Content matches (내용 일치)
    });
    
    it('should return 400 when title or content is missing', async() => {
        // Act: Send a POST request with missing content
        const res = await request(app)
            .post('/api/posts')
            .send({title: ''}); // Missing content (content 누락)
        
            expect(res.status).toBe(400);               // 400 Bad Request
            expect(res.body).toHaveProperty('message'); // Should return error message (에러 메시지 반환)
    });
});