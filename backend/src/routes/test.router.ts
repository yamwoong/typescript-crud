import {Router} from 'express';
import {asyncHandler} from '../middlewares/asyncHandler';
import {throwAppError, throwUnexpectedError, throwAsyncAppError} from '../controllers/test.controller';

const router = Router();

/**
 * @swagger
 * /test/app-error:
 *   get:
 *     summary: Throws a custom AppError (커스텀 AppError를 발생시킴)
 *     description: Simulates a request that throws a BadRequestError (BadRequestError를 테스트용으로 발생시킵니다)
 *     tags:
 *       - Test
 *     responses:
 *       400:
 *         description: Custom BadRequestError thrown (BadRequestError 발생)
 */
router.get('/app-error', throwAppError);

/**
 * @swagger
 * /test/unexpected-error:
 *   get:
 *     summary: Throws an unexpected error (예상치 못한 일반 에러 발생)
 *     description: Simulates an unexpected server-side error (서버 측 예상치 못한 에러를 발생시킵니다)
 *     tags:
 *       - Test
 *     responses:
 *       500:
 *         description: Internal server error occurred (내부 서버 에러 발생)
 */
router.get('/unexpected-error', throwUnexpectedError);

/**
 * @swagger
 * /test/async-error:
 *   get:
 *     summary: Throws an async AppError (비동기 AppError 발생)
 *     description: Throws a BadRequestError inside asyncHandler for async error testing (asyncHandler 내부에서 BadRequestError 발생 테스트)
 *     tags:
 *       - Test
 *     responses:
 *       400:
 *         description: Async BadRequestError thrown (비동기 BadRequestError 발생)
 */
router.get('/async-error', asyncHandler(throwAsyncAppError));

export default router;