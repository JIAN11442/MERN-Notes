import express from 'express';
import * as UserController from '../controllers/users.controller';

const routes = express.Router();

routes.get('/', UserController.getAuthenticatedUser);

routes.post('/signup', UserController.signUp);

routes.post('/login', UserController.login);

routes.post('/logout', UserController.logout);

export default routes;
