import Database from "../database/database"
import UsersAddressesEntity from "../entities/usersAddressesEntity"
import { AddressSchemaModel } from "../models/addressSchemaModel"

class UsersAddressesRepository {
    constructor() { }

    /**
        Save address of user in database
        @param { AddressSchemaModel } schema - Schema address user.
        @param { number } userId - User id.
        @param { EntityManager } manager - Entity manager working only with this query runner.
        @returns { Promise<UsersAddressesEntity> }
    */
    async save(schema: AddressSchemaModel, userId: number, manager = Database.getManager()) {
        const create = manager.create(UsersAddressesEntity, {
            ...schema,
            userId
        })

        return await manager.save(create)
    }

}

export default new UsersAddressesRepository()
