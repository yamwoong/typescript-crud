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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePostService = exports.updatePostService = exports.getPostByIdService = exports.getAllPostsService = exports.createPostService = void 0;
const postModel_1 = __importDefault(require("../models/postModel"));
const NotFoundError_1 = require("../errors/NotFoundError");
/**
 * Create a new post in the database
 * @param data - { title, content, createdBy? }
 * @returns Promise<PostDocument> - The created post document
 */
const createPostService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const post = new postModel_1.default(data);
    return yield post.save();
});
exports.createPostService = createPostService;
/**
 * Retrieve all posts, sorted by most recent
 * @returns Promise<PostDocument[]> - Array of all posts
 */
const getAllPostsService = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield postModel_1.default.find().sort({ createdAt: -1 });
});
exports.getAllPostsService = getAllPostsService;
/**
 * Find a single post by ID
 * @param id - MongoDB ObjectId string
 * @returns Promise<PostDocument> - Found post document
 * @throws NotFoundError if no post exists
 */
const getPostByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield postModel_1.default.findById(id);
    if (!post) {
        throw new NotFoundError_1.NotFoundError('Post not found');
    }
    return post;
});
exports.getPostByIdService = getPostByIdService;
/**
 * Update a post by ID
 * @param id - MongoDB ObjectId string
 * @param update - Partial<{ title, content }>
 * @returns Promise<PostDocument> - The updated post document
 * @throws NotFoundError if the post doesn't exist
 */
const updatePostService = (id, update) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield postModel_1.default.findByIdAndUpdate(id, update, {
        new: true, // return the updated document
        runValidators: true // validate schema
    });
    if (!post) {
        throw new NotFoundError_1.NotFoundError('Post not found');
    }
    return post;
});
exports.updatePostService = updatePostService;
/**
 * Delete a post by ID
 * @param id - MongoDB ObjectId string
 * @returns Promise<PostDocument> - The deleted post document
 * @throws NotFoundError if the post doesn't exist
 */
const deletePostService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield postModel_1.default.findByIdAndDelete(id);
    if (!post) {
        throw new NotFoundError_1.NotFoundError('Post not found');
    }
    return post;
});
exports.deletePostService = deletePostService;
