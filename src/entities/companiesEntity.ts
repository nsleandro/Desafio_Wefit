import { Column, CreateDateColumn, Entity, Generated, Index, JoinColumn, ManyToMany, ManyToOne, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import UsersEntity from "./usersEntity";
import CompaniesContactsEntity from "./companiesContactsEntity";
import CompaniesAddressesEntity from "./companiesAddressesEntity";

@Entity('companies')
export default class CompaniesEntity {
    @PrimaryGeneratedColumn({ type: "int", unsigned: true })
    @PrimaryColumn("int", { unsigned: true })
    id!: number

    @Column('uuid')
    @Generated("uuid")
    @Index({ unique: true })
    uuid!: string

    @Column("varchar", { length: 255, nullable: false })
    @Index({ fulltext: true })
    name!: string

    @Column("varchar", { length: 14, nullable: false, select: false })
    @Index('IDX_U_DOCUMENT', { unique: true })
    document!: string

    @Column({ type: 'int', unsigned: true })
    userId!: number

    @ManyToOne(() => UsersEntity, (user) => user.companies, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "userId", referencedColumnName: "id" })
    user!: UsersEntity

    @OneToOne(() => CompaniesContactsEntity, (companiesContactsEntity) => companiesContactsEntity.company)
    companyContact?: CompaniesContactsEntity

    @OneToOne(() => CompaniesAddressesEntity, (companiesAddressesEntity) => companiesAddressesEntity.company)
    companyAddress?: CompaniesAddressesEntity    

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