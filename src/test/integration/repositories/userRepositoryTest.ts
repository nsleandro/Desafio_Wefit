import UsersEntity from "../../../entities/usersEntity"
import UsersRepository from "../../../repositories/userRepository"
import { userMock } from "../../mock/usersMock"


export const userRepositoryTest = () => describe("User repository", () => {
    let userSaved: UsersEntity

    it('Sucess Save user', async () => {
        const newUserMock = { ...userMock }
        const user = await UsersRepository.save(newUserMock)
        userSaved = user
        expect(user).toHaveProperty('id')
        expect(user).toHaveProperty('uuid')
    })

    it('Error Save user - Document already in use', async () => {
        try {
            const newUserMock = {
                ...userMock
            }
            await UsersRepository.save(newUserMock)
        } catch (error) {
            expect(error).toHaveProperty('code', 'USRREP84701')
        }
    })

    it('Sucess get users', async () => {
        const users = await UsersRepository.find(0)
        expect(Array.isArray(users)).toBe(true)
        expect((Array.isArray(users) ? users : []).length).toBeGreaterThanOrEqual(1)
    })

    it('Sucess get user by cpf', async () => {
        const user = await UsersRepository.findByCpf(userMock.cpf)
        expect(user).toHaveProperty('id', userSaved.id)
        expect(user).toHaveProperty('uuid', userSaved.uuid)
        expect(user).toHaveProperty('name', userSaved.name)
    })

    it('Sucess get user by id', async () => {
        const user = await UsersRepository.findByid(userSaved.id)
        expect(user).toHaveProperty('id', userSaved.id)
        expect(user).toHaveProperty('uuid', userSaved.uuid)
        expect(user).toHaveProperty('name', userSaved.name)
    })
})