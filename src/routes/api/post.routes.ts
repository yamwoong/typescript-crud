import {Router} from 'express';
import {createPost, getAllPosts, getPostById, updatePost, deletePost} from '../../controllers/post.controller';
import {asyncHandler} from '../../middlewares/asyncHandler';
import {createPostValidator, updatePostValidator} from '../../validation/post.validation';

const router = Router();

/**
 * @route   POST /api/posts
 * @desc    Create a new post (게시글 생성)
 * @access  Public (공개)
 */
router.post('/', createPostValidator, asyncHandler(createPost));

/**
 * @route   GET /api/posts
 * @desc    Get all posts (전체 게시글 조회)
 * @access  Public (공개)
 */
router.get('/', asyncHandler(getAllPosts));

/**
 * @route   GET /api/posts/:id
 * @desc    Get a post by ID (ID로 특정 게시글 조회)
 * @access  Public (공개)
 */
router.get('/:id', asyncHandler(getPostById));

/**
 * @route   PUT /api/posts/:id
 * @desc    Update a post by ID (ID로 게시글 수정)
 * @access  Public (공개)
 */
router.put('/:id', updatePostValidator, asyncHandler(updatePost));

/**
 * @route   DELETE /api/posts/:id
 * @desc    Delete a post by ID (ID로 게시글 삭제)
 * @access  Public (공개)
 */
router.delete('/:id', asyncHandler(deletePost));

export default router;