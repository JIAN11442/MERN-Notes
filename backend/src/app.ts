import morgan from 'morgan';
import cors from 'cors';
import createHttpError, { isHttpError } from 'http-errors';
import express, { Request, Response, NextFunction } from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import env from './utils/validateEnv';

import noteRoutes from './routes/notes.routes';
import userRoutes from './routes/users.routes';

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

app.use(
  session({
    secret: env.SESSION_SECRET, // 用來對 session id 相關的 cookie 進行簽名
    resave: false, // 是否在每次有請求的時候，重新儲存 session
    saveUninitialized: false, // 是否在初始化的時候就建立 session
    cookie: {
      maxAge: 1000 * 60 * 60, // 設定 session 的有效時間，單位為毫秒(這是是一小時)
    },
    rolling: true, // 每次有任何操作都會重置 cookie 的存活時間
    store: MongoStore.create({
      mongoUrl: env.MONGODB_CONNECTION_STRING,
    }), // 將 session 儲存到 mongodb
  }),
);

app.use('/api/users', userRoutes);
app.use('/api/notes', noteRoutes);

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
