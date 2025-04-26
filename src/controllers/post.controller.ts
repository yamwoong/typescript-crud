import {Request, Response, NextFunction} from 'express';
import Post from '../models/postModel';
import {BadRequestError} from '../errors/BadRequestError';
import {NotFoundError} from '../errors/NotFoundError';
import {asyncHandler} from '../middlewares/asyncHandler'
import {createPostService, getAllPostsService, getPostByIdService, updatePostService, deletePostService} from '../services/post.service';

/**
 * @swagger
 * /api/posts:
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     requestBody:
 *       $ref: '#/components/requestBodies/NewPost'
 *     responses:
 *       '201':
 *         $ref: '#/components/responses/PostCreated'
 *       '400':
 *         $ref: '#/components/responses/BadRequest'
 */

export const createPost = asyncHandler(async(req: Request, res: Response) => {
    const {title, content} = req.body;

    // Validation: title and content are required
    if(!title || !content) {
        throw new BadRequestError('Title and content are required');
    }

    const post = await createPostService({title, content});

    res.status(201).json({post});
});

/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: Get all posts
 *     tags: [Posts]
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/PostsList'
 */

export const getAllPosts = asyncHandler(async(req: Request, res: Response) => {
    const posts = await getAllPostsService();
    res.status(200).json({posts});
});

/**
 * @swagger
 * /api/posts/{id}:
 *   get:
 *     summary: Get a post by ID
 *     tags: [Posts]
 *     parameters:
 *       - $ref: '#/components/parameters/PostId'
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/SinglePost'
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 */

export const getPostById = asyncHandler(async(req: Request, res: Response) => {
    const post = await getPostByIdService(req.params.id);
    res.status(200).json({post});
});

/**
 * @swagger
 * /api/posts/{id}:
 *   put:
 *     summary: Update a post by ID
 *     tags: [Posts]
 *     parameters:
 *       - $ref: '#/components/parameters/PostId'
 *     requestBody:
 *       $ref: '#/components/requestBodies/UpdatePost'
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/SinglePost'
 *       '400':
 *         $ref: '#/components/responses/BadRequest'
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 */
export const updatePost = asyncHandler(async(req: Request, res: Response) => {
    const {id} = req.params;
    const {title, content} = req.body;
    
    if (title === undefined && content === undefined) {
        throw new BadRequestError('At least title or content must be provided');
    }

    const post = await updatePostService(id, {title, content});
    res.status(200).json({post});
});

/**
 * @swagger
 * /api/posts/{id}:
 *   delete:
 *     summary: Delete a post by ID
 *     tags: [Posts]
 *     parameters:
 *       - $ref: '#/components/parameters/PostId'
 *     responses:
 *       '204':
 *         description: No Content
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 */

export const deletePost = asyncHandler(async(req: Request, res: Response) => {
    const {id} = req.params;
    await deletePostService(id);
    res.sendStatus(204);
});