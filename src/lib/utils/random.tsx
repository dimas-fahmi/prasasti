import {
  uniqueNamesGenerator,
  adjectives,
  animals,
  Config,
  starWars,
} from "unique-names-generator";

export const getRandomPrasastiName = () => {
  const config: Config = {
    dictionaries: [adjectives, animals],
    separator: " ",
    style: "capital",
  };

  return uniqueNamesGenerator(config);
};

export const getRandomOwnerName = () => {
  const config: Config = {
    dictionaries: [starWars],
    separator: " ",
    style: "capital",
  };

  return uniqueNamesGenerator(config);
};
