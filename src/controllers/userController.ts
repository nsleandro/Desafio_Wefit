import express from "express"
import { UserSchemaModel } from "../models/userSchemaModel"
import UsersAddressesRepository from './../repositories/userAdressRepository'
import UsersContactsRepository from './../repositories/userContactRepository'
import UsersRepository from './../repositories/userRepository'
import { APIError } from "../@types/types"
import Database from "../database/database"

const errorPrefix = 'USRCON537'

class UserController {

    /**
        Handler create user
        @param { UserSchemaModel } schema - Schema user.
        @param {express.Request} req - Request.
        @param {express.Response} res - Response of request.
        @param {express.NextFunction} res - next of request.
        @returns { Promise<void> }
    */
    async create(schema: UserSchemaModel, req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            await Database.getManager().transaction(async managerTransaction => {
                const user = await UsersRepository.save(schema, managerTransaction)
                user.contactEntity = await UsersContactsRepository.save(schema.contact, user.id, managerTransaction)
                user.usersAddress = await UsersAddressesRepository.save(schema.address, user.id, managerTransaction)
                res.status(200).json(user)
            })
        } catch (error) {
            next(error)
        }
    }

    /**
        Handler get user by id 
        @param {express.Request} req - Request.
        @param {express.Response} res - Response of request.
        @param {express.NextFunction} res - next of request.
        @returns { Promise<void> }
    */
    async getById(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const user = await UsersRepository.findByid(+req.params.id)
            res.status(200).json(user)
        } catch (error) {
            next(error)
        }
    }

    /**
        Handler delete user by id 
        @param {express.Request} req - Request.
        @param {express.Response} res - Response of request.
        @param {express.NextFunction} res - next of request.
        @returns { Promise<void> }
    */
    async deleteById(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const user = await UsersRepository.findByid(+req.params.id)
            if (!user) throw new APIError('User not found!', errorPrefix + '01', 'User not found!', 404, {
                userId: req.params.id
            })

            const deleted = await UsersRepository.deleteById(user.id)
            res.status(200).json(deleted)
        } catch (error) {
            next(error)
        }
    }

    /**
        Handler get all users 
        @param {express.Request} req - Request.
        @param {express.Response} res - Response of request.
        @param {express.NextFunction} res - next of request.
        @returns { Promise<void> }
    */
    async getAll(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const page = req.query.page ? parseInt(req.query.page.toString()) : 0
            const users = await UsersRepository.find(page)

            res.status(200).json(users)
        } catch (error) {
            next(error)
        }
    }
}

export default new UserController()