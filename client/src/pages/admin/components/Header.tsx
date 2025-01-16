import Logo from "@/components/logo/Logo";
import { UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Header = () => {
  return (
    <motion.div
      className="flex items-center justify-between p-4 rounded-xl bg-black/20 backdrop-blur-sm border border-[#7209B7]/10"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-6">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <Link to="/" className="block rounded-lg overflow-hidden">
            <Logo />
          </Link>
        </motion.div>

        <div>
          <motion.h1
            className="text-xl md:text-3xl font-bold bg-gradient-to-r from-[#7209B7] to-[#B5179E] bg-clip-text text-transparent"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Music Manager
          </motion.h1>
          <motion.p
            className="text-zinc-400 mt-1 relative"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Manage your music catalog
            <motion.span
              className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#7209B7] to-[#B5179E]"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
          </motion.p>
        </div>
      </div>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 17,
          delay: 0.4,
        }}
        whileHover={{ scale: 1.05 }}
      >
        <div className="p-1 rounded-full bg-gradient-to-r from-[#7209B7] to-[#B5179E]">
          <div className="bg-black rounded-full p-0.5">
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "h-8 w-8",
                },
              }}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Header;
