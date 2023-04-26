import dict from "../dictionary.json";

type Dictionary = {
  [key: string]: string[];
};

const dictionary: Dictionary = dict;

export const wordExists = (text: string): boolean => {
  const cleaned = text.trim().toLowerCase();

  // return !!(cleaned.length > 1
  //   ? dictionary[cleaned.slice(0, 2)] &&
  //     dictionary &&
  //     dictionary[cleaned.slice(0, 2)].includes(cleaned)
  //   : cleaned === "a" || cleaned === "i");
  const dictObject: string[] | undefined = dictionary[cleaned.slice(0, 2)];
  if (!dictObject) return false;

  if (dictObject.includes(cleaned)) return true;

  return false;
};
