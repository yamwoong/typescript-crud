import express from 'express';
import {swaggerUi, swaggerSpec} from './config/swagger';
import { errorHandler } from './middlewares/errorHandler'; 
import { NotFoundError } from './errors/NotFoundError';

import testRouter from './routes/test.router';

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/test', testRouter);

app.use((req, res, next) => {
    next(new NotFoundError('요청한 경로를 찾을 수 없습니다.'));
  });

app.use(errorHandler);


export default app;