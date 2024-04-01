import { IsNotEmpty, IsPostalCode, IsString, Length } from "class-validator";

export class AddressSchemaModel {
    @IsNotEmpty()
    @IsPostalCode('BR')
    postalCode: string

    @IsNotEmpty()
    @IsString()
    @Length(6, 255)
    publicPlace: string

    @IsNotEmpty()
    @IsString()
    @Length(1, 10)
    number: string

    @IsString()
    @Length(0, 255)
    complement: string

    @IsNotEmpty()
    @IsString()
    @Length(2, 50)
    city: string

    @IsNotEmpty()
    @IsString()
    @Length(2, 50)
    neighborhood: string

    @IsNotEmpty()
    @IsString()
    @Length(2, 50)
    state: string
}