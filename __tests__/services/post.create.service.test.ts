import mockingoose from 'mockingoose';
import Post from '../../src/models/postModel';
import {createPostService} from '../../src/services/post.service';

describe('createPostService', () => {
    beforeEach(() => {
        mockingoose(Post).reset(); // Reset all mocks before each test (각 테스트 전에 모든 mock 상태 초기화)
    });

    it('should create and return a post (게시글을 생성하고 반환해야 한다)', async() => {
        // Input for the service function (서비스 함수에 전달할 입력 값)
        const mockInput = {title: 'Test Title', content: 'Test Content'};

        // Mocked result to return (mocked 응답값 정의)
        const mockResult = {
            _id: '1234567890abcdef12345678',
            title: 'Test Title',
            content: 'Test Content',
            createdAt: new Date(),
            updateAt: new Date()
        };

        // Mock the Post.save() behavior (Post 모델의 save 동작을 mock 데이터로 대체)
        mockingoose(Post).toReturn(mockResult, 'save');

        // Call the service function (서비스 함수 호출)
        const createdPost = await createPostService(mockInput);

        // Assert that the created post matches the input (생성된 게시글이 입력값과 일치하는지 검증)
        expect(createdPost.title).toBe(mockInput.title); // Title should match (제목이 일치해야 함)
        expect(createdPost.content).toBe(mockInput.content); // Content should match (내용이 일치해야 함)
        expect(createdPost).toHaveProperty('_id'); // Should have _id property (_id 속성이 있어야 함)
    });
});