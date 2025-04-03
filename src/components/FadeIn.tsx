
import { motion } from "framer-motion";

const FadeIn = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
    className="h-full"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0, x: -20 }} 
    >
      {children}
    </motion.div>
  );
}

export default FadeIn;