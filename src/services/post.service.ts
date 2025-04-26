import {Types} from 'mongoose'
import Post, {PostDocument} from '../models/postModel';
import {NotFoundError} from '../errors/NotFoundError';

/**
 * Create a new post in the database
 * @param data - { title, content, createdBy? }
 * @returns Promise<PostDocument> - The created post document
 */

export const createPostService = async(
    data: {title: string; content: string; createdBy?: Types.ObjectId}
): Promise<PostDocument> => {
    const post = new Post(data);
    return await post.save();
};

/**
 * Retrieve all posts, sorted by most recent
 * @returns Promise<PostDocument[]> - Array of all posts
 */

export const getAllPostsService = async(): Promise<PostDocument[]> => {
    return await Post.find().sort({createdAt: -1});
};

/**
 * Find a single post by ID
 * @param id - MongoDB ObjectId string
 * @returns Promise<PostDocument> - Found post document
 * @throws NotFoundError if no post exists
 */

export const getPostByIdService = async(
    id: string
): Promise<PostDocument> => {
    const post = await Post.findById(id);
    if(!post) {
        throw new NotFoundError('Post not found');
    }
    return post;
}

/**
 * Update a post by ID
 * @param id - MongoDB ObjectId string
 * @param update - Partial<{ title, content }>
 * @returns Promise<PostDocument> - The updated post document
 * @throws NotFoundError if the post doesn't exist
 */

export const updatePostService = async(
    id: string,
    update: Partial<{title: string; content: string;}>
) => {
    const post = await Post.findByIdAndUpdate(id, update, {
        new: true,          // return the updated document
        runValidators: true // validate schema
    });

    if(!post) {
        throw new NotFoundError('Post not found');
    }
    return post;
};

/**
 * Delete a post by ID
 * @param id - MongoDB ObjectId string
 * @returns Promise<PostDocument> - The deleted post document
 * @throws NotFoundError if the post doesn't exist
 */

export const deletePostService = async(
    id: string
): Promise<PostDocument> => {
    const post = await Post.findByIdAndDelete(id);

    if(!post) {
        throw new NotFoundError('Post not found');
    }

    return post;
};