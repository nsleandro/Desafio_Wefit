import { DataSource, EntityManager, QueryRunner } from 'typeorm'
import dataSource from './../../ormconfig'

export default abstract class Database {
    static connection: DataSource
    static queryRunner: QueryRunner

    /**
        Init connect of database
        @returns { Promise<DataSource> }
    */
    static async Init() {
        const connection = dataSource
        try {
            await connection.initialize()
            this.connection = connection

            await connection.runMigrations()
            this.queryRunner = this.connection.createQueryRunner()
            return connection
        }
        catch (e) {
            throw e;
        }
    }

    /**
        Get manager
        @returns { EntityManager }
    */
    static getManager() {
        return this.queryRunner.manager
    }

    /**
        Destroy connect of database
        @returns { Promise<void> }
    */
    static async destroy() {
        return await this.connection.destroy()
    }

    /**
        Start Transaction
        @returns { Promise<void> }
    */
    static async startTransaction() {
        await this.queryRunner.startTransaction()
    }

    /**
        Rollback Transaction
        @returns { Promise<void> }
    */
    static async rollbackTransaction() {
        await this.queryRunner.rollbackTransaction()
    }
}
