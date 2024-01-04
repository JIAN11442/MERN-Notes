import express from 'express';
import * as NotesController from '../controllers/notes.controller';

const routes = express.Router();

routes.get('/', NotesController.getNotes);

routes.get('/query', NotesController.getNoteById);

routes.post('/', NotesController.createNote);

routes.patch('/query', NotesController.updateNoteById);

routes.delete('/query', NotesController.deleteNoteById);

export default routes;
