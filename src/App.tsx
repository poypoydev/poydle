import { useEffect, useState } from "react";
import Grid from "./components/Grid";
import { VALID_GUESSES, answers } from "./answers";
import Header from "./components/Header";
import EndComponent from "./components/EndComponent";

const alphabet = "abcdefghijklmnopqrstuvwxyz";

const App = () => {
  const [allGuesses, setAllGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [canPlay, setCanPlay] = useState<boolean>(true);
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

  useEffect(() => {
    window.addEventListener("keydown", keyDown);

    const alreadyPlayed = localStorage.getItem("last-played");
    if (alreadyPlayed) {
      const currDate = new Date();
      const parsedData = Date.parse(alreadyPlayed as string);
      var Difference_In_Time = currDate.getTime() - parsedData;

      // To calculate the no. of days between two dates
      var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
      console.log(Difference_In_Days);
      if (Difference_In_Days <= 1) setCanPlay(false);
    }

    return () => {
      window.removeEventListener("keydown", keyDown);
    };
  }, []);
  return (
    <>
      <Header />
      <Grid
        currentGuess={currentGuess}
        answer={RIGHT_ANSWER}
        guesses={allGuesses}
      />

      {!canPlay ? (
        <EndComponent alreadyPlayed />
      ) : (
        (allGuesses.includes(RIGHT_ANSWER) || allGuesses.length === 6) && (
          <EndComponent
            alreadyPlayed={false}
            answer={RIGHT_ANSWER}
            won={allGuesses.includes(RIGHT_ANSWER)}
          />
        )
      )}
    </>
  );
};

export default App;
