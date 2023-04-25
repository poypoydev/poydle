import { mapThroughGuesses } from "../helpers";

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
    <div className="flex gap-5 py-2 my-8   items-center justify-center  flex-wrap ">
      {mapThroughGuesses(guesses, currentGuess, answer)}
      {/* <GridRow empty={false} current value={currentGuess} /> */}
    </div>
  );
};

export default Grid;
