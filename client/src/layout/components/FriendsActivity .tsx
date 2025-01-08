import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChatStore } from "@/stores/useChatStore";
import { useUser } from "@clerk/clerk-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HeadphonesIcon,
  Users2Icon,
  Disc3Icon,
  Radio,
  Music2Icon,
  Users,
  Music,
} from "lucide-react";
import { useEffect, useState } from "react";

const FriendsActivity = () => {
  const { users, fetchUsers } = useChatStore();
  const { user } = useUser();
  const isPlaying = false;
  useEffect(() => {
    if (user) fetchUsers();
  }, [fetchUsers, user]);
  return (
    <div>
      <div className="p-4 flex justify-between items-center border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <Users className="size-5 shrink-0" />
          <h2 className="font-semibold">What they're listening to</h2>
        </div>
      </div>

      {!user && <LoginPrompt />}

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {users.map((user) => {

            return (
              <div
                key={user._id}
                className="cursor-pointer hover:bg-zinc-800/50 p-3 rounded-md transition-colors group"
              >
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <Avatar className="size-10 border border-zinc-800">
                      <AvatarImage src={user.imageUrl} alt={user.fullName} />
                      <AvatarFallback>{user.fullName[0]}</AvatarFallback>
                    </Avatar>
                    <div
                      
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm text-white">
                        {user.fullName}
                      </span>
                      {isPlaying && (
                        <Music className="size-3.5 text-emerald-400 shrink-0" />
                      )}
                    </div>

                    {isPlaying ? (
                      <div className="mt-1">
                        <div className="mt-1 text-sm text-white font-medium truncate">
                          {/* {activity.replace("Playing ", "").split(" by ")[0]} */}
                        </div>
                        <div className="text-xs text-zinc-400 truncate">
                          {/* {activity.split(" by ")[1]} */}
                        </div>
                      </div>
                    ) : (
                      <div className="mt-1 text-xs text-zinc-400">Idle</div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
};

export default FriendsActivity;

const LoginPrompt = () => {
  const [isHovered, setIsHovered] = useState(false);

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

  const floatingIcons = {
    animate: (i: number) => ({
      y: [-8, 8],
      x: [-5, 5],
      rotate: [-5, 5],
      transition: {
        duration: 3 + i * 0.5,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    }),
  };

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
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const particleVariants = {
    animate: (i: number) => ({
      y: [-20, 20],
      x: [-15, 15],
      opacity: [0.2, 0.8, 0.2],
      scale: [0.8, 1.2, 0.8],
      transition: {
        duration: 4 + i * 0.5,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    }),
  };

  const backgroundIcons = [
    Users2Icon,
    Music2Icon,
    HeadphonesIcon,
    Disc3Icon,
    Radio,
    Music2Icon,
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#7209B7]/10 via-zinc-900 to-[#B5179E]/20">
      <motion.div
        className="relative h-screen flex flex-col items-center justify-center p-6 text-center overflow-hidden"
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
              variants={particleVariants}
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
              variants={floatingIcons}
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
              <HeadphonesIcon className="size-12 text-[#B5179E]" />
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
