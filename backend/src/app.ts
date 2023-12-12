import express, { Request, Response, NextFunction } from 'express';
import noteRouter from './router/notes.router';

const app = express();

app.use(express.json());

app.use('/api/notes', noteRouter);

app.use((req, res, next) => {
  next(Error('Endpoint not found!'));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  let errorMsg = 'An unknown error occurred!';
  if (error instanceof Error) errorMsg = error.message;
  res.status(500).json({ error: errorMsg });
});

export default app;
