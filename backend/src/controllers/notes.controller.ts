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

export const getNoteById: RequestHandler = async (req, res, next) => {
  const noteId = req.query.noteId as string;
  try {
    const noteById = await noteSchemaModel.findById(noteId).exec();
    res.status(200).json(noteById);
  } catch (error) {
    next(error);
  }
};

export const createNote: RequestHandler = async (req, res, next) => {
  const { title, content } = req.body;
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
