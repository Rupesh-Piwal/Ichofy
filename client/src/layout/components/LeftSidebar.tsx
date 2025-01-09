import PlaylistSkeleton from "@/components/skeletons/PlaylistSkeleton ";
import { buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useMusicStore } from "@/stores/useMusicStore";
import { SignedIn, useSignIn } from "@clerk/clerk-react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  HeadphonesIcon,
  HomeIcon,
  Library,
  MessageCircle,
  X,
  Users2Icon,
  Disc3Icon,
  Radio,
  Music2Icon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Album } from "@/types";

const LoginModal = ({ isOpen, onClose }: any) => {
  const backgroundIcons = [
    Users2Icon,
    Music2Icon,
    HeadphonesIcon,
    Disc3Icon,
    Radio,
  ];

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

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-lg mx-4"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button
                className="absolute right-4 top-4 text-white/80 hover:text-white z-10"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
              >
                <X className="size-6" />
              </motion.button>

              <motion.div
                className="relative backdrop-blur-lg bg-zinc-900/90 p-8 rounded-2xl border border-[#B5179E]/30 shadow-xl"
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.3 },
                }}
              >
                {backgroundIcons.map((Icon, i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    animate={{
                      y: [-8, 8],
                      x: [-5, 5],
                      rotate: [-5, 5],
                    }}
                    transition={{
                      duration: 3 + i * 0.5,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                    style={{
                      left: `${i * 20 + Math.random() * 20}%`,
                      top: `${i * 15 + Math.random() * 15}%`,
                    }}
                  >
                    <Icon className="size-12 text-[#B5179E] opacity-20" />
                  </motion.div>
                ))}

                <div className="relative z-10">
                  <motion.div
                    className="relative cursor-pointer mb-6"
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.div
                      className="absolute -inset-2 bg-gradient-to-r from-[#B5179E]/50 via-[#8012A9] to-[#7209B7]/50 rounded-full blur-xl"
                      animate={{
                        opacity: [0.5, 0.8, 0.5],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                      }}
                    />
                    <motion.div className="relative bg-zinc-900 rounded-full p-6 shadow-2xl items-center flex justify-center">
                      <HeadphonesIcon className="size-12 text-[#B5179E]" />
                    </motion.div>
                  </motion.div>

                  <div className="space-y-4 max-w-[300px] mx-auto text-center">
                    <motion.h3
                      className="text-2xl font-bold bg-gradient-to-r from-[#B5179E] to-[#7209B7] bg-clip-text text-transparent"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      See What Friends Are Playing
                    </motion.h3>
                    <motion.p
                      className="text-base text-zinc-300 leading-relaxed"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      Login to discover what music your friends are enjoying
                      right now
                    </motion.p>

                    <AnimatePresence>
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
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const GlowingHeadphones = ({ onClick }: any) => {
  const glowVariants = {
    initial: {
      opacity: 0.5,
      scale: 1,
    },
    animate: {
      opacity: [0.5, 0.8, 0.5],
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const iconVariants = {
    initial: {
      scale: 1,
    },
    animate: {
      scale: [1, 1.02, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  return (
    <div className="md:hidden relative cursor-pointer" onClick={onClick}>
      <motion.div
        className="absolute inset-0 rounded-full bg-[#B5179E]/20 blur-xl"
        variants={glowVariants}
        initial="initial"
        animate="animate"
      />

      <motion.div
        className="absolute inset-0 rounded-full bg-[#B5179E]/30 blur-md"
        variants={glowVariants}
        initial="initial"
        animate="animate"
      />

      <motion.div
        className="relative bg-zinc-900 rounded-full p-2 shadow-2xl items-center flex justify-center"
        variants={iconVariants}
        initial="initial"
        animate="animate"
        whileTap="tap"
        whileHover={{ scale: 1.05 }}
      >
        <HeadphonesIcon className="size-7 text-[#B5179E]" />
      </motion.div>
    </div>
  );
};

const LeftSidebar = () => {
  const { albums, fetchAlbums, isLoading } = useMusicStore();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchAlbums();
  }, [fetchAlbums]);

  return (
    <>
      <div className="h-full flex flex-col gap-2">
        <div className="rounded-lg bg-[#111111] p-4">
          <div className="space-y-2">
            <Link
              to={"/"}
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  className:
                    "w-full justify-start text-[#B8B8B8] hover:bg-gradient-to-r from-[#B5179E]/50 to-[#7209B7]/20 hover:text-[#ffffff]",
                })
              )}
            >
              <HomeIcon className="mr-2 size-5" />
              <span className="hidden md:inline">Home</span>
            </Link>
            <SignedIn>
              <Link
                to={"/chat"}
                className={cn(
                  buttonVariants({
                    variant: "ghost",
                    className:
                      "w-full justify-start text-[#B8B8B8] hover:bg-gradient-to-r from-[#B5179E]/50 to-[#7209B7]/20 hover:text-[#ffffff]",
                  })
                )}
              >
                <MessageCircle className="mr-2 size-5" />
                <span className="hidden md:inline">Messages</span>
              </Link>
            </SignedIn>

            <GlowingHeadphones onClick={() => setIsModalOpen(true)} />
          </div>
        </div>

        {/* Rest of your sidebar content */}
        <div className="flex-1 rounded-lg bg-[#111111] p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center text-white px-2">
              <Library className="size-5 mr-2" />
              <span className="hidden md:inline">Playlists</span>
            </div>
          </div>

          <ScrollArea className="h-[calc(100vh-300px)]">
            <div className="space-y-2">
              {isLoading ? (
                <PlaylistSkeleton />
              ) : (
                albums.map((album: Album) => {
                  const isCurrentAlbum =
                    location.pathname === `/albums/${album._id}`;
                  return (
                    <motion.div
                      key={album._id}
                      whileHover={{
                        scale: 1.02,
                        transition: {
                          type: "spring",
                          stiffness: 400,
                          damping: 17,
                        },
                      }}
                    >
                      <Link
                        to={`/albums/${album._id}`}
                        className={`relative p-2 rounded-md flex items-center gap-3 group cursor-pointer overflow-hidden
                      ${
                        isCurrentAlbum
                          ? "bg-gradient-to-r from-[#B5179E]/50 to-[#7209B7]/20"
                          : ""
                      }`}
                      >
                        {!isCurrentAlbum && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="absolute inset-0 bg-gradient-to-r from-[#B5179E]/50 to-[#7209B7]/20"
                          />
                        )}

                        <motion.img
                          initial={{ scale: 1 }}
                          whileHover={{
                            scale: 1.08,
                            rotate: 2,
                            transition: {
                              type: "spring",
                              stiffness: 400,
                              damping: 17,
                            },
                          }}
                          src={album.imageUrl}
                          alt="Playlist img"
                          className="size-12 rounded-md flex-shrink-0 object-cover relative z-10"
                        />

                        <motion.div
                          initial={{ x: 0 }}
                          whileHover={{ x: 5 }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 20,
                          }}
                          className="flex-1 min-w-0 hidden md:block relative z-10"
                        >
                          <motion.p
                            initial={{ opacity: 0.9 }}
                            whileHover={{ opacity: 1 }}
                            className="font-medium truncate"
                          >
                            {album.title}
                          </motion.p>
                          <motion.p
                            initial={{ opacity: 0.7 }}
                            whileHover={{ opacity: 0.9 }}
                            className="text-sm text-zinc-400 truncate"
                          >
                            Album • {album.artist}
                          </motion.p>
                        </motion.div>
                      </Link>
                    </motion.div>
                  );
                })
              )}
            </div>
          </ScrollArea>
        </div>
      </div>

      <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default LeftSidebar;
