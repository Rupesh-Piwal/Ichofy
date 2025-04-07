import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMusicStore } from "@/stores/useMusicStore";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { Clock, Pause, Play } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export const formatDuration = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const AlbumPage = () => {
  const { albumId } = useParams();
  const { fetchAlbumById, currentAlbum, isLoading } = useMusicStore();
  const { currentSong, isPlaying, playAlbum, togglePlay } = usePlayerStore();

  useEffect(() => {
    if (albumId) fetchAlbumById(albumId);
  }, [fetchAlbumById, albumId]);

  if (isLoading) return null;

  const handlePlayAlbum = () => {
    if (!currentAlbum) return;
    const isCurrentAlbumPlaying = currentAlbum?.songs.some(
      (song) => song._id === currentSong?._id
    );
    if (isCurrentAlbumPlaying) togglePlay();
    else {
      playAlbum(currentAlbum?.songs, 0);
    }
  };

  const handlePlaySong = (index: number) => {
    if (!currentAlbum) return;
    playAlbum(currentAlbum?.songs, index);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <ScrollArea className="h-full rounded-md">
        <div className="relative min-h-full">
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-[#B5179E]/30 via-[#7209B7]/10
					 to-zinc-900 pointer-events-none"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            aria-hidden="true"
          />

          <motion.div
            className="relative z-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="flex p-6 gap-6 pb-8">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  ease: [0.6, -0.05, 0.01, 0.99],
                }}
                whileHover={{
                  scale: 1.05,
                  rotate: 3,
                  transition: { duration: 0.4 },
                }}
              >
                <motion.img
                  src={currentAlbum?.imageUrl}
                  alt={currentAlbum?.title}
                  className="w-[200px]  md:w-[240px] md:h-[240px] shadow-xl rounded"
                  whileHover={{
                    boxShadow: "0 20px 30px rgba(0,0,0,0.3)",
                  }}
                />
              </motion.div>

              <motion.div
                className="flex flex-col justify-end"
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: {
                    opacity: 1,
                    x: 0,
                    transition: {
                      duration: 0.8,
                      ease: "easeOut",
                    },
                  },
                }}
              >
                <motion.p
                  className="text-sm font-medium"
                  variants={itemVariants}
                >
                  Album
                </motion.p>
                <motion.h1
                  className="text-2xl md:text-7xl font-bold my-4"
                  variants={itemVariants}
                  whileInView={{
                    opacity: [0.5, 1],
                    scale: [0.98, 1],
                    transition: { duration: 0.8 },
                  }}
                >
                  {currentAlbum?.title}
                </motion.h1>
                <motion.div
                  className="flex items-center gap-2 text-sm text-zinc-100"
                  variants={itemVariants}
                >
                  <span className="font-medium text-white">
                    {currentAlbum?.artist}
                  </span>
                  <span>• {currentAlbum?.songs.length} songs</span>
                  <span>• {currentAlbum?.releaseYear}</span>
                </motion.div>
              </motion.div>
            </div>

            <div className="px-6 pb-4 flex items-center gap-6">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.6,
                  ease: [0.43, 0.13, 0.23, 0.96],
                }}
              >
                <Button
                  onClick={handlePlayAlbum}
                  size="icon"
                  className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-400 transition-all"
                >
                  <AnimatePresence mode="wait">
                    {isPlaying &&
                    currentAlbum?.songs.some(
                      (song) => song._id === currentSong?._id
                    ) ? (
                      <motion.div
                        key="pause"
                        initial={{ rotate: -180, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 180, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Pause className="h-7 w-7 text-black" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="play"
                        initial={{ rotate: -180, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 180, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Play className="h-7 w-7 text-black" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </motion.div>
            </div>

            <motion.div
              className="bg-black/20 backdrop-blur-sm"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <motion.div
                className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-10 py-2 text-sm text-zinc-400 border-b border-white/5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <div>#</div>
                <div>Title</div>
                <div>Released Date</div>
                <div>
                  <Clock className="h-4 w-4" />
                </div>
              </motion.div>

              <motion.div
                className="px-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <div className="space-y-2 py-4">
                  {currentAlbum?.songs.map((song, index) => {
                    const isCurrentSong = currentSong?._id === song._id;
                    return (
                      <motion.div
                        key={song._id}
                        variants={itemVariants}
                        whileHover={{
                          backgroundColor: "rgba(255, 255, 255, 0.05)",
                          scale: 1.01,
                          transition: { duration: 0.2 },
                        }}
                        onClick={() => handlePlaySong(index)}
                        className={`grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-4 py-2 text-sm 
                          text-zinc-400 rounded-md group cursor-pointer`}
                      >
                        <div className="flex items-center justify-center">
                          <AnimatePresence mode="wait">
                            {isCurrentSong && isPlaying ? (
                              <motion.div
                                key="playing"
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                exit={{ scale: 0, rotate: 180 }}
                                transition={{ duration: 0.3 }}
                                className="size-4 text-green-500"
                              >
                                ♫
                              </motion.div>
                            ) : (
                              <motion.span
                                key="number"
                                className="group-hover:hidden"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                              >
                                {index + 1}
                              </motion.span>
                            )}
                          </AnimatePresence>
                          {!isCurrentSong && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              whileHover={{ opacity: 1 }}
                              transition={{ duration: 0.2 }}
                            >
                              <Play className="h-4 w-4 hidden group-hover:block" />
                            </motion.div>
                          )}
                        </div>

                        <div className="flex items-center gap-3">
                          <motion.img
                            src={song.imageUrl}
                            alt={song.title}
                            className="size-10 rounded-sm"
                            whileHover={{
                              scale: 1.15,
                              rotate: 5,
                              transition: { duration: 0.3 },
                            }}
                          />
                          <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * index }}
                          >
                            <div className={`font-medium text-white`}>
                              {song.title}
                            </div>
                            <div>{song.artist}</div>
                          </motion.div>
                        </div>
                        <div className="flex items-center">
                          {song.createdAt.split("T")[0]}
                        </div>
                        <div className="flex items-center">
                          {formatDuration(song.duration)}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </ScrollArea>
    </motion.div>
  );
};

export default AlbumPage;
