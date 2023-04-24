import { useEffect, useState } from "react";
import Grid from "./components/Grid";
import { VALID_GUESSES, answers } from "./answers";

const alphabet = "abcdefghijklmnopqrstuvwxyz";

const App = () => {
  const [allGuesses, setAllGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [RIGHT_ANSWER] = useState<string>(
    answers[Math.floor(Math.random() * answers.length)]
  );

  const keyDown = ({ key }: { key: string }) => {
    console.log(key);

    if (key === "Enter") {
      return setCurrentGuess((prevstring) => {
        if (prevstring.length !== 5) return prevstring;
        console.log(VALID_GUESSES.includes(prevstring));
        if (!VALID_GUESSES.includes(prevstring)) return prevstring;
        //api.dictionaryapi.dev/api/v2/entries/en/jawns

        setAllGuesses((prev) => {
          console.log(prev.length);
          if (prev.length === 5) return prev;
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

  useEffect(() => {
    window.addEventListener("keydown", keyDown);

    return () => {
      window.removeEventListener("keydown", keyDown);
    };
  }, []);
  return (
    <>
      <div className="m-12">
        <Grid
          currentGuess={currentGuess}
          answer={RIGHT_ANSWER}
          guesses={allGuesses}
        />
      </div>

      <p>{RIGHT_ANSWER}</p>
      <p>{allGuesses.includes(RIGHT_ANSWER) && "You Won!"}</p>
    </>
  );
};

export default App;
