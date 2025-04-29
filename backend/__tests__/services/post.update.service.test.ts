import Post from '../../src/models/postModel';
import { updatePostService } from '../../src/services/post.service';
import type { PostDocument } from '../../src/models/postModel';
import { NotFoundError } from '../../src/errors/NotFoundError';

describe('updatePostService', () => {
  afterEach(async () => {
    await Post.deleteMany({});
  })

  it('should update and return the post when a valid ID is provided', async() => {
    // Arrange: seed a post
    const created = await Post.create({title: 'Old title', content: 'Old content'});

    // Act: update title and content
    const updated: PostDocument = await updatePostService(created._id.toString(), {
      title: 'New title',
      content: 'New content'
    });

    // Assert: the returned document has new values
    expect(updated._id.toString()).toBe(created._id.toString());
    expect(updated.title).toBe('New title');
    expect(updated.content).toBe('New content');
  });

  it('should throw NotFoundError when trying to update a non-existent post', async() => {
    // Arrange: random ID
    const fakeId = new Post()._id.toString();

    // Act: try to update a non-existent post
    await expect(updatePostService(fakeId, {title: 'X'})).rejects.toThrow(NotFoundError);
  });
});