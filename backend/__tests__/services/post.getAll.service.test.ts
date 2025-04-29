import Post from '../../src/models/postModel';
import { getAllPostsService } from '../../src/services/post.service';
import type { PostDocument } from '../../src/models/postModel';

describe('getAllPostsService', () => {
  // afterEach: Clean up DB after each test (각 테스트 후 DB 초기화)
  afterEach(async () => {
    await Post.deleteMany({});
  })

  it('should return an empty array when no posts exist', async () => {
    // Act
    const posts: PostDocument[] = await getAllPostsService();

    // Assert
    expect(Array.isArray(posts)).toBe(true); // Should return an array (배열이어야 함)
    expect(posts.length).toBe(0); // Should be empty (빈 배열이어야 함)
  });

  it('should return an array of posts when posts exist', async () => {
    // Arrange: seed some posts (준비: 데이터 생성)
    const p1 = await Post.create({title: 'A', content: 'Content A'});
    const p2 = await Post.create({title: 'B', content: 'Content B'});

    // Act
    const posts: PostDocument[] = await getAllPostsService();

    // Assert: returns exactly those posts (검증: 반환된 배열 확인)
    expect(posts).toHaveLength(2); // Should return 2 posts (2개의 게시글이어야 함)

    // Prepare sorted ID array
    const actualIds = posts.map(p => p._id.toString()).sort();
    const expectedIds = [p1._id.toString(), p2._id.toString()].sort();

    // Assert: the sorted arrays match (정렬된 ID 배열 비교)
    expect(actualIds).toEqual(expectedIds); // Should match the IDs (ID가 일치해야 함)
  });
});
