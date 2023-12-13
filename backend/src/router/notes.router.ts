import express from 'express';
import * as NotesController from '../controllers/notes.controller';

const router = express.Router();

router.get('/', NotesController.getNotes);

router.get('/query', NotesController.getNoteById);

router.post('/', NotesController.createNote);

router.patch('/query', NotesController.updateNoteById);

router.delete('/query', NotesController.deleteNoteById);

export default router;
