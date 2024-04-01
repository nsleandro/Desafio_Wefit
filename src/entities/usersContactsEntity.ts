import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import UsersEntity from "./usersEntity";

@Entity('users_contacts')
export default class UsersContactsEntity {
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
    userId!: number

    @OneToOne(() => UsersEntity, (user) => user.contactEntity, {
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