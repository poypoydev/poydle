const countLetters = (answer: string) => {
  const letterMap = new Map<string, number>();
  answer.split("").forEach((val) => {
    letterMap.set(val, (letterMap.get(val) || 0) + 1);
  });
  return letterMap;
};

export const getLevelOfCorrection = (
  index: number,
  RIGHT_ANSWER: string,
  letter: string,
  indexMap: Map<string, number[]>,
  letterMap: Map<string, number>,
  currentGuess: string[]
): string => {
  if (letter.length === 0) return " border-border border-2";

  if (RIGHT_ANSWER.split("")[index] === letter) {
    indexMap.set(letter, [...(indexMap.get(letter) || []), index]);
    return "bg-[#538D4E] ";
  }
  if (RIGHT_ANSWER.includes(letter)) {
    const numberOfLetters = letterMap.get(letter) || 0;
    const lengthOfIndexArray = indexMap.get(letter)?.length || 0;
    if (lengthOfIndexArray < numberOfLetters) {
      indexMap.set(letter, [...(indexMap.get(letter) || []), index]);
      const indexesInPos = new Array<number>();
      // should not reutrn yellow when the green is in position
      for (const newIndex of indexMap.get(letter) || []) {
        if (currentGuess[newIndex] === letter) indexesInPos.push(newIndex);
      }

      const length = indexesInPos.length;

      if (length <= numberOfLetters) return "bg-[#B59F3B]";
    }
    return "bg-border";
    //   letterMap.set(val, (letterMap.get(val) || 0) + 1);
    // yellow
  }

  return "bg-border";
};

export const mapThroughGuesses = (
  guesses: string[],
  current: string,
  answer: string
) => {
  const returnValue = new Array(...guesses);
  const needed = 6 - returnValue.length;
  for (let i = 0; i < needed; i++) {
    returnValue.push("");
  }

  guesses.length, guesses, current, "guesses";
  returnValue[guesses.length] = current;
  return returnValue.map((val, index) => {
    // if (returnValue[guesses.length])
    //   return <GridRow empty={false} current value={current} />

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
      ("returned this");
      return <GridRow key={index} answer={answer} empty />;
    }

    return <GridRow key={index} answer={answer} empty={false} value={val} />;
  });
};

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
  const indexMap = new Map<string, number[]>();
  const letterMap = countLetters(answer);
  return (
    <div className="w-[85%]   h-10  flex justify-center gap-2 my-1   ">
      {newArr.map((val, index) => {
        return (
          <div
            className={` ${
              current
                ? "border-border border-2"
                : getLevelOfCorrection(
                    index,
                    answer,
                    val,
                    indexMap,
                    letterMap,
                    newArr
                  )
            }  flex items-center justify-center   rounded-sm w-52     h-52 `}
          >
            <h1 className="font-bold text-2xl">{val.toUpperCase()}</h1>
          </div>
        );
      })}
    </div>
  );
};
