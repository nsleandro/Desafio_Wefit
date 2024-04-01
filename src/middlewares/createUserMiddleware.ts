import express from "express"
import { validateAndThrow } from "../services/validateAndThrowSchema"
import { plainToInstance } from "class-transformer"
import { UserSchemaModel } from "../models/userSchemaModel"
import { ContactSchemaModel } from "../models/contactSchemaModel"
import { AddressSchemaModel } from "../models/addressSchemaModel"

class CreateUserMiddleware {

    /**
        Middleware of validate schema to create user.
        @param {express.Request} req - Request.
        @param {express.Response} res - Response of request.
        @param {express.NextFunction} res - next of request.
        @returns { Promise<void> }
    */
    async validate(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const schema = plainToInstance(UserSchemaModel, req.body.user)
            schema.contact = plainToInstance(ContactSchemaModel, req.body.user.contact)
            schema.address = plainToInstance(AddressSchemaModel, req.body.user.address)
            
            await validateAndThrow(schema || {})
            schema.cpf = schema.cpf.replace(/[^0-9]/g, '')
            next(schema)
        } catch (error) {
            res.status(422).json(error)
        }
    }
}

export default new CreateUserMiddleware()
