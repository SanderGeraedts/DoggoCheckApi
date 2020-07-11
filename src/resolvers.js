import { Dog } from "./models/Dog";
export const resolvers = {
  // Retrieves data
  Query: {
    dogs: () => Dog.find()
  },

  // Creates/Updates data
  Mutation: {
    createDog: (_, { name, birthday, picture }) => {
      const puppy = new Dog({ name, birthday, picture });
      return puppy.save();
    }
  }
};
