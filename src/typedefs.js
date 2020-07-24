import { gql } from "apollo-server-express";

export const typeDefs = gql`
  "DateTime based on the JS standard Date function"
  scalar DateTime

  enum DefecationType {
    PEE
    POOP
  }

  type Query {
    account(id: ID): Account
    defecation(id: ID!): Defecation
    defecationsByDog(dog: ID!): [Defecation!]!
    dog(id: ID!): Dog
    weight(id: ID!): Weight
    weightForDog(dog: ID!): [Weight!]!
    allAccounts: [Account!]!
    allDefecations: [Defecation!]!
    allDogs: [Dog!]!
    allWeights: [Weight!]!
  }

  type Account {
    id: ID!
    email: String!
    dogs: [Dog!]!
  }

  type Dog {
    id: ID!
    name: String!
    picture: String
    birthday: DateTime
    defecations: [Defecation!]!
    weights: [Weight!]!
  }

  type Defecation {
    id: ID!
    type: DefecationType!
    datetime: DateTime!
    comments: [Comment!]!
  }

  type Weight {
    id: ID!
    value: Float!
    datetime: DateTime!
    comments: [Comment!]!
  }

  type Comment {
    id: ID!
    text: String!
    datetime: DateTime!
  }

  interface MutationResponse {
    code: String!
    success: Boolean!
    message: String!
  }

  type DeletionMutationResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
  }

  type Mutation {
    register(email: String!, password: String!): Account!
    login(email: String!, password: String!): String!
    deleteAccount(account: ID!): DeletionMutationResponse!

    createDog(name: String!, birthday: String, picture: String): Dog!
    deleteDog(dog: ID!): DeletionMutationResponse!

    createDefecation(
      type: DefecationType!
      datetime: DateTime
      dog: ID!
    ): Defecation!
    deleteDefecation(defecation: ID!): DeletionMutationResponse!

    createWeight(value: Float!, datetime: DateTime, dog: ID!): Weight!
    deleteWeight(weight: ID!): DeletionMutationResponse!

    createComment(text: String!, type: String!): Comment!
    deleteComment(comment: ID!): DeletionMutationResponse!
  }
`;
