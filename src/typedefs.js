import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Query {
    dogs: [Dog!]!
  }

  type Dog {
    id: ID!
    name: String!
    picture: String
    birthday: String
  }

  type Defecation {
    id: ID!
  }

  type Mutation {
    createDog(name: String!, birthday: String, picture: String): Dog!
  }
`;
