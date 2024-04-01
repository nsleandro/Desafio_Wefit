import Database from '../database/database'
import AdminsEntity from "../entities/adminsEntity"

class AdminsRepository {

    /**
        Find admin by id in database 
        @param { number } username - Username.
        @param { string } password - Password.
        @param { EntityManager } manager - Entity manager working only with this query runner.
        @returns { Promise<UsersEntity | null> }
    */
    async findOne(username: string, password: string, manager = Database.getManager()) {
        return await manager.findOne(AdminsEntity, {
            where: {
                username,
                password
            }
        })
    }

}

export default new AdminsRepository()