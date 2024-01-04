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
