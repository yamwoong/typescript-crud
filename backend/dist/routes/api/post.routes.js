"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const post_controller_1 = require("../../controllers/post.controller");
const asyncHandler_1 = require("../../middlewares/asyncHandler");
const post_validation_1 = require("../../validation/post.validation");
const router = (0, express_1.Router)();
/**
 * @route   POST /api/posts
 * @desc    Create a new post (게시글 생성)
 * @access  Public (공개)
 */
router.post('/', post_validation_1.createPostValidator, (0, asyncHandler_1.asyncHandler)(post_controller_1.createPost));
/**
 * @route   GET /api/posts
 * @desc    Get all posts (전체 게시글 조회)
 * @access  Public (공개)
 */
router.get('/', (0, asyncHandler_1.asyncHandler)(post_controller_1.getAllPosts));
/**
 * @route   GET /api/posts/:id
 * @desc    Get a post by ID (ID로 특정 게시글 조회)
 * @access  Public (공개)
 */
router.get('/:id', (0, asyncHandler_1.asyncHandler)(post_controller_1.getPostById));
/**
 * @route   PUT /api/posts/:id
 * @desc    Update a post by ID (ID로 게시글 수정)
 * @access  Public (공개)
 */
router.put('/:id', post_validation_1.updatePostValidator, (0, asyncHandler_1.asyncHandler)(post_controller_1.updatePost));
/**
 * @route   DELETE /api/posts/:id
 * @desc    Delete a post by ID (ID로 게시글 삭제)
 * @access  Public (공개)
 */
router.delete('/:id', (0, asyncHandler_1.asyncHandler)(post_controller_1.deletePost));
exports.default = router;
