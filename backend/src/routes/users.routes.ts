import express from 'express';
import * as UserController from '../controllers/users.controller';

const routes = express.Router();

routes.post('/signup', UserController.signUp);

export default routes;
