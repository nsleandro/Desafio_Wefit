import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import UsersEntity from "./usersEntity";
import CompaniesEntity from "./companiesEntity";

@Entity('companies_contacts')
export default class CompaniesContactsEntity {
    @PrimaryGeneratedColumn({ type: "int", unsigned: true })
    @PrimaryColumn("int", { unsigned: true })
    id!: number

    @Column("varchar", { length: 255, nullable: false })
    email!: string

    @Column("varchar", { length: 20, nullable: false })
    cell!: string

    @Column("varchar", { length: 20, nullable: true })
    phone!: string

    @Column({ type: 'int', unsigned: true })
    companyId!: number

    @OneToOne(() => CompaniesEntity, (companiesEntity) => companiesEntity.companyContact, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "companyId", referencedColumnName: "id" })
    company!: UsersEntity

    @CreateDateColumn({
        type: "datetime",
        name: "created_at"
    })
    readonly createdAt?: Date

    @UpdateDateColumn({
        type: "datetime",
        name: "updated_at"
    })
    readonly updatedAt?: Date
}