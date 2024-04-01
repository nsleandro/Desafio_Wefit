import UsersEntity from "../../entities/usersEntity";
import { UserSchemaModel } from "../../models/userSchemaModel";
import { adressMock } from "./adressesMock";
import { contactMock } from "./contactsMock";

const userMock: UserSchemaModel = {
    "name": "Teste do silva",
    "cpf": "37694990007",
    "contact": contactMock,
    "address": adressMock
} 

export {
    userMock
}