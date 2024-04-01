
import { plainToInstance } from "class-transformer"
import express from "express"
import { AddressSchemaModel } from "../models/addressSchemaModel"
import { CompanySchemaModel } from "../models/companySchemaModel"
import { ContactSchemaModel } from "../models/contactSchemaModel"
import { validateAndThrow } from "../services/validateAndThrowSchema"

class CreateCompanyMiddleware {

    /**
        Middleware of validate schema to create company.
        @param {express.Request} req - Request.
        @param {express.Response} res - Response of request.
        @param {express.NextFunction} res - next of request.
        @returns { Promise<void> }
    */
    async validate(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const schema = plainToInstance(CompanySchemaModel, req.body.company)
            schema.contact = plainToInstance(ContactSchemaModel, req.body.company?.contact || {})
            schema.address = plainToInstance(AddressSchemaModel, req.body.company?.address || {})

            await validateAndThrow(schema || {})
            schema.cpf = schema.cpf.replace(/[^0-9]/g, '')
            schema.cnpj = schema.cnpj.replace(/[^0-9]/g, '')

            next(schema)
        } catch (error) {
            res.status(422).json(error)
        }
    }
}

export default new CreateCompanyMiddleware()
