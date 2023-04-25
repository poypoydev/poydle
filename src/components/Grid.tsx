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

const GridRow = ({
  empty,
  value,
  current,
  answer,
}: {
  empty: boolean;
  value?: string;
  current?: boolean;
  answer: string;
}) => {
  if (empty) {
    return (
      <div className="w-[85%] bg-ble  h-10  flex justify-center gap-2 my-1  ">
        <div className="border-border border-2 rounded-sm w-52    h-52 "></div>
        <div className="border-border border-2 rounded-sm w-52   h-52"></div>
        <div className="border-border border-2 rounded-sm w-52   h-52"></div>
        <div className="border-border border-2 rounded-sm w-52     h-52"></div>
        <div className="border-border border-2 rounded-sm w-52    h-52"></div>
      </div>
    );
  }

  // non empty
  const newArr = new Array(...(value as string));
  const needed = 5 - newArr.length;
  for (let i = 0; i < needed; i++) {
    newArr.push("");
  }

  return (
    <div className="w-[85%]   h-10  flex justify-center gap-2 my-1   ">
      {newArr.map((val, index) => (
        <div
          className={` ${
            current
              ? "border-border border-2"
              : getLevelOfCorrection(index, answer, val)
          }  flex items-center justify-center   rounded-sm w-52     h-52 `}
        >
          <h1 className="font-bold text-2xl">{val.toUpperCase()}</h1>
        </div>
      ))}
    </div>
  );
};

const getLevelOfCorrection = (
  index: number,
  RIGHT_ANSWER: string,
  letter: string
): string => {
  if (letter.length === 0) return " border-border border-2";
  if (RIGHT_ANSWER.split("")[index] === letter) return "bg-[#538D4E] ";
  if (RIGHT_ANSWER.includes(letter)) return "bg-[#B59F3B]";
  return "bg-border";
};

const mapThroughGuesses = (
  guesses: string[],
  current: string,
  answer: string
) => {
  const returnValue = new Array(...guesses);
  const needed = 6 - returnValue.length;
  for (let i = 0; i < needed; i++) {
    returnValue.push("");
  }

  console.log(guesses.length, guesses, current, "guesses");
  returnValue[guesses.length] = current;
  return returnValue.map((val, index) => {
    // if (returnValue[guesses.length])
    //   return <GridRow empty={false} current value={current} />
    console.log(val, index, guesses.includes(answer));
    if (index === 6) return;
    if (index === guesses.length && !guesses.includes(answer))
      return (
        <GridRow
          key={index}
          answer={answer}
          empty={false}
          current
          value={current}
        />
      );
    if (val.length === 0) {
      console.log("returned this");
      return <GridRow key={index} answer={answer} empty />;
    }

    return <GridRow key={index} answer={answer} empty={false} value={val} />;
  });
};
