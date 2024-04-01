import { validate } from "class-validator"
import { ContactSchemaModel } from "../../models/contactSchemaModel"
import { contactMock } from "../mock/contactsMock"
import { plainToInstance } from "class-transformer"

describe('Schema of contact', () => {
    it('Success validation contact schema', async () => {
        const schema = plainToInstance(ContactSchemaModel, contactMock)
        const errors = await validate(schema, { whitelist: true })

        expect(errors.length).toEqual(0)
    })

    it('Error validation contact schema - Email invalid', async () => {
        const contactMockSchema = {
            ...contactMock, email: 'teste'
        }
        const schema = plainToInstance(ContactSchemaModel, contactMockSchema)
        const errors = await validate(schema, { whitelist: true })

        expect(errors.length).toEqual(1)
        expect(errors[0].property).toEqual('email')
        expect(errors[0].constraints).toHaveProperty('isEmail', 'email must be an email')
    })

    it('Error validation contact schema - cell invalid', async () => {
        const contactMockSchema = {
            ...contactMock, cell: 'teste'
        }
        const schema = plainToInstance(ContactSchemaModel, contactMockSchema)
        const errors = await validate(schema, { whitelist: true })

        expect(errors.length).toEqual(1)
        expect(errors[0].property).toEqual('cell')
        expect(errors[0].constraints).toHaveProperty('isPhoneNumber', 'cell must be a valid phone number')
    })


    it('Error validation contact schema - phone invalid', async () => {
        const contactMockSchema = {
            ...contactMock, phone: 'teste'
        }
        const schema = plainToInstance(ContactSchemaModel, contactMockSchema)
        const errors = await validate(schema, { whitelist: true })

        expect(errors.length).toEqual(1)
        expect(errors[0].property).toEqual('phone')
        expect(errors[0].constraints).toHaveProperty('isPhoneNumber', 'phone must be a valid phone number')
    })
})