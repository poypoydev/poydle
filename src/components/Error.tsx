import { CircleSlash } from "lucide-react";

import { motion } from "framer-motion";

const Error = ({ show }: { show: boolean }) => {
  return (
    <motion.div
      animate={{ y: show ? 0 : "300%", x: "-50%", opacity: show ? 1 : 0 }}
      transition={{ duration: 0.4 }}
      className="fixed bottom-8 left-[50%] mb-8 inline-flex translate-x-[-50%] items-center rounded-md border-2 border-border bg-background px-3 py-1 "
    >
      <CircleSlash />
      <p className="ml-3 whitespace-nowrap">Not an English word.</p>
    </motion.div>
  );
};

export default Error;
