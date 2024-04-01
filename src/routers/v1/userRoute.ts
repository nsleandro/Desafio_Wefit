import express from "express";
import CreateUserMiddleware from "../../middlewares/createUserMiddleware";
import AuthController from './../../controllers/authController';
import UserController from './../../controllers/userController';

const userRouter = express.Router({ mergeParams: true })

userRouter.post('/', CreateUserMiddleware.validate, UserController.create)
userRouter.get('/', AuthController.verifyIsAuthenticated, UserController.getAll)
userRouter.get('/:id', AuthController.verifyIsAuthenticated, UserController.getById)
userRouter.delete('/:id', AuthController.verifyIsAuthenticated, UserController.deleteById)

export default userRouter
