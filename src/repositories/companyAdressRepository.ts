import Database from "../database/database"
import CompaniesAddressesEntity from "../entities/companiesAddressesEntity"
import { AddressSchemaModel } from "../models/addressSchemaModel"


class CompaniesAddressesRepository {
    constructor() { }

    /**
        Save address of company in database
        @param { AddressSchemaModel } schema - Schema address company.
        @param { number } companyId - Company id.
        @param { EntityManager } manager - Entity manager working only with this query runner.
        @returns { Promise<CompaniesAddressesEntity> }
    */
    async save(schema: AddressSchemaModel, companyId: number, manager = Database.getManager()) {
        const create = manager.create(CompaniesAddressesEntity, {
            ...schema,
            companyId
        })

        return await manager.save(create)
    }

}

export default new CompaniesAddressesRepository()
