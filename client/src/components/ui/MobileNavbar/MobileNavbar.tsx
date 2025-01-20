import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { Dock, DockIcon } from "@/components/ui/dock";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { HomeIcon, HeadphonesIcon, Library, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { SignedIn } from "@clerk/clerk-react";

const MobileNavbar = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const baseNavigationItems = [
    { icon: HomeIcon, label: "Home", href: "/" },
    { icon: HeadphonesIcon, label: "Player", href: "/chat" },
    { icon: Library, label: "Library", href: "/playlist" },
  ];

  return (
    <motion.div
      className="md:hidden pointer-events-none fixed inset-x-0 bottom-[15%] z-30 mx-auto flex justify-center h-16"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        opacity: { duration: 0.5 },
      }}
    >
      {/* Central glow effect */}
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="absolute w-[150px] h-[150px] rounded-full bg-[#B5179E] blur-[80px] opacity-20 animate-pulse" />
        <div className="absolute w-[120px] h-[120px] rounded-full bg-[#7209B7] blur-[60px] opacity-20 animate-pulse-slow" />
      </div>

      <TooltipProvider>
        <Dock className=" z-50 pointer-events-auto flex items-center px-2 bg-black/40 backdrop-blur-xl rounded-full shadow-[0_8px_32px_rgba(181,23,158,0.2)] border border-[#B5179E]/20 relative overflow-hidden">
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#B5179E]/10 to-[#7209B7]/10 animate-gradient-slow" />

          {baseNavigationItems.map((item) => (
            <DockIcon key={item.href}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.div
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "size-12 relative overflow-hidden"
                    )}
                    onHoverStart={() => setHoveredItem(item.label)}
                    onHoverEnd={() => setHoveredItem(null)}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Link to={item.href}>
                      <item.icon
                        className={cn(
                          "size-5 transition-all duration-300",
                          hoveredItem === item.label
                            ? "text-[#B5179E] scale-110"
                            : "text-white/60"
                        )}
                      />
                    </Link>
                    <AnimatePresence>
                      {hoveredItem === item.label && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-[#B5179E]/20 to-[#7209B7]/20 rounded-full"
                          layoutId="hoverBackground"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </AnimatePresence>
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent
                  side="top"
                  className="bg-gradient-to-r from-[#B5179E] to-[#7209B7] text-white border-none px-3 py-2 shadow-lg"
                >
                  <p className="text-sm font-medium tracking-wide">
                    {item.label}
                  </p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}

          <SignedIn>
            <DockIcon>
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.div
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "size-12 relative overflow-hidden"
                    )}
                    onHoverStart={() => setHoveredItem("Messages")}
                    onHoverEnd={() => setHoveredItem(null)}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Link to="/messages">
                      {" "}
                      {/* Link to messages page */}
                      <MessageCircle
                        className={cn(
                          "size-5 transition-all duration-300",
                          hoveredItem === "Messages"
                            ? "text-[#B5179E] scale-110"
                            : "text-white/60"
                        )}
                      />
                    </Link>
                    <AnimatePresence>
                      {hoveredItem === "Messages" && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-[#B5179E]/20 to-[#7209B7]/20 rounded-full"
                          layoutId="hoverBackground"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </AnimatePresence>
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent
                  side="top"
                  className="bg-gradient-to-r from-[#B5179E] to-[#7209B7] text-white border-none px-3 py-2 shadow-lg"
                >
                  <p className="text-sm font-medium tracking-wide">Messages</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          </SignedIn>
        </Dock>
      </TooltipProvider>
    </motion.div>
  );
};

export default MobileNavbar;
