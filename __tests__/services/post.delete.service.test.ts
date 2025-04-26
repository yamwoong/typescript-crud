import Post from '../../src/models/postModel';
import { deletePostService } from '../../src/services/post.service';
import type { PostDocument } from '../../src/models/postModel';
import { NotFoundError } from '../../src/errors/NotFoundError';

describe('deletePostService', () => {
  afterEach(async () => {
    await Post.deleteMany({});
  });

  it('should delete and return the post when a valid ID is provided', async() => {
    // Arrange: seed a post
    const created = await Post.create({title: 'ToDelete', content: 'Todelete'});

    // Act: delete the post
    const deleted: PostDocument = await deletePostService(created._id.toString());

    // Assert: deleted document matches and no longer exists in DB
    expect(deleted._id.toString()).toBe(created._id.toString());
    await expect(Post.findById(created._id)).resolves.toBeNull();
  });

  it('should throw NotFoundError when trying to delete a non-existent post', async() => {
    // Arrange: random ID
    const fakeId = new Post()._id.toString();

    // Act: try to delete a non-existent post
    await expect(deletePostService(fakeId)).rejects.toThrow(NotFoundError);
  });
});
