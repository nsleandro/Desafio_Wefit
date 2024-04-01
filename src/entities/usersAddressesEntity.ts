import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import UsersEntity from "./usersEntity";

@Entity('users_addresses')
export default class UsersAddressesEntity {
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
    userId!: number

    @OneToOne(() => UsersEntity, (user) => user.usersAddress, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "userId", referencedColumnName: "id" })
    user!: UsersEntity

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