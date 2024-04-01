import Database from '../database/database'
import CompaniesContactsEntity from "../entities/companiesContactsEntity"
import { ContactSchemaModel } from "../models/contactSchemaModel"

class CompaniesContactsRepository {

    constructor() { }

    /**
        Save contact of company in database
        @param { ContactSchemaModel } schema - Schema address company.
        @param { number } companyId - Company id.
        @param { EntityManager } manager - Entity manager working only with this query runner.
        @returns { Promise<CompaniesContactsEntity> }
    */
    async save(schema: ContactSchemaModel, companyId: number, manager = Database.getManager()) {
        const create = manager.create(CompaniesContactsEntity, {
            ...schema,
            companyId
        })

        return await manager.save(create)
    }
}

export default new CompaniesContactsRepository()
