import { useEffect, useState } from "react";
import Grid from "./components/Grid";
import { VALID_GUESSES, alphabet, answers } from "./answers";
import Header from "./components/Header";
import EndComponent from "./components/EndComponent";
import Keyboard from "./components/Keyboard";

const App = () => {
  const [allGuesses, setAllGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [canPlay, setCanPlay] = useState<boolean>(true);
  const [RIGHT_ANSWER] = useState<string>(
    answers[Math.floor(Math.random() * answers.length)]
  );

  const keyDown = (key: string) => {
    if (key === "Enter") {
      return setCurrentGuess((prevstring) => {
        if (prevstring.length !== 5) return prevstring;
        VALID_GUESSES.includes(prevstring);
        if (!VALID_GUESSES.includes(prevstring)) return prevstring;
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

  useEffect(() => {
    window.addEventListener("keydown", (e) => keyDown(e.key));

    const alreadyPlayed = localStorage.getItem("last-played");
    if (alreadyPlayed) {
      const currDate = new Date();
      const parsedData = Date.parse(alreadyPlayed as string);
      var Difference_In_Time = currDate.getTime() - parsedData;

      // To calculate the no. of days between two dates
      var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
      Difference_In_Days;
      if (Difference_In_Days <= 1) setCanPlay(false);
    }

    return () => {
      window.removeEventListener("keydown", (e) => keyDown(e.key));
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

      <Keyboard
        setAllGuesses={setAllGuesses}
        setCurrentGuess={setCurrentGuess}
        guesses={allGuesses}
        answer={RIGHT_ANSWER}
      />
      {/* <p>{RIGHT_ANSWER}</p> */}
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
