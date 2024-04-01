import express from "express"
import userRouter from "./v1/userRoute"
import companyRouter from "./v1/companyRouter"
import authRouter from "./v1/authRouter"

const v1Router = express.Router({ mergeParams: true })

v1Router.use("/auth", authRouter)
v1Router.use("/users", userRouter)
v1Router.use('/companies', companyRouter)

v1Router.use((err: any, _req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(err.statusCode || 500).json(err)
  })

export default v1Router
