import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1711850690579 implements MigrationInterface {
    name = 'Migration1711850690579'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users_contacts\` (\`id\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`cell\` varchar(20) NOT NULL, \`phone\` varchar(20) NULL, \`userId\` int UNSIGNED NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`REL_0a0ac3a07cef56963484786227\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users_addresses\` (\`id\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`postalCode\` varchar(10) NOT NULL, \`publicPlace\` varchar(255) NOT NULL, \`number\` varchar(10) NOT NULL, \`complement\` varchar(255) NOT NULL, \`city\` varchar(50) NOT NULL, \`neighborhood\` varchar(50) NOT NULL, \`state\` varchar(50) NOT NULL, \`userId\` int UNSIGNED NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`REL_f37ee0c84e56c1124a44a0af14\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`document\` varchar(14) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_951b8f1dfc94ac1d0301a14b7e\` (\`uuid\`), FULLTEXT INDEX \`IDX_51b8b26ac168fbe7d6f5653e6c\` (\`name\`), UNIQUE INDEX \`IDX_U_DOCUMENT\` (\`document\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`companies\` (\`id\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`document\` varchar(14) NOT NULL, \`userId\` int UNSIGNED NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_535ddf773996ede3697d07ef71\` (\`uuid\`), FULLTEXT INDEX \`IDX_3dacbb3eb4f095e29372ff8e13\` (\`name\`), UNIQUE INDEX \`IDX_U_DOCUMENT\` (\`document\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`users_contacts\` ADD CONSTRAINT \`FK_0a0ac3a07cef56963484786227c\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`users_addresses\` ADD CONSTRAINT \`FK_f37ee0c84e56c1124a44a0af14e\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`companies\` ADD CONSTRAINT \`FK_6d64e8c7527a9e4af83cc66cbf7\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`companies\` DROP FOREIGN KEY \`FK_6d64e8c7527a9e4af83cc66cbf7\``);
        await queryRunner.query(`ALTER TABLE \`users_addresses\` DROP FOREIGN KEY \`FK_f37ee0c84e56c1124a44a0af14e\``);
        await queryRunner.query(`ALTER TABLE \`users_contacts\` DROP FOREIGN KEY \`FK_0a0ac3a07cef56963484786227c\``);
        await queryRunner.query(`DROP INDEX \`IDX_U_DOCUMENT\` ON \`companies\``);
        await queryRunner.query(`DROP INDEX \`IDX_3dacbb3eb4f095e29372ff8e13\` ON \`companies\``);
        await queryRunner.query(`DROP INDEX \`IDX_535ddf773996ede3697d07ef71\` ON \`companies\``);
        await queryRunner.query(`DROP TABLE \`companies\``);
        await queryRunner.query(`DROP INDEX \`IDX_U_DOCUMENT\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_51b8b26ac168fbe7d6f5653e6c\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_951b8f1dfc94ac1d0301a14b7e\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP INDEX \`REL_f37ee0c84e56c1124a44a0af14\` ON \`users_addresses\``);
        await queryRunner.query(`DROP TABLE \`users_addresses\``);
        await queryRunner.query(`DROP INDEX \`REL_0a0ac3a07cef56963484786227\` ON \`users_contacts\``);
        await queryRunner.query(`DROP TABLE \`users_contacts\``);
    }

}
