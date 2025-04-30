/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Post } from '../models/Post';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DefaultService {
    /**
     * Create a new post (게시글 생성)
     * @param requestBody
     * @returns any Post created successfully (생성 성공)
     * @throws ApiError
     */
    public static postApiPosts(
        requestBody: {
            title: string;
            content: string;
        },
    ): CancelablePromise<{
        post?: Post;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/posts',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request (잘못된 요청)`,
            },
        });
    }
    /**
     * List posts (게시글 목록 조회)
     * @returns any List of posts (게시글 목록)
     * @throws ApiError
     */
    public static getApiPosts(): CancelablePromise<{
        posts?: Array<Post>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/posts',
        });
    }
    /**
     * Get a single post (단일 게시글 조회)
     * @param id ID of the post (게시글 ID)
     * @returns any A single post (단일 게시글)
     * @throws ApiError
     */
    public static getApiPosts1(
        id: string,
    ): CancelablePromise<{
        post?: Post;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/posts/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Not Found (찾을 수 없음)`,
            },
        });
    }
    /**
     * Update a post by ID (게시글 수정)
     * @param id ID of the post (게시글 ID)
     * @param requestBody
     * @returns any A single post (단일 게시글)
     * @throws ApiError
     */
    public static putApiPosts(
        id: string,
        requestBody: {
            title?: string;
            content?: string;
        },
    ): CancelablePromise<{
        post?: Post;
    }> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/posts/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request (잘못된 요청)`,
                404: `Not Found (찾을 수 없음)`,
            },
        });
    }
    /**
     * Delete a post by ID (게시글 삭제)
     * @param id ID of the post (게시글 ID)
     * @returns void
     * @throws ApiError
     */
    public static deleteApiPosts(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/posts/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Not Found (찾을 수 없음)`,
            },
        });
    }
}
