import express from "express";
import AuthController from './../../controllers/authController'

const authRouter = express.Router({ mergeParams: true });

authRouter.post('/', AuthController.login)

export default authRouter
