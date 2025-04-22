import express from 'express';
import {swaggerUi, swaggerSpec} from './config/swagger';
import { errorHandler } from './middlewares/errorHandler'; 
import { NotFoundError } from './error/NotFoundError';

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use((req, res, next) => {
    next(new NotFoundError('요청한 경로를 찾을 수 없습니다.'));
  });

app.use((err: unknown, req: express.Request, res: express.Response, next: express.NextFunction) => {
    errorHandler(err, req, res, next);
});

export default app;