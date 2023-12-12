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

export const createNote: RequestHandler = async (req, res, next) => {
  const { title, content } = req.body;
  // console.log('Received title:', title);
  // console.log('Received content:', content);
  try {
    const newNote = await noteSchemaModel.create({
      title: title,
      content: content,
    });
    res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
};
