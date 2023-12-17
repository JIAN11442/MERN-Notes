import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import createHttpError, { isHttpError } from 'http-errors';
import cors from 'cors';
import noteRouter from './router/notes.router';

const app = express();

app.use(
  cors({
    // origin: 'http://localhost:3000', // 允许访问的前端域
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // 允许的 HTTP 方法
    credentials: true, // 允许发送身份验证信息（如 cookies）
  }),
);

app.use(morgan('dev'));

app.use(express.json());

app.use('/api/notes', noteRouter);

app.use((req, res, next) => {
  next(createHttpError(404, 'Endpoint not found'));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  let errorMsg = 'An unknown error occurred!';
  let statusCode = 500;
  if (isHttpError(error)) {
    statusCode = error.statusCode;
    errorMsg = error.message;
  }
  res.status(statusCode).json({ error: errorMsg });
});

export default app;
