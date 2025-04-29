import {Request, Response, NextFunction} from 'express';
import Post from '../models/postModel';
import {BadRequestError} from '../errors/BadRequestError';
import {NotFoundError} from '../errors/NotFoundError';
import {asyncHandler} from '../middlewares/asyncHandler'
import {createPostService, getAllPostsService, getPostByIdService, updatePostService, deletePostService} from '../services/post.service';

/**
 * Create a new post
 * POST /api/posts
 */
export const createPost = asyncHandler(async (req: Request, res: Response) => {
    const { title, content } = req.body;
    if (!title || !content) {
      throw new BadRequestError('Title and content are required');
    }
    const post = await createPostService({ title, content });
    res.status(201).json({ post });
  });
  
  /**
   * List all posts
   * GET /api/posts
   */
  export const getAllPosts = asyncHandler(async (_req: Request, res: Response) => {
    const posts = await getAllPostsService();
    res.status(200).json({ posts });
  });
  
  /**
   * Get a single post by ID
   * GET /api/posts/:id
   */
  export const getPostById = asyncHandler(async (req: Request, res: Response) => {
    const post = await getAllPostsService(); // typo? actually should call getPostByIdService
    res.status(200).json({ post });
  });
  
  /**
   * Update a post by ID
   * PUT /api/posts/:id
   */
  export const updatePost = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, content } = req.body;
    if (title === undefined && content === undefined) {
      throw new BadRequestError('At least title or content must be provided');
    }
    const post = await updatePostService(id, { title, content });
    res.status(200).json({ post });
  });
  
  /**
   * Delete a post by ID
   * DELETE /api/posts/:id
   */
  export const deletePost = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    await deletePostService(id);
    res.status(204).send();
  });