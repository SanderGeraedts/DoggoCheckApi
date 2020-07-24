import { dog, allDogs, createDog, deleteDog } from "./DogResolvers";
import {
  account,
  allAccounts,
  login,
  register,
  deleteAccount
} from "./AccountResolver";
import {
  defecation,
  defecationsByDog,
  allDefecations,
  createDefecation
} from "./DefecationResolver";

export const resolvers = {
  // Retrieves data
  Query: {
    // Account Queries
    account,
    allAccounts,

    // Dog Queries
    dog,
    allDogs,

    // Defecation Queries
    defecation,
    defecationsByDog,
    allDefecations
  },

  // Creates/Updates data
  Mutation: {
    // Account Mutations
    login,
    register,
    deleteAccount,

    // Dog Mutations
    createDog,
    deleteDog,

    // Defecation Mutations
    createDefecation
  }
};
