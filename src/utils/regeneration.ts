import seedrandom from "seedrandom";
import { answers } from "./answers";

// thank you https://github.com/petergeorgas/Wordle-API

let cached_date: Date = new Date();
let cached_idx = -1;

const getDayDiff = (date: Date): number => {
  return Math.floor(
    (date.valueOf() - new Date(2000, 0, 0).valueOf()) / (1000 * 60 * 60 * 24)
  );
};

const isSameDate = (date: Date): boolean => {
  return (
    date.getDay() === cached_date.getDay() &&
    date.getMonth() === cached_date.getMonth() &&
    date.getFullYear() === cached_date.getFullYear()
  );
};

const isCharInWord = (guess: string, ans: string): boolean => {
  for (let i = 0; i < ans.length; i++) {
    if (guess === ans[i]) {
      return true;
    }
  }
  return false;
};

/**
 * Based on the current day of the year, returns a pseudorandom word from our word bank.
 *
 * @returns The "word of the day" -- which is a pseudorandomly selected word.
 */
const getWordOfTheDay = (): string => {
  const date = new Date();

  if (isSameDate(date) && cached_idx !== -1) {
    return answers[cached_idx] as string;
  }

  cached_date = date; // Cache the date
  const rng = seedrandom(getDayDiff(date).toString());
  const idx: number = Math.floor(rng() * answers.length);
  cached_idx = idx; // Cache the index.
  return answers[idx] as string;
};
export { getWordOfTheDay };
