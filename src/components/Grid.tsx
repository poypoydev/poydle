import { mapThroughGuesses } from "./helpers/helpers";

const Grid = ({
  guesses,
  currentGuess,
  answer,
}: {
  guesses: string[];
  currentGuess: string;
  answer: string;
}) => {
  return (
    <div className="my-8 flex flex-wrap items-center   justify-center gap-5  py-2 ">
      {mapThroughGuesses(guesses, currentGuess, answer)}
      {/* <GridRow empty={false} current value={currentGuess} /> */}
    </div>
  );
};

export default Grid;
