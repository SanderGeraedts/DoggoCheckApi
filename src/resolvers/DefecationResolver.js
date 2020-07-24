import { Defecation } from "../models/Defecation";
import { Dog } from "../models/Dog";

export const defecation = (_, { id }) => Defecation.findById(id);
export const defecationsByDog = async (_, { dog }) => {
  const { defecations } = await Dog.findById(dog).populate("defecations");
  return defecations;
};
export const allDefecations = () => Defecation.find();

export const createDefecation = async (_, { type, datetime, dog }) => {
  const time = datetime ? datetime : Date.now();

  const _dog = await Dog.findById(dog);
  const defecation = await new Defecation({ type, datetime: time }).save();

  _dog.defecations.push(defecation);
  _dog.save();

  return defecation;
};
