import { IsDefined, IsNotEmpty, IsString, Length, Validate, ValidateNested, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import ValidDocuments from "../services/utils/validDocuments.util";
import { AddressSchemaModel } from "./addressSchemaModel";
import { ContactSchemaModel } from "./contactSchemaModel";

@ValidatorConstraint({
    name: 'CPF',
    async: false
})
class Cpf implements ValidatorConstraintInterface {
    validate(value: string = '') {
        value = value.replace(/[^0-9]/g, '')
        const len = value.length

        if (!(len === 11 || len === 14)) return false

        return ValidDocuments.cpf(value)
    }

    defaultMessage() {
        return 'Cpf invalid!'
    }
}

class UserSchemaModel {
    @IsNotEmpty()
    @Length(2, 255)
    name!: string

    @IsNotEmpty()
    @Length(10, 14)
    @IsString()
    @Validate(Cpf)
    cpf!: string

    @ValidateNested()
    @IsDefined()
    contact: ContactSchemaModel

    @ValidateNested()
    @IsDefined()
    address: AddressSchemaModel
}

export {
    UserSchemaModel
};

