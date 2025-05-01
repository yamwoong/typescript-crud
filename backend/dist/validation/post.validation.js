"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePostValidator = exports.createPostValidator = void 0;
const celebrate_1 = require("celebrate");
/**
 * createPostValidator
 * - Validates POST /api/posts request body
 *   (POST /api/posts 요청 바디를 검증합니다)
 */
exports.createPostValidator = (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.BODY]: celebrate_1.Joi.object({
        title: celebrate_1.Joi.string().required().description('Post title (게시글 제목'),
        content: celebrate_1.Joi.string().required().description('Post content (게시글 내용)')
    })
});
/**
 * updatePostValidator
 * - Validates PUT /api/posts/:id request body, requiring at least one field
 *   (PUT /api/posts/:id 요청 바디를 검증하며, 최소 하나의 필드를 필수로 합니다)
 */
exports.updatePostValidator = (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.BODY]: celebrate_1.Joi.object({
        title: celebrate_1.Joi.string().optional().description('New title (새 제목)'),
        content: celebrate_1.Joi.string().optional().description('New content (새 내용)')
    })
        .or('title', 'content') // require at least one of title or content (title 또는 content 중 최소 하나 필요)
});
