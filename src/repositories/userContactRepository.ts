import Database from "../database/database"
import UsersContactsEntity from "../entities/usersContactsEntity"
import { ContactSchemaModel } from "../models/contactSchemaModel"

class UsersContactsRepository {

    constructor() { }

    /**
        Save contact of user in database
        @param { ContactSchemaModel } schema - Schema contact user.
        @param { number } userId - User id.
        @param { EntityManager } manager - Entity manager working only with this query runner.
        @returns { Promise<UsersContactsEntity> }
    */
    async save(schema: ContactSchemaModel, userId: number, manager = Database.getManager()) {
        const create = manager.create(UsersContactsEntity, {
            ...schema,
            userId
        })

        return await manager.save(create)
    }
}

export default new UsersContactsRepository()
