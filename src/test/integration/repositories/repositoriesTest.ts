import { userRepositoryTest } from "./userRepositoryTest"

export const repositoriesTest = async () => describe("Repositories test", () => {
    userRepositoryTest()
})