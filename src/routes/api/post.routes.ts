import {Router} from 'express';
import {createPost, getAllPosts, getPostById} from '../../controllers/post.controller';

const router = Router();

/**
 * @route   POST /api/posts
 * @desc    Create a new post (게시글 생성)
 * @access  Public (공개)
 */
router.post('/', createPost);

/**
 * @route   GET /api/posts
 * @desc    Get all posts (전체 게시글 조회)
 * @access  Public (공개)
 */
router.get('/', getAllPosts);

/**
 * @route   GET /api/posts/:id
 * @desc    Get post by ID
 * @access  Public
 */
router.get('/:id', getPostById)

export default router;