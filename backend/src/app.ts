import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import createHttpError, { isHttpError } from 'http-errors';
import noteRouter from './router/notes.router';

const app = express();

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
