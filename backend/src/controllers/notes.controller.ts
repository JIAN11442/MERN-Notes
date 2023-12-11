/* eslint-disable import/prefer-default-export */

import { RequestHandler } from 'express';
import noteSchemaModel from '../models/notes.schema';

export const getNotes: RequestHandler = async (req, res, next) => {
  try {
    const notes = await noteSchemaModel.find().exec();
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};
