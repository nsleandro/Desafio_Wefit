import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import CompaniesEntity from "./companiesEntity";
import UsersEntity from "./usersEntity";

@Entity('companies_addresses')
export default class CompaniesAddressesEntity {
    @PrimaryGeneratedColumn({ type: "int", unsigned: true })
    @PrimaryColumn("int", { unsigned: true })
    id!: number

    @Column("varchar", { length: 10, nullable: false })
    postalCode!: string

    @Column("varchar", { length: 255, nullable: false })
    publicPlace!: string

    @Column("varchar", { length: 10, nullable: false })
    number!: string

    @Column("varchar", { length: 255, nullable: false })
    complement!: string

    @Column("varchar", { length: 50, nullable: false })
    city!: string

    @Column("varchar", { length: 50, nullable: false })
    neighborhood!: string

    @Column("varchar", { length: 50, nullable: false })
    state!: string

    @Column({ type: 'int', unsigned: true })
    companyId!: number

    @OneToOne(() => CompaniesEntity, (companiesEntity) => companiesEntity.companyAddress, {
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