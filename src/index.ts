import express from "express"
import path from "path"
import { ApolloServer } from "@apollo/server"
import { expressMiddleware } from "@apollo/server/express4"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config({
  path: path.join(__dirname, ".env"),
})

import typeDefs from "./graphql/schema"
import Query from "./graphql/resolvers/queries"
import Mutation from "./graphql/resolvers/mutations"

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

  // Create Graphql Server
  const gqlServer = new ApolloServer({
    typeDefs, // schema
    resolvers: {
      Query,
      Mutation,
    },
  })

  // Start the gql server
  await gqlServer.start()

  app.get("/", (req, res) => {
    res.json({ message: "Server is up and running" })
  })

  app.use("/graphql", expressMiddleware(gqlServer))

  app.listen(PORT, () =>
    console.log(`Server is running on http://localhost:${PORT}`)
  )
}

init()
