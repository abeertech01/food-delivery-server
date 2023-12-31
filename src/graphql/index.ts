import { ApolloServer } from "@apollo/server"

import prismaClient from "../lib/prismadb"
import { User } from "./user"

async function createApolloGraphQLServer() {
  // Create a new Apollo GraphQL Server
  const gqlServer = new ApolloServer({
    typeDefs: `
      ${User.typeDefs}
      type Query {
        hello: String
        say(name: String): String
        ${User.queries}
      },
      type Mutation {
        ${User.mutations}
      }
    `, // Schema
    resolvers: {
      Query: {
        ...User.resolvers.queries,
      },
      Mutation: {
        ...User.resolvers.mutations,
      },
    },
  })

  // Start the gql server
  await gqlServer.start()

  return gqlServer
}

export default createApolloGraphQLServer
