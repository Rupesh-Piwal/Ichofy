import  { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { SignedIn, useSignIn } from "@clerk/clerk-react";
import { buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useMusicStore } from "@/stores/useMusicStore";
import PlaylistSkeleton from "@/components/skeletons/PlaylistSkeleton ";
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

const GlowingHeadphones = ({ onClick }:any) => {
  return (
    <motion.div
      className="md:hidden relative cursor-pointer group"
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-[#B5179E] to-[#7209B7] opacity-20 blur-xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      />
      <div className="relative bg-zinc-950 rounded-full p-2.5 shadow-lg shadow-[#B5179E]/20">
        <HeadphonesIcon className="size-7 text-[#B5179E] group-hover:text-white transition-colors" />
      </div>
    </motion.div>
  );
};

const LoginModal = ({ isOpen, onClose }:any) => {
  const { signIn, isLoaded } = useSignIn();
  const backgroundIcons = [
    Users2Icon,
    Music2Icon,
    HeadphonesIcon,
    Disc3Icon,
    Radio,
  ];

  if (!isLoaded) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
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
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                className="relative bg-zinc-950/95 p-8 rounded-2xl border border-[#B5179E]/20 shadow-2xl shadow-[#B5179E]/10"
                whileHover={{ scale: 1.02 }}
              >
                <motion.button
                  className="absolute right-4 top-4 text-white/60 hover:text-white"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                >
                  <X className="size-6" />
                </motion.button>

                <div className="relative z-10 space-y-6">
                  <motion.div
                    className="relative cursor-pointer mx-auto w-24"
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.div
                      className="absolute -inset-4 bg-gradient-to-r from-[#B5179E] to-[#7209B7] rounded-full opacity-40 blur-xl"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <div className="relative bg-zinc-900 rounded-full p-6">
                      <HeadphonesIcon className="size-12 text-[#B5179E]" />
                    </div>
                  </motion.div>

                  <div className="space-y-4 text-center">
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-[#B5179E] to-[#7209B7] bg-clip-text text-transparent">
                      Join the Music Community
                    </h3>
                    <p className="text-zinc-400">
                      Connect with friends and discover new music together
                    </p>
                    <motion.button
                      onClick={() =>
                        signIn.authenticateWithRedirect({
                          strategy: "oauth_google",
                          redirectUrl: "/sso-callback",
                          redirectUrlComplete: "/auth-callback",
                        })
                      }
                      className="group relative px-8 py-3 w-full rounded-full bg-gradient-to-r from-[#B5179E] to-[#7209B7] text-white font-medium shadow-xl"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.span
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-[#7209B7] to-[#B5179E] opacity-0 group-hover:opacity-100 transition-opacity"
                        initial={false}
                      />
                      <span className="relative">Connect Now</span>
                    </motion.button>
                  </div>
                </div>

                {backgroundIcons.map((Icon, i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    animate={{
                      y: [-10, 10],
                      x: [-8, 8],
                      rotate: [-10, 10],
                    }}
                    transition={{
                      duration: 4 + i,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                    style={{
                      left: `${15 + i * 20}%`,
                      top: `${10 + i * 20}%`,
                    }}
                  >
                    <Icon className="size-12 text-[#B5179E] opacity-10" />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
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
      <div className="font-body h-full flex flex-col gap-3 bg-gradient-to-r from-[#B5179E]/10 to-[#7209B7]/10">
        <motion.div
          className="rounded-xl bg-zinc-950/50 p-4 backdrop-blur-sm border border-white/5"
          whileHover={{ scale: 1.01 }}
        >
          <div className="space-y-2">
            <Link
              to="/"
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  className:
                    "w-full justify-start text-zinc-400 hover:bg-gradient-to-r hover:from-[#B5179E]/20 hover:to-[#7209B7]/10 hover:text-white group",
                })
              )}
            >
              <HomeIcon className="mr-2 size-5 group-hover:text-[#B5179E] transition-colors" />
              <span className="hidden md:inline">Home</span>
            </Link>

            <SignedIn>
              <Link
                to="/chat"
                className={cn(
                  buttonVariants({
                    variant: "ghost",
                    className:
                      "w-full justify-start text-zinc-400 hover:bg-gradient-to-r hover:from-[#B5179E]/20 hover:to-[#7209B7]/10 hover:text-white group",
                  })
                )}
              >
                <MessageCircle className="mr-2 size-5 group-hover:text-[#B5179E] transition-colors" />
                <span className="hidden md:inline">Messages</span>
              </Link>
            </SignedIn>

            <GlowingHeadphones onClick={() => setIsModalOpen(true)} />
          </div>
        </motion.div>

        <motion.div
          className="flex-1 rounded-xl bg-zinc-950/50 p-4 backdrop-blur-sm border border-white/5"
          whileHover={{ scale: 1.01 }}
        >
          <div className="flex items-center justify-between mb-4 px-2">
            <div className="flex items-center text-zinc-400 group">
              <Library className="size-5 mr-2 group-hover:text-[#B5179E] transition-colors" />
              <span className="hidden md:inline group-hover:text-white transition-colors">
                Playlists
              </span>
            </div>
          </div>

          <ScrollArea className="h-[calc(100vh-300px)]">
            <div className="space-y-2 pr-4">
              {isLoading ? (
                <PlaylistSkeleton />
              ) : (
                albums.map((album) => {
                  const isCurrentAlbum =
                    location.pathname === `/albums/${album._id}`;
                  return (
                    <motion.div
                      key={album._id}
                      whileHover={{ scale: 1.02 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 17,
                      }}
                    >
                      <Link
                        to={`/albums/${album._id}`}
                        className={cn(
                          "relative p-2 rounded-lg flex items-center gap-3 group cursor-pointer",
                          isCurrentAlbum
                            ? "bg-gradient-to-r from-[#B5179E]/20 to-[#7209B7]/10"
                            : "hover:bg-gradient-to-r hover:from-[#B5179E]/20 hover:to-[#7209B7]/10"
                        )}
                      >
                        <motion.img
                          whileHover={{ scale: 1.05, rotate: 2 }}
                          src={album.imageUrl}
                          alt={album.title}
                          className="size-12 rounded-lg object-cover shadow-lg"
                        />
                        <div className="flex-1 min-w-0 hidden md:block">
                          <p className="font-medium text-zinc-300 group-hover:text-white truncate">
                            {album.title}
                          </p>
                          <p className="text-sm text-zinc-500 group-hover:text-zinc-400 truncate">
                            Album • {album.artist}
                          </p>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })
              )}
            </div>
          </ScrollArea>
        </motion.div>
      </div>

      <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default LeftSidebar;
