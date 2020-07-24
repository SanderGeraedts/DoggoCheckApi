import { Dog } from "../models/Dog";

export const allDogs = () => Dog.find();

export const createDog = async (_, { name, birthday, picture }) => {
  const dog = new Dog({ name, birthday, picture });
  try {
    const saved = await dog.save();
    return saved;
  } catch (e) {
    console.log(e);

    throw new Error("Error in the creation of a Dog", e);
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
