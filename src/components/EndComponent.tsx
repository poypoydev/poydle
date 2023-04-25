import { motion } from "framer-motion";
import { useEffect } from "react";

const EndComponent = ({
  answer,
  won,
  alreadyPlayed,
}: {
  answer?: string;
  won?: boolean;
  alreadyPlayed: boolean;
}) => {
  useEffect(() => {
    console.log(alreadyPlayed);
    !alreadyPlayed &&
      localStorage.setItem("last-played", new Date().toISOString());
  }, []);

  if (alreadyPlayed) {
    return (
      <motion.div
        initial={{ marginTop: 20, opacity: 0 }}
        animate={{ opacity: 1, marginTop: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="fixed left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] w-[80%] py-12 flex justify-center flex-wrap py-3  border-border border-2 bg-background"
      >
        <h1 className="text-4xl  text-center">You Already played today.</h1>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ marginTop: 20, opacity: 0 }}
      animate={{ opacity: 1, marginTop: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="fixed left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] w-[80%] flex justify-center flex-wrap py-3  border-border border-2 bg-background"
    >
      <h1 className="text-4xl font-bold text-center">
        You{" "}
        {won ? (
          <span className="text-green-500">won.</span>
        ) : (
          <span className="text-red-600">lost.</span>
        )}
      </h1>
      {!won ? (
        <div className="mt-3 text-xl">
          Correct answer was <span className="font-semibold">{answer}</span>
        </div>
      ) : (
        <div className="mt-3 text-center  px-5 text-xl">
          Thanks for playing. Come back tomorrow to play once more.{" "}
        </div>
      )}
    </motion.div>
  );
};
export default EndComponent;
