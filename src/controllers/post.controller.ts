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
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Post created successfully
 *       400:
 *         description: Invalid input
 */

export const createPost = asyncHandler(async(req: Request, res: Response) => {
    const {title, content} = req.body;

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
 *     summary: Get all posts (모든 게시글 조회)
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: List of posts (게시글 목록 반환)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 posts:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       title:
 *                         type: string
 *                       content:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                       updatedAt:
 *                         type: string
 */

export const getAllPosts = asyncHandler(async(req: Request, res: Response) => {
    const posts = await getAllPostsService();
    res.status(200).json({posts});
});

/**
 * @swagger
 * /api/posts/{id}:
 *   get:
 *     summary: Get a post by ID (ID로 게시글 조회)
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the post to retrieve (조회할 게시글의 ID)
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post found successfully (게시글 조회 성공)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 post:
 *                   $ref: '#/components/schemas/Post'
 *       404:
 *         description: Post not found (게시글을 찾을 수 없음)
 */

export const getPostById = asyncHandler(async(req: Request, res: Response, next: NextFunction) => {
    const post = await getPostByIdService(req.params.id);
    res.status(200).json({post});
});

/**
 * @swagger
 * /api/posts/{id}:
 *   put:
 *     summary: Update a post by ID (ID로 게시글 수정)
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the post to update (수정할 게시글의 ID)
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *                 example: Updated title
 *               content:
 *                 type: string
 *                 example: Updated content
 *     responses:
 *       200:
 *         description: Post updated successfully (게시글이 성공적으로 수정됨)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 post:
 *                   $ref: '#/components/schemas/Post'
 *       400:
 *         description: Invalid input (입력값 오류)
 *       404:
 *         description: Post not found (게시글을 찾을 수 없음)
 */
export const updatePost = asyncHandler(async(req: Request, res: Response) => {
    const {id} = req.params;
    const {title, content} = req.body;
    const post = await updatePostService(id, {title, content});
    res.status(200).json({post});
});

/**
 * @swagger
 * /api/posts/{id}:
 *   delete:
 *     summary: Delete a post by ID (ID로 게시글 삭제)
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the post to delete (삭제할 게시글의 ID)
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post deleted successfully (게시글이 성공적으로 삭제됨)
 *       404:
 *         description: Post not found (게시글을 찾을 수 없음)
 */

export const deletePost = asyncHandler(async(req: Request, res: Response) => {
    const {id} = req.params;
    await deletePostService(id);
    res.status(204).send();
});