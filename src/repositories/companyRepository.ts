import { APIError } from "../@types/types";
import Database from "../database/database";
import CompaniesEntity from "../entities/companiesEntity";
import { CompanySchemaModel } from "../models/companySchemaModel";

const errorPrefix = 'CPNREP954'

class CompaniesRepository {

    /**
        Save company in database
        @param { CompanySchemaModel } schema - Schema company.
        @param { number } userId - User id.
        @param { EntityManager } manager - Entity manager working only with this query runner.
        @returns { Promise<CompaniesEntity> }
    */
    async save(schema: CompanySchemaModel, userId: number, manager = Database.getManager()) {
        const create = manager.create(CompaniesEntity, {
            name: schema.name,
            document: schema.cpf,
            userId
        })

        return await manager.save(create).catch(e => {
            if (e && e.code === 'ER_DUP_ENTRY' && /IDX_U_DOCUMENT/.test(e.sqlMessage))
                throw new APIError(
                    `The document ${schema.cnpj} is already in use by another document.`,
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

    /**
        Find companies in database
        @param { number } page - Pagination.
        @param { EntityManager } manager - Entity manager working only with this query runner.
        @returns { Promise<CompaniesEntity[]> }
    */
    async find(page = 0, manager = Database.getManager()) {
        const companies = await manager.find(CompaniesEntity, {
            order: {
                createdAt: 'DESC'
            },
            take: 10,
            skip: page * 10,
        })

        return companies
    }

    /**
        Find company by id in database 
        @param { number } id - Company id.
        @param { EntityManager } manager - Entity manager working only with this query runner.
        @returns { Promise<CompaniesEntity | null> }
    */
    async findByid(id: number, manager = Database.getManager()) {
        const company = await manager.findOne(CompaniesEntity, {
            where: {
                id
            }
        })

        return company
    }

    /**
        Delete company by id in database 
        @param { number } id - Company id.
        @param { EntityManager } manager - Entity manager working only with this query runner.
        @returns { Promise<CompaniesEntity | null> }
    */
    async deleteById(id: number, manager = Database.getManager()) {
        const deleted = await manager.delete(CompaniesEntity, {
            id
        })

        return deleted
    }
}

export default new CompaniesRepository()