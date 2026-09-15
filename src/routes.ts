import {Router} from 'express';
import {ProjectController} from './controllers/project.controller';
import {UserController} from './controllers/user.controller';
import { AuthController } from './controllers/auth.controller';
import { authMiddleware } from './middlewares/auth.middleware';

const routes = Router();
const userController = new UserController();
const projectController = new ProjectController();
const authController = new AuthController();

routes.post('/login', authController.login);

routes.get('/users', authMiddleware, userController.findAll);
routes.get('/users/:id', authMiddleware, userController.findById);
routes.post('/users', authMiddleware, userController.create);
routes.put('/users/:id',  authMiddleware, userController.update);
routes.delete('/users/:id', authMiddleware, userController.delete);

routes.get('/projects', authMiddleware, projectController.findAll);
routes.get('/projects/:id', authMiddleware, projectController.findById);
routes.post('/projects', authMiddleware, projectController.create);
routes.put('/projects/:id', authMiddleware, projectController.update);
routes.delete('/projects/:id', authMiddleware, projectController.delete);

export {routes};
