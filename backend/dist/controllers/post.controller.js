"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.updatePost = exports.getPostById = exports.getAllPosts = exports.createPost = void 0;
const BadRequestError_1 = require("../errors/BadRequestError");
const asyncHandler_1 = require("../middlewares/asyncHandler");
const post_service_1 = require("../services/post.service");
/**
 * Create a new post
 * POST /api/posts
 */
exports.createPost = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content } = req.body;
    if (!title || !content) {
        throw new BadRequestError_1.BadRequestError('Title and content are required');
    }
    const post = yield (0, post_service_1.createPostService)({ title, content });
    res.status(201).json({ post });
}));
/**
 * List all posts
 * GET /api/posts
 */
exports.getAllPosts = (0, asyncHandler_1.asyncHandler)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield (0, post_service_1.getAllPostsService)();
    res.status(200).json({ posts });
}));
/**
 * Get a single post by ID
 * GET /api/posts/:id
 */
exports.getPostById = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield (0, post_service_1.getPostByIdService)(req.params.id);
    res.status(200).json({ post });
}));
/**
 * Update a post by ID
 * PUT /api/posts/:id
 */
exports.updatePost = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, content } = req.body;
    if (title === undefined && content === undefined) {
        throw new BadRequestError_1.BadRequestError('At least title or content must be provided');
    }
    const post = yield (0, post_service_1.updatePostService)(id, { title, content });
    res.status(200).json({ post });
}));
/**
 * Delete a post by ID
 * DELETE /api/posts/:id
 */
exports.deletePost = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield (0, post_service_1.deletePostService)(id);
    res.status(204).send();
}));
