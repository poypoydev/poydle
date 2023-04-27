import { useEffect, useState } from "react";

import type { NextPage } from "next";
import { alphabet } from "~/utils/answers";
import Header from "~/components/Header";
import Grid from "~/components/Grid";
import Keyboard from "~/components/Keyboard";
import EndComponent from "~/components/EndComponent";

import { api } from "~/utils/api";
import { wordExists } from "~/utils/wordexists";
import Error from "~/components/Error";
import { parseLocalStorage } from "~/utils/parseGuesses";
import Loader from "~/components/Loader";

const Home: NextPage = () => {
  const [allGuesses, setAllGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [canPlay, setCanPlay] = useState<boolean>(true);
  const [error, displayError] = useState<boolean>(false);
  const { data, status } = api.word.hello.useQuery();

  const keyDown = (key: string) => {
    if (!canPlay) return;
    if (key === "Enter") {
      return setCurrentGuess((prevstring) => {
        if (prevstring.length !== 5) return prevstring;

        if (!wordExists(prevstring)) {
          displayError(true);
          setTimeout(() => displayError(false), 2500);
          return prevstring;
        }
        //api.dictionaryapi.dev/api/v2/entries/en/jawns

        setAllGuesses((prev) => {
          prev.length;
          if (prev.length === 6) return prev;
          const oldLocalStorage = localStorage.getItem("current-guesses");
          if (!oldLocalStorage) {
            localStorage.setItem(
              "current-guesses",
              JSON.stringify([prevstring])
            );
          } else {
            localStorage.setItem(
              "current-guesses",
              JSON.stringify([...prev, prevstring])
            );
          }

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
    console.log(status);
    // if (status !== "success") return;
    const alreadyPlayed = localStorage.getItem("last-played");
    setAllGuesses(parseLocalStorage("current-guesses"));
    if (alreadyPlayed) {
      setCanPlay(true);
      const currDate = new Date();
      const parsedData = Date.parse(alreadyPlayed);
      const Difference_In_Time = currDate.getTime() - parsedData;

      // To calculate the no. of days between two dates
      const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
      Difference_In_Days;
      if (Difference_In_Days <= 1) setCanPlay(false);
    } else {
      if (canPlay) {
        window.addEventListener("keydown", (e) => keyDown(e.key));
      }
    }

    return () => {
      window.removeEventListener("keydown", (e) => keyDown(e.key));
    };
  }, []);

  useEffect(() => {
    if (allGuesses.includes(data?.word as string) || allGuesses.length === 6) {
      localStorage.setItem("last-played", new Date().toString());
    }
  }, [allGuesses]);

  if (status !== "success") {
    console.log(status);
    return <Loader />;
  }

  return (
    <>
      <Header />
      <Grid
        currentGuess={currentGuess}
        answer={data?.word || "hello"}
        guesses={allGuesses}
      />

      <Keyboard
        setAllGuesses={setAllGuesses}
        setCurrentGuess={setCurrentGuess}
        guesses={allGuesses}
        answer={data?.word || "hello"}
        displayError={displayError}
        canPlay={canPlay}
      />

      {/* <p>{RIGHT_ANSWER}</p> */}
      <Error show={error} />
      {!canPlay && !allGuesses.includes(data?.word) && (
        <EndComponent setCanPlay={setCanPlay} alreadyPlayed />
      )}
      {(allGuesses.includes(data?.word) || allGuesses.length === 6) && (
        <EndComponent
          setCanPlay={setCanPlay}
          alreadyPlayed={false}
          answer={data?.word}
          won={allGuesses.includes(data?.word)}
        />
      )}
    </>
  );
};

export default Home;
