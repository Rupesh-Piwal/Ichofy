"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChatStore } from "@/stores/useChatStore";
import { useSignIn, useUser } from "@clerk/clerk-react";
import { Users, Headphones, Music2, Disc3, Radio } from "lucide-react";

const FriendsActivity = () => {
  const { users, fetchUsers, onlineUsers, userActivities } = useChatStore();
  const { user } = useUser();
  const [hoveredUser, setHoveredUser] = useState<string | null>(null);

  useEffect(() => {
    if (user) fetchUsers();
  }, [fetchUsers, user]);

  const { isLoaded } = useSignIn();

  if (!isLoaded) {
    return null;
  }

  return (
    <motion.div
      className="bg-gradient-to-br from-[#B5179E]/5 to-[#7209B7]/5 rounded-lg overflow-hidden backdrop-blur-lg border border-white/10 shadow-lg h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-4 flex justify-between items-center border-b border-white/10">
        <div className="flex items-center gap-2">
          <Users className="size-5 shrink-0 text-[#B5179E]/80" />
          <h2 className="font-semibold text-white text-lg">Friend Activity</h2>
        </div>
      </div>

      {!user ? (
        <LoginPrompt />
      ) : (
        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="p-4 space-y-4">
            <AnimatePresence>
              {users.map((user) => {
                const activity = userActivities.get(user.clerkId);
                const isPlaying = activity && activity !== "Idle";
                return (
                  <motion.div
                    key={user._id}
                    className="cursor-pointer p-3 rounded-md transition-all group relative overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    whileHover={{ scale: 1.02 }}
                    onHoverStart={() => setHoveredUser(user._id)}
                    onHoverEnd={() => setHoveredUser(null)}
                  >
                    <div className="flex items-start gap-3 relative z-10">
                      <div className="relative">
                        <Avatar className="size-12 border-[3px] border-[#B5179E]/80">
                          <AvatarImage
                            src={user.imageUrl}
                            alt={user.fullName}
                          />
                          <AvatarFallback>{user.fullName[0]}</AvatarFallback>
                        </Avatar>
                        <motion.div
                          className={`absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-[#7209B7] ${
                            onlineUsers.has(user.clerkId)
                              ? "bg-green-500"
                              : "bg-zinc-500"
                          }`}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                          }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm text-white group-hover:text-[#B5179E] transition-colors">
                            {user.fullName}
                          </span>
                          {isPlaying && (
                            <motion.div
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              transition={{
                                type: "spring",
                                stiffness: 260,
                                damping: 20,
                              }}
                            >
                              <Headphones className="size-4 text-[#B5179E] shrink-0" />
                            </motion.div>
                          )}
                        </div>
                        {isPlaying ? (
                          <div className="mt-1">
                            <div className="text-sm text-white font-medium truncate group-hover:text-[#B5179E] transition-colors">
                              {
                                activity!
                                  .replace("Playing ", "")
                                  .split(" by ")[0]
                              }
                            </div>
                            <div className="text-xs text-pink-300 truncate group-hover:text-[#7209B7] transition-colors">
                              {activity!.split(" by ")[1]}
                            </div>
                          </div>
                        ) : (
                          <div className="mt-1 text-xs text-pink-300 group-hover:text-[#7209B7] transition-colors">
                            Idle
                          </div>
                        )}
                      </div>
                    </div>
                    {hoveredUser === user._id && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-[#B5179E]/20 to-[#7209B7]/20 rounded-md"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      />
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </ScrollArea>
      )}
    </motion.div>
  );
};

const LoginPrompt = () => {
  const [isHovered, setIsHovered] = useState(false);
  const { signIn, isLoaded } = useSignIn();

  if (!isLoaded) {
    return null;
  }

  const signInWithGoogle = () => {
    signIn.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/sso-callback",
      redirectUrlComplete: "/auth-callback",
    });
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.15,
      },
    },
  };

  const iconContainerVariants = {
    hover: {
      scale: 1.05,
      rotate: [0, -10, 10, -5, 5, 0],
      transition: {
        duration: 0.8,
        ease: "easeInOut",
      },
    },
  };

  const getFloatingIconVariants = (i: number) => ({
    y: [-8, 8],
    x: [-5, 5],
    rotate: [-5, 5],
    transition: {
      duration: 3 + i * 0.5,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "reverse" as const,
      ease: "easeInOut",
    },
  });

  const glowVariants = {
    initial: {
      opacity: 0.5,
      scale: 1,
    },
    animate: {
      opacity: [0.5, 0.8, 0.5],
      scale: [1, 1.2, 1],
      transition: {
        duration: 2.5,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  };

  const getParticleVariants = (i: number) => ({
    y: [-20, 20],
    x: [-15, 15],
    opacity: [0.2, 0.8, 0.2],
    scale: [0.8, 1.2, 0.8],
    transition: {
      duration: 4 + i * 0.5,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "reverse" as const,
      ease: "easeInOut",
    },
  });

  const backgroundIcons = [Users, Music2, Headphones, Disc3, Radio, Music2];

  return (
    <div className="h-[calc(100vh-200px)] bg-gradient-to-b from-[#7209B7]/10 via-zinc-900 to-[#B5179E]/20">
      <motion.div
        className="relative h-full flex flex-col items-center justify-center p-6 text-center overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Particle effects */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              custom={i}
              variants={{ animate: getParticleVariants(i) }}
              animate="animate"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            >
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#B5179E] to-[#7209B7] opacity-20" />
            </motion.div>
          ))}
        </div>

        {/* Floating background icons with improved positioning */}
        <div className="absolute inset-0 overflow-hidden">
          {backgroundIcons.map((Icon, i) => (
            <motion.div
              key={i}
              className="absolute"
              custom={i}
              variants={{ animate: getFloatingIconVariants(i) }}
              animate="animate"
              style={{
                left: `${i * 20 + Math.random() * 20}%`,
                top: `${i * 15 + Math.random() * 15}%`,
              }}
            >
              <Icon className="size-12 text-[#B5179E] opacity-20" />
            </motion.div>
          ))}
        </div>

        {/* Main content container */}
        <motion.div
          className="relative z-10 backdrop-blur-lg bg-zinc-900/50 p-8 rounded-2xl border border-[#B5179E]/30 shadow-xl"
          whileHover={{
            scale: 1.02,
            transition: { duration: 0.3 },
          }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          <motion.div
            className="relative cursor-pointer mb-6"
            whileHover="hover"
            variants={iconContainerVariants}
          >
            <motion.div
              className="absolute -inset-2 bg-gradient-to-r from-[#B5179E]/50 via-[#8012A9] to-[#7209B7]/50 rounded-full blur-xl"
              variants={glowVariants}
              initial="initial"
              animate="animate"
              style={{
                mixBlendMode: "color-dodge",
              }}
              aria-hidden="true"
            />
            <motion.div
              className="relative bg-zinc-900 rounded-full p-6 shadow-2xl items-center flex justify-center"
              whileTap={{ scale: 0.95 }}
            >
              <Headphones className="size-12 text-[#B5179E]" />
            </motion.div>
          </motion.div>

          <motion.div
            className="space-y-4 max-w-[300px]"
            variants={containerVariants}
          >
            <motion.h3
              className="text-2xl font-bold bg-gradient-to-r from-[#B5179E] to-[#7209B7] bg-clip-text text-transparent"
              variants={{
                hidden: { opacity: 0, y: -20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              See What Friends Are Playing
            </motion.h3>
            <motion.p
              className="text-base text-zinc-300 leading-relaxed"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              Login to discover what music your friends are enjoying right now
            </motion.p>

            <AnimatePresence>
              {isHovered && (
                <motion.button
                  onClick={signInWithGoogle}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="mt-6 px-6 py-3 bg-gradient-to-r from-[#B5179E] to-[#7209B7] rounded-full font-semibold text-white shadow-lg hover:shadow-xl transition-shadow duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Connect Now
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FriendsActivity;
