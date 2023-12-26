/* eslint-disable import/prefer-default-export */

import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import mongoose from 'mongoose';
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
    if (!noteId) {
      throw createHttpError(400, 'Note id not provided');
    } else if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, 'Invalid note id');
    }

    const noteById = await noteSchemaModel.findById(noteId).exec();

    if (!noteById) {
      res.status(404).json({ error: 'Note not found' });
      // throw createHttpError(404, 'Note not found');
    }

    res.status(200).json(noteById);
  } catch (error) {
    next(error);
  }
};

interface createNoteBody {
  title: string;
  content?: string;
}

export const createNote: RequestHandler<unknown, unknown, createNoteBody, unknown> = async (req, res, next) => {
  const { title, content } = req.body;
  try {
    if (!title) {
      throw createHttpError(400, 'Note must have a title');
    }

    const newNote = await noteSchemaModel.create({
      title: title,
      content: content,
    });
    res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
};

interface updateNoteQuery {
  noteId: string;
}

interface updateNoteBody {
  title?: string;
  content?: string;
}

export const updateNoteById: RequestHandler<unknown, unknown, updateNoteBody, updateNoteQuery> = async (
  req,
  res,
  next,
) => {
  const noteId = req.query.noteId as string;
  const { title: newTitle, content: newContent } = req.body;

  try {
    if (!noteId) {
      throw createHttpError(400, 'Note id not provided');
    } else if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, 'Invalid note id');
    }

    if (!newTitle) {
      throw createHttpError(400, 'Note must have a title');
    }

    const noteById = await noteSchemaModel.findById(noteId).exec();

    if (!noteById) {
      throw createHttpError(404, 'Note not found');
    }

    if (newTitle === noteById.title && newContent === noteById.content) {
      throw createHttpError(400, 'Note not modified');
    }

    noteById.title = newTitle;
    noteById.content = newContent;

    const updatedNoteById = await noteById.save();
    res.status(200).json(updatedNoteById);
  } catch (error) {
    next(error);
  }
};

export const deleteNoteById: RequestHandler = async (req, res, next) => {
  const noteId = req.query.noteId as string;

  try {
    if (!noteId) {
      throw createHttpError(400, 'Note id not provided');
    } else if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, 'Invalid note id');
    }

    const noteById = await noteSchemaModel.findById(noteId).exec();

    if (!noteById) {
      throw createHttpError(404, 'Note not found');
    }

    await noteSchemaModel.deleteOne({ _id: noteId });
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
