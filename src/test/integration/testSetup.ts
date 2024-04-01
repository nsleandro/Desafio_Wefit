import Database from "../../database/database"

beforeAll(async () => {
    await Database.Init()
    await Database.startTransaction()
})

afterAll(async () => {
    await Database.rollbackTransaction()
    await Database.destroy()
})

