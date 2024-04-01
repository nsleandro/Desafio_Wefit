import { IsEmail, IsNotEmpty, IsPhoneNumber } from "class-validator"

export class ContactSchemaModel {
    @IsNotEmpty()
    @IsEmail()
    email!: string

    @IsNotEmpty()
    @IsPhoneNumber('BR')
    cell!: string

    @IsNotEmpty()
    @IsPhoneNumber('BR')
    phone!: string
}
