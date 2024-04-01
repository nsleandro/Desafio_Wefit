import express from "express"
import { CompanySchemaModel } from "../models/companySchemaModel"
import CompaniesRepository from '../repositories/companyRepository'
import UsersRepository from './../repositories/userRepository'
import CompaniesAddressesRepository from './../repositories/companyAdressRepository'
import CompaniesContactsRepository from './../repositories/companyContactRepository'
import { APIError } from "../@types/types"
import Database from "../database/database"

const errorPrefix = 'COMCON537'

class CompanyController {

    /**
        Handler create company
        @param { UserSchemaModel } schema - Schema company.
        @param {express.Request} req - Request.
        @param {express.Response} res - Response of request.
        @param {express.NextFunction} res - next of request.
        @returns { Promise<void> }
    */
    async create(schema: CompanySchemaModel, req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const user = await UsersRepository.findByCpf(schema.cpf)

            if (!user) throw new APIError('User not found!', errorPrefix + '01', 'User not found!', 404, {
                cpf: schema.cpf
            })
            
            await Database.getManager().transaction(async managerTransaction => {
                const company = await CompaniesRepository.save(schema, user.id, managerTransaction)
                company.companyContact = await CompaniesContactsRepository.save(schema.contact, company.id, managerTransaction)
                company.companyAddress = await CompaniesAddressesRepository.save(schema.address, company.id, managerTransaction)

                res.status(200).json(company)
            })
        } catch (error) {
            console.log("🚀 ~ CompanyController ~ create ~ error:", error)
            next(error)
        }
    }

    /**
        Handler get all companies 
        @param {express.Request} req - Request.
        @param {express.Response} res - Response of request.
        @param {express.NextFunction} res - next of request.
        @returns { Promise<void> }
    */
    async getAll(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const page = req.query.page ? parseInt(req.query.page.toString()) : 0
            const companies = await CompaniesRepository.find(page)

            res.status(200).json(companies)
        } catch (error) {
            next(error)
        }
    }

    /**
        Handler get company by id
        @param {express.Request} req - Request.
        @param {express.Response} res - Response of request.
        @param {express.NextFunction} res - next of request.
        @returns { Promise<void> }
    */
    async getById(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const company = await CompaniesRepository.findByid(+req.params.id)
            res.status(200).json(company)
        } catch (error) {
            next(error)
        }
    }

    /**
        Handler delete company by id
        @param {express.Request} req - Request.
        @param {express.Response} res - Response of request.
        @param {express.NextFunction} res - next of request.
        @returns { Promise<void> }
    */
    async deleteById(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const company = await CompaniesRepository.findByid(+req.params.id)
            if (!company) throw new APIError('Company not found!', errorPrefix + '01', 'Company not found!', 404, {
                companyId: req.params.id
            })

            const deleted = await CompaniesRepository.deleteById(company.id)
            res.status(200).json(deleted)
        } catch (error) {
            next(error)
        }
    }
}

export default new CompanyController()
