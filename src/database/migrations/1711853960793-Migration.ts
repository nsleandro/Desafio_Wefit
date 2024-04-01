import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1711853960793 implements MigrationInterface {
    name = 'Migration1711853960793'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`companies_contacts\` (\`id\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`cell\` varchar(20) NOT NULL, \`phone\` varchar(20) NULL, \`companyId\` int UNSIGNED NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`REL_4cb4698bb25ee09714a0dfe068\` (\`companyId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`companies_addresses\` (\`id\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`postalCode\` varchar(10) NOT NULL, \`publicPlace\` varchar(255) NOT NULL, \`number\` varchar(10) NOT NULL, \`complement\` varchar(255) NOT NULL, \`city\` varchar(50) NOT NULL, \`neighborhood\` varchar(50) NOT NULL, \`state\` varchar(50) NOT NULL, \`companyId\` int UNSIGNED NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`REL_896a16fe482335b7ec459bdb4f\` (\`companyId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`companies\` (\`id\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`document\` varchar(14) NOT NULL, \`userId\` int UNSIGNED NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_535ddf773996ede3697d07ef71\` (\`uuid\`), FULLTEXT INDEX \`IDX_3dacbb3eb4f095e29372ff8e13\` (\`name\`), UNIQUE INDEX \`IDX_U_DOCUMENT\` (\`document\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`companies_contacts\` ADD CONSTRAINT \`FK_4cb4698bb25ee09714a0dfe0685\` FOREIGN KEY (\`companyId\`) REFERENCES \`companies\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`companies_addresses\` ADD CONSTRAINT \`FK_896a16fe482335b7ec459bdb4f8\` FOREIGN KEY (\`companyId\`) REFERENCES \`companies\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`companies\` ADD CONSTRAINT \`FK_6d64e8c7527a9e4af83cc66cbf7\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`companies\` DROP FOREIGN KEY \`FK_6d64e8c7527a9e4af83cc66cbf7\``);
        await queryRunner.query(`ALTER TABLE \`companies_addresses\` DROP FOREIGN KEY \`FK_896a16fe482335b7ec459bdb4f8\``);
        await queryRunner.query(`ALTER TABLE \`companies_contacts\` DROP FOREIGN KEY \`FK_4cb4698bb25ee09714a0dfe0685\``);
        await queryRunner.query(`DROP INDEX \`IDX_U_DOCUMENT\` ON \`companies\``);
        await queryRunner.query(`DROP INDEX \`IDX_3dacbb3eb4f095e29372ff8e13\` ON \`companies\``);
        await queryRunner.query(`DROP INDEX \`IDX_535ddf773996ede3697d07ef71\` ON \`companies\``);
        await queryRunner.query(`DROP TABLE \`companies\``);
        await queryRunner.query(`DROP INDEX \`REL_896a16fe482335b7ec459bdb4f\` ON \`companies_addresses\``);
        await queryRunner.query(`DROP TABLE \`companies_addresses\``);
        await queryRunner.query(`DROP INDEX \`REL_4cb4698bb25ee09714a0dfe068\` ON \`companies_contacts\``);
        await queryRunner.query(`DROP TABLE \`companies_contacts\``);
    }

}
