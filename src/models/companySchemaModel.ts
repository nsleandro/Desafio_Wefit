import { IsNotEmpty, IsString, Length, Validate, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import ValidDocuments from "../services/utils/validDocuments.util";
import { UserSchemaModel } from "./userSchemaModel";

@ValidatorConstraint({
    name: 'CNPJ',
    async: false
})
class Cnpj implements ValidatorConstraintInterface {
    validate(value: string = '') {
        return ValidDocuments.cnpj(value)
    }

    defaultMessage() {
        return 'CNPJ invalid!'
    }
}

export class CompanySchemaModel extends UserSchemaModel {
    @IsNotEmpty()
    @Length(14, 18)
    @IsString()
    @Validate(Cnpj)
    cnpj!: string
}