import { useState } from "react";
import { Home, Music2, Disc3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function NotFoundPage() {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#B5179E]/20 to-[#7209B7]/20 flex items-center justify-center p-4">
      <motion.div
        className="text-center space-y-8 px-4 py-8 bg-zinc-900/60 backdrop-blur-lg rounded-2xl border border-white/10 shadow-2xl max-w-md w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="relative"
          variants={itemVariants}
          whileHover={{ scale: 1.1, rotate: [0, -10, 10, -5, 5, 0] }}
          transition={{ duration: 0.5 }}
        >
          <Music2 className="h-24 w-24 text-[#B5179E] mx-auto" />
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <Disc3 className="h-32 w-32 text-[#7209B7] opacity-20" />
          </motion.div>
        </motion.div>

        <motion.div className="space-y-4" variants={itemVariants}>
          <h1 className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#B5179E] to-[#7209B7]">
            404
          </h1>
          <h2 className="text-2xl font-semibold text-white">Page not found</h2>
          <p className="text-pink-200 max-w-md mx-auto">
            Looks like this track got lost in the shuffle. Let's get you back to
            the music.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8"
          variants={itemVariants}
        >
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className="bg-[#B5179E]/10 hover:bg-[#B5179E]/20 text-white border-[#B5179E]/30 w-full sm:w-auto transition-all duration-300 ease-in-out"
          >
            Go Back
          </Button>
          <Button
            onClick={() => navigate("/")}
            className="bg-gradient-to-r from-[#B5179E] to-[#7209B7] hover:from-[#B5179E]/80 hover:to-[#7209B7]/80 text-white w-full sm:w-auto transition-all duration-300 ease-in-out"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-2"
                >
                  <Home className="h-4 w-4" />
                </motion.div>
              )}
            </AnimatePresence>
            <span
              className={`${
                isHovered ? "ml-6" : ""
              } transition-all duration-200`}
            >
              Back to Home
            </span>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
