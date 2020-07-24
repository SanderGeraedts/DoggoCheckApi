import { Dog } from "../models/Dog";
import { Account } from "../models/Account";

export const dog = (_, { id }) => Dog.findById(id);
export const allDogs = () => Dog.find();

export const createDog = async (_, { name, birthday, picture }, { user }) => {
  const dog = new Dog({ name, birthday, picture });

  if (user) {
    try {
      const saved = await dog.save();

      const owner = await Account.findById(user.id);

      try {
        owner.dogs.push(saved);
        owner.save();
      } catch (e) {
        console.log(e);
        throw new Error("Owner not Found");
      }

      return saved;
    } catch (e) {
      console.log(e);

      throw new Error("Error in the creation of a Dog", e);
    }
  } else {
    throw new Error("User not loggedIn");
  }
};

export const deleteDog = async (_, { dog }) => {
  const result = await Dog.findByIdAndRemove(dog);

  if (result !== null) {
    return {
      code: 204,
      success: true,
      message: "Dog successfully deleted"
    };
  } else {
    return {
      code: 500,
      success: false,
      message: "An error has occured in the deletion of the Dog."
    };
  }
};
