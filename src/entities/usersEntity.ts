import { Column, CreateDateColumn, Entity, Generated, Index, JoinColumn, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import UsersContactsEntity from "./usersContactsEntity";
import UsersAddressesEntity from "./usersAddressesEntity";
import CompaniesEntity from "./companiesEntity";

/**
    Table of users
   */
@Entity('users')
export default class UsersEntity {
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

    @OneToOne(() => UsersContactsEntity, contact => contact.user)
    contactEntity?: UsersContactsEntity

    @OneToOne(() => UsersAddressesEntity, (usersAddressesEntity) => usersAddressesEntity.user)
    usersAddress?: UsersAddressesEntity

    @OneToMany(() => CompaniesEntity, (companiesEntity) => companiesEntity.user)
    companies?: CompaniesEntity[]

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