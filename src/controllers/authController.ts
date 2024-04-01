import crypto from "crypto";
import express from "express";
import jwt, { verify } from 'jsonwebtoken';
import validator from 'validator';
import { APIError } from "../@types/types";
import AdminsRepository from '../repositories/adminRepository';

const errorPrefix = 'AUTCON537'

class AuthController {
    /**
        Validate user authentication 
        @param {express.Request} req - Request.
        @param {express.Response} res - Response of request.
        @returns { Promise<void> }
    */
    public async login(req: express.Request, res: express.Response, next: express.NextFunction) {
        const password = req.body.password as string
        const username = req.body.username as string
        console.log("🚀 ~ AuthController ~ login ~ username:", username)

        if (validator.isEmpty(username) || validator.isEmpty(password)) throw new APIError(
            'Invalid username or password.',
            `${errorPrefix}05`,
            'Invalid username ' + req.body.username + ' or password.',
            422,
        )

        const passwordCrypto = crypto.createHash('sha256').update(password).digest('hex')
        const admin = await AdminsRepository.findOne(username, passwordCrypto)

        if (!admin) throw new APIError('Admin not found!', errorPrefix + '06', 'Admin not found!', 404, {
            username: username
        })

        const token = jwt.sign({
            username
        },
            process.env.SECRETJWT!
            , {
                expiresIn: 1200
            }
        )

        res.status(200).json({
            auth: true,
            token
        })
    }
    
    /**
        Validates whether the request is authenticated with jwt
        @param {express.Request} req - Request.
        @param {express.Response} res - Response of request.
        @returns { Promise<void> }
    */
    async verifyIsAuthenticated(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const authHeader = req.headers['authorization']
            const token = authHeader && authHeader.split(' ')[1] || ''
    
            verify(token, process.env.SECRETJWT!, (err, decoded) => {
                if (decoded) next()
                if (err?.message === 'jwt expired') {
                    throw new APIError(
                        'jwt expired.',
                        `${errorPrefix}01`,
                        'jwt expired.',
                        401,
                    )
                }
    
                else if (err?.message === 'invalid token') {
                    throw new APIError(
                        'invalid token.',
                        `${errorPrefix}02`,
                        'invalid token.',
                        401,
                    )
                } else if (err?.message === 'jwt must be provided') {
                    throw new APIError(
                        'jwt must be provided.',
                        `${errorPrefix}03`,
                        'jwt must be provided.',
                        401,
                    )
                }
                else if (err) {
                    throw new APIError(
                        `unexpected error.`,
                        `${errorPrefix}04`,
                        "unexpected error.",
                        401
                    )
                }
            })
        } catch(err: any) {
            res.status(err.statusCode || 500).json(err)
        }
        
    }
}

export default new AuthController()