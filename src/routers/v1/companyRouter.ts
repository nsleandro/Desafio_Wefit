import express from "express";
import CreateCompanyMiddleware from "../../middlewares/createCompanyMiddleware";
import AuthController from './../../controllers/authController';
import CompanyController from './../../controllers/companyController';

const companyRouter = express.Router({ mergeParams: true })

companyRouter.post('/', CreateCompanyMiddleware.validate, CompanyController.create)
companyRouter.get('/', AuthController.verifyIsAuthenticated, CompanyController.getAll)
companyRouter.get('/:id', AuthController.verifyIsAuthenticated, CompanyController.getById)
companyRouter.delete('/:id', AuthController.verifyIsAuthenticated, CompanyController.deleteById)

export default companyRouter