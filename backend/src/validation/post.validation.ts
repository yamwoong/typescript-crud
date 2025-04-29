import {celebrate, Joi, Segments} from 'celebrate';

/**
 * createPostValidator
 * - Validates POST /api/posts request body
 *   (POST /api/posts 요청 바디를 검증합니다)
 */

export const createPostValidator = celebrate({
    [Segments.BODY]: Joi.object({
        title: Joi.string().required().description('Post title (게시글 제목'),
        content: Joi.string().required().description('Post content (게시글 내용)')
    })
});

/**
 * updatePostValidator
 * - Validates PUT /api/posts/:id request body, requiring at least one field
 *   (PUT /api/posts/:id 요청 바디를 검증하며, 최소 하나의 필드를 필수로 합니다)
 */

export const updatePostValidator = celebrate({
    [Segments.BODY]: Joi.object({
        title: Joi.string().optional().description('New title (새 제목)'),
        content: Joi.string().optional().description('New content (새 내용)')
    })
    .or('title', 'content') // require at least one of title or content (title 또는 content 중 최소 하나 필요)
});