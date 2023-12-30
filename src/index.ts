import express from "express"
import path from "path"
import { expressMiddleware } from "@apollo/server/express4"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config({
  path: path.join(__dirname, ".env"),
})

import createApolloGraphQLServer from "./graphql"

async function init() {
  const app = express()
  const PORT = process.env.PORT || 8000

  app.use(
    cors({
      origin: "http://localhost:5173",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true,
      optionsSuccessStatus: 204,
    })
  )
  app.use(express.json())

  app.get("/", (req, res) => {
    res.json({ message: "Server is up and running" })
  })

  app.use("/graphql", expressMiddleware(await createApolloGraphQLServer()))

  app.listen(PORT, () =>
    console.log(`Server is running on http://localhost:${PORT}`)
  )
}

init()
