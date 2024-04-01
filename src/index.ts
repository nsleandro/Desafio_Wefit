import cors from 'cors'
import express from "express"
import swaggerUi from 'swagger-ui-express'
import Database from './database/database'
import v1Router from "./routers/v1Router"
import swaggerDocs from './swagger.json'

require("custom-env").env(true)

const app = express()
app.use(express.json())
app.use(cors())

const port = process.env.PORT || 4568

Database.Init().then(() => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))
  app.use('/v1', v1Router)
})

app.listen(port, () => {
  console.log(`Escutando na porta ${port}`)
})
