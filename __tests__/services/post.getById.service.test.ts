import Post from '../../src/models/postModel';
import { getPostByIdService } from '../../src/services/post.service';
import type {PostDocument} from '../../src/models/postModel';
import {NotFoundError} from '../../src/errors/NotFoundError';

describe('getPostByIdService', () => {
  afterEach(async () => {
    await Post.deleteMany({});
  });
  
  it('should return the post when a valid ID is provided', async() => {
    // Arrange: seed a post
    const  created = await Post.create({title: 'Test', content: 'Test content'});

    // Act
    const result: PostDocument = await getPostByIdService(created._id.toString());
    
    // Assert: correct post returned
    expect(result._id.toString()).toEqual(created._id.toString());
    expect(result.title).toBe('Test');
    expect(result.content).toBe('Test content');
  });

  it('should throw NotFoundError when post does not exist', async() => {
    // Arrange: use a random ID
    const fakeId = new Post()._id.toString();

    // Act & Assert: expect NotFoundError to be thrown
    await expect(getPostByIdService(fakeId)).rejects.toThrow(NotFoundError)
  });
});