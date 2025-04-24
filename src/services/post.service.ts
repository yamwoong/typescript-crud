import Post from '../models/postModel';
import {NotFoundError} from '../errors/NotFoundError';

/**
 * Create a new post in the database
 * @param title - The title of the post
 * @param content - The content of the post
 * @returns The created post document
 */

export const createPostService = async({title, content}: {title: string; content: string;}) => {
    const post = new Post({title, content});
    return await post.save();
};

/**
 * Retrieve all posts, sorted by most recent
 * @returns Array of all posts
 */

export const getAllPostsService = async() => {
    return await Post.find().sort({createdAt: -1});
};

/**
 * Find a single post by ID
 * @param id - MongoDB ObjectId
 * @returns Found post document
 * @throws NotFoundError if no post exists
 */

export const getPostByIdService = async(id: string) => {
    const post = await Post.findById(id);
    if(!post) {
        throw new NotFoundError('Post not found');
    }
    return post;
}

/**
 * Update a post by ID
 * @param id - MongoDB ObjectId
 * @param update - Object with updated title and content
 * @returns The updated post document
 * @throws NotFoundError if the post doesn't exist
 */

export const updatePostService = async(id: string, update: {title?: string; content?: string;}) =>{
    const post = await Post.findByIdAndUpdate(id, update, {
        new: true, // return the updated document
        runValidators: true // validate schema
    });

    if(!post) {
        throw new NotFoundError('Post not found');
    }
    return post;
};

/**
 * Delete a post by ID
 * @param id - MongoDB ObjectId
 * @returns The deleted post document
 * @throws NotFoundError if the post doesn't exist
 */

export const deletePostService = async(id: string) => {
    const post = await Post.findByIdAndDelete(id);

    if(!post) {
        throw new NotFoundError('Post not found');
    }

    return post;
};