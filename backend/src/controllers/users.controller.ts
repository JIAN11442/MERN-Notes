/* eslint-disable no-underscore-dangle */
/* eslint-disable import/prefer-default-export */

import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';

import UserSchemaModel from '../models/users.schema';

interface SignUpBody {
  username?: string;
  email?: string;
  password?: string;
}

export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
  const authenticatedUserId = req.session.userId;
  try {
    if (!authenticatedUserId) {
      throw createHttpError(401, 'User not authenticated');
    }

    const user = await UserSchemaModel.findById(authenticatedUserId).select('+email').exec();
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const signUp: RequestHandler<unknown, unknown, SignUpBody, unknown> = async (req, res, next) => {
  const { username, email, password: passwordRaw } = req.body;
  try {
    //   如果沒有傳入 username, email, password，就回傳 400 Bad Request
    if (!username || !email || !passwordRaw) {
      throw createHttpError(400, 'Parameters missing');
    }

    //   如果 username 或 email 已經被註冊過了，就回傳 409 Conflict
    const existingUsername = await UserSchemaModel.findOne({ username: username }).exec();

    if (existingUsername) {
      throw createHttpError(409, 'Username already taken. Please choose a different one or log in instead.');
    }

    // 檢查email格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw createHttpError(400, 'Email format incorrect');
    }

    const existingEmail = await UserSchemaModel.findOne({ email: email }).exec();

    if (existingEmail) {
      throw createHttpError(
        409,
        'A user with this email address already exists. Please choose a different one or log in instead.',
      );
    }

    //   將 password 用 bcrypt 處理過後再存入資料庫
    const passwordHashed = await bcrypt.hash(passwordRaw, 10);

    //   都沒問題後，建立新的 user
    const newUser = await UserSchemaModel.create({
      username: username,
      email: email,
      password: passwordHashed,
    });

    //   並且在 session 中記錄 userId
    req.session.userId = newUser._id;

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

interface LoginBody {
  username?: string;
  password?: string;
}

export const login: RequestHandler<unknown, unknown, LoginBody, unknown> = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      throw createHttpError(400, 'Parameters missing');
    }

    // 檢查使用者是否存在
    // 之所以要用 select('+password') 是因為我們在 UserSchema 中設定 password 的 select 為 false
    const user = await UserSchemaModel.findOne({ username: username }).select('+password +email').exec();

    if (!user) {
      throw createHttpError(401, 'Invalid credentials');
    }

    // 檢查加密後的密碼是否有與資料庫中的相符
    const passwordMatch = await bcrypt.compare(password, user.password!);

    if (!passwordMatch) {
      throw createHttpError(401, 'Invalid credentials');
    }

    //  並且在 session 中記錄 userId
    req.session.userId = user._id;

    // 並且回傳 user 資料
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const logout: RequestHandler = async (req, res, next) => {
  req.session.destroy((error) => {
    if (error) {
      next(error);
    } else {
      res.sendStatus(200);
    }
  });
};
