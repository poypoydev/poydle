import { Delete } from "lucide-react";
import type { ReactNode } from "react";
import { alphabet } from "~/utils/answers";
import wordExists from "word-exists";

const firstRow: string[] = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
const secondRow: string[] = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
const thirdRow: string[] = [
  "Enter",
  "Z",
  "X",
  "C",
  "V",
  "B",
  "N",
  "M",
  "Backspace",
];

const getBackgroundColor = (
  answer: string,
  letter: string,
  guesses: string[]
): string => {
  let returnVal = "bg-border";

  for (const guess of guesses) {
    // console.log(guess.includes(letter.toLowerCase()));
    if (guess.includes(letter.toLowerCase())) {
      returnVal = "bg-border bg-opacity-50";
    }
    const guessArr = guess.split("");

    if (
      guessArr.includes(letter.toLowerCase()) &&
      answer.includes(letter.toLowerCase())
    ) {
      /// letter
      const newArr = new Array<number>();
      guessArr.filter((val, index) => {
        if (val === letter.toLowerCase()) {
          newArr.push(index);
        }
      });

      const answerArr = answer.split("");
      for (const index of newArr) {
        if (answerArr[index] === letter.toLowerCase()) {
          return (returnVal = "bg-[#538D4E]");
        }
      }

      returnVal = "bg-[#B59F3B]";
    }
  }
  return returnVal;
};

const Keyboard = ({
  guesses,
  answer,
  setCurrentGuess,
  setAllGuesses,
}: {
  guesses: string[];
  answer: string;
  setCurrentGuess: React.Dispatch<React.SetStateAction<string>>;
  setAllGuesses: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const keyDown = (key: string) => {
    key;

    if (key === "Enter") {
      return setCurrentGuess((prevstring) => {
        if (prevstring.length !== 5) return prevstring;

        if (!wordExists(prevstring)) return prevstring;
        //api.dictionaryapi.dev/api/v2/entries/en/jawns

        setAllGuesses((prev) => {
          prev.length;
          if (prev.length === 6) return prev;
          return [...prev, prevstring];
        });
        return "";
      });
    }

    if (key === "Backspace") {
      return setCurrentGuess((prev) => prev.slice(0, -1));
    }

    if (alphabet.includes(key.toLowerCase())) {
      setCurrentGuess((prev) => {
        if (prev.length === 5) return prev;
        return prev + key.toLowerCase();
      });
    }
  };
  return (
    <div className="my-10 flex flex-col justify-center gap-2 md:my-8">
      <div className="flex justify-center gap-2">
        {firstRow.map((letter) => (
          <KeyboardButton
            onClick={() => keyDown(letter)}
            guesses={guesses}
            answer={answer}
            letter={letter}
          >
            {letter}
          </KeyboardButton>
        ))}
      </div>
      <div className="flex justify-center gap-2">
        {secondRow.map((letter) => (
          <KeyboardButton
            onClick={() => keyDown(letter)}
            guesses={guesses}
            answer={answer}
            letter={letter}
          >
            {letter}
          </KeyboardButton>
        ))}
      </div>
      <div className="flex justify-center gap-2">
        {thirdRow.map((letter) => {
          if (letter !== "Backspace")
            return (
              <KeyboardButton
                onClick={() => keyDown(letter)}
                guesses={guesses}
                answer={answer}
                letter={letter}
              >
                {letter.toUpperCase()}
              </KeyboardButton>
            );
          return (
            <KeyboardButton
              onClick={() => keyDown(letter)}
              guesses={guesses}
              answer={answer}
              letter={letter}
            >
              <Delete />
            </KeyboardButton>
          );
        })}
      </div>
    </div>
  );
};

export default Keyboard;

const KeyboardButton = ({
  children,
  answer,
  letter,
  guesses,
  onClick,
}: {
  children: ReactNode;
  answer: string;
  letter: string;
  guesses: string[];
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className={`rounded-md px-2  py-3 md:p-4 ${getBackgroundColor(
        answer,
        letter,
        guesses
      )}   font-semibold `}
    >
      {children}
    </button>
  );
};
