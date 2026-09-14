import {Router} from 'express';
import {ProjectController} from './controllers/project.controller';
import {UserController} from './controllers/user.controller';

const routes = Router();
const userController = new UserController();
const projectController = new ProjectController();

routes.get('/users', userController.findAll);
routes.get('/users/:id', userController.findById);
routes.post('/users', userController.create);
routes.put('/users/:id', userController.update);
routes.delete('/users/:id', userController.delete);

routes.get('/projects', projectController.findAll);
routes.get('/projects/:id', projectController.findById);
routes.post('/projects', projectController.create);
routes.put('/projects/:id', projectController.update);
routes.delete('/projects/:id', projectController.delete);

export {routes};
