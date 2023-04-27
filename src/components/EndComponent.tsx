import { motion } from "framer-motion";
import { useEffect } from "react";

const EndComponent = ({
  answer,
  won,
  alreadyPlayed,
  setCanPlay,
}: {
  answer?: string;
  won?: boolean;
  alreadyPlayed: boolean;
  setCanPlay: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  useEffect(() => {
    // if (!alreadyPlayed) {
    //   localStorage.setItem("last-played", new Date().toISOString());
    // }
    localStorage.setItem("current-guesses", JSON.stringify([]));
    console.log(won, alreadyPlayed);
  }, []);

  if (alreadyPlayed) {
    return (
      <motion.div
        initial={{ marginTop: 20, opacity: 0 }}
        animate={{ opacity: 1, marginTop: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="fixed left-[50%] top-[50%] flex w-[80%] translate-x-[-50%] translate-y-[-50%] flex-wrap  justify-center border-2 border-border bg-background  py-3 md:w-[30%] md:py-12"
      >
        <h1 className="mx-5 text-center text-4xl">You already played today.</h1>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ marginTop: 20, opacity: 0 }}
      animate={{ opacity: 1, marginTop: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="fixed left-[50%] top-[50%] flex w-[80%] translate-x-[-50%] translate-y-[-50%] flex-wrap justify-center border-2 border-border bg-background  py-3 md:w-[30%] md:py-12"
    >
      <h1 className="text-center text-4xl font-bold">
        You{" "}
        {won ? (
          <span className="text-green-500">won.</span>
        ) : (
          <span className="text-red-600">lost.</span>
        )}
      </h1>
      {!won ? (
        <div className="mt-3 text-center text-xl">
          Correct answer was <span className="font-semibold">{answer}</span>.{" "}
          Come back tomorrow to try your luck again.
        </div>
      ) : (
        <div className="mt-3 px-5  text-center text-xl">
          Thanks for playing. Come back tomorrow to play once more.{" "}
        </div>
      )}
    </motion.div>
  );
};
export default EndComponent;
