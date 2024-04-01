import { APIError } from "../@types/types"
import Database from "../database/database"
import UsersEntity from "../entities/usersEntity"
import { UserSchemaModel } from "../models/userSchemaModel"

const errorPrefix = 'USRREP847'

class UsersRepository {
    constructor() { }

    /**
        Find user by id in database 
        @param { number } id - User id.
        @param { EntityManager } manager - Entity manager working only with this query runner.
        @returns { Promise<UsersEntity | null> }
    */
    async findByid(id: number, manager = Database.getManager()) {
    console.log("🚀 ~ UsersRepository ~ findByid ~ id:", id)
        
        const user = await manager.findOne(UsersEntity, {
            where: {
                id
            }
        })

        return user
    }

    /**
        Delete user by id in database 
        @param { number } id - User id.
        @param { EntityManager } manager - Entity manager working only with this query runner.
        @returns { Promise<DeleteResult> }
    */
    async deleteById(id: number, manager = Database.getManager()) {
        const deleted = await manager.delete(UsersEntity, {
            id
        })

        return deleted
    }

    /**
        Find user by cpf in database 
        @param { number } cpf - User id.
        @param { EntityManager } manager - Entity manager working only with this query runner.
        @returns { Promise<UsersEntity | null> }
    */
    async findByCpf(cpf: string, manager = Database.getManager()) {
        const user = await manager.findOne(UsersEntity, {
            where: {
                document: cpf
            }
        })

        return user
    }

    /**
        Find users in database
        @param { number } page - Pagination.
        @param { EntityManager } manager - Entity manager working only with this query runner.
        @returns { Promise<UsersEntity[]> }
    */
    async find(page = 0, manager = Database.getManager()) {
        const users = await manager.find(UsersEntity, {
            order: {
                createdAt: 'DESC'
            },
            take: 10,
            skip: page * 10,
        })

        return users
    }

    /**
        Save user in database
        @param { UserSchemaModel } schema - Schema user.
        @param { EntityManager } manager - Entity manager working only with this query runner.
        @returns { Promise<UsersEntity> }
    */
    async save(schema: UserSchemaModel, manager = Database.getManager()) {
        schema.cpf = schema.cpf.replace(/[^0-9]/g, '')

        const create = manager.create(UsersEntity, {
            name: schema.name,
            document: schema.cpf
        })

        return await manager.save(create).catch(e => {
            if (e && e.code === 'ER_DUP_ENTRY' && /IDX_U_DOCUMENT/.test(e.sqlMessage))
                throw new APIError(
                    `The document ${schema.cpf} is already in use by another document.`,
                    `${errorPrefix}01`,
                    "Provide a different document.",
                    422,
                    schema
                )
            throw new APIError(
                `unexpected error.`,
                `${errorPrefix}02`,
                "unexpected error.",
                401
            )
        }).then(result => result)
    }
}

export default new UsersRepository()
