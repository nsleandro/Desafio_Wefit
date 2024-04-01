import crypto from "crypto";
import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1711933610407 implements MigrationInterface {
    name = 'Migration1711933610407'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`admins\` (\`id\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`username\` varchar(40) NOT NULL, \`password\` varchar(64) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_4ba6d0c734d53f8e1b2e24b6c5\` (\`username\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        
        const password = crypto.createHash('sha256').update(process.env.MYSQLDB_PASSWORD!).digest('hex')
        await queryRunner.query(`INSERT INTO \`wefit\`.\`admins\`(\`username\`, \`password\`) VALUES('root', '${password}')`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_4ba6d0c734d53f8e1b2e24b6c5\` ON \`admins\``);
        await queryRunner.query(`DROP TABLE \`admins\``);
    }

}
