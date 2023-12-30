import { ApolloServer } from "@apollo/server"

import prismaClient from "../lib/prismadb"

async function createApolloGraphQLServer() {
  // Create a new Apollo GraphQL Server
  const gqlServer = new ApolloServer({
    typeDefs: `
      type Query {
        hello: String
        say(name: String): String
      },
      type Mutation {
        createUser(firstName: String!, lastName: String!, email: String!, password: String!): Boolean
      }
    `, // Schema
    resolvers: {
      Query: {},
      Mutation: {
        createUser: async (
          _: any,
          {
            firstName,
            lastName,
            email,
            password,
          }: {
            firstName: string
            lastName: string
            email: string
            password: string
          }
        ) => {
          await prismaClient.user.create({
            data: {
              firstName,
              lastName,
              email,
              password,
            },
          })
          return true
        },
      },
    },
  })

  // Start the gql server
  await gqlServer.start()

  return gqlServer
}

export default createApolloGraphQLServer
