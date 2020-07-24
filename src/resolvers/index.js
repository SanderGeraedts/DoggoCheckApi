import { allDogs, createDog, deleteDog } from "./DogResolvers";
import { allAccounts, login, register, deleteAccount } from "./AccountResolver";
export const resolvers = {
  // Retrieves data
  Query: {
    allDogs,
    allAccounts
  },

  // Creates/Updates data
  Mutation: {
    createDog,
    deleteDog,
    login,
    register,
    deleteAccount
  }
};
