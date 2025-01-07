import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMusicStore } from "@/stores/useMusicStore";
// import { usePlayerStore } from "@/stores/usePlayerStore";
import { Clock, Pause, Play } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

export const formatDuration = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const AlbumPage = () => {
  const { albumId } = useParams();
  const { fetchAlbumById, currentAlbum, isLoading } = useMusicStore();
  // const { currentSong, isPlaying, playAlbum, togglePlay } = usePlayerStore();

  useEffect(() => {
    if (albumId) fetchAlbumById(albumId);
  }, [fetchAlbumById, albumId]);

  if (isLoading) return null;

  return (
    <div className="h-full">
      <ScrollArea className="h-full rounded-md">
        {/* Main Content */}
        <div className="relative min-h-full">
          {/* bg gradient */}
          <div
            className="absolute inset-0 bg-gradient-to-b from-[#B5179E]/30 via-[#7209B7]/10
					 to-zinc-900 pointer-events-none"
            aria-hidden="true"
          />

          {/* Content */}
          <div className="relative z-10">
            <div className="flex p-6 gap-6 pb-8">
              <img
                src={currentAlbum?.imageUrl}
                alt={currentAlbum?.title}
                className="w-[240px] h-[240px] shadow-xl rounded"
              />
              <div className="flex flex-col justify-end">
                <p className="text-sm font-medium">Album</p>
                <h1 className="text-7xl font-bold my-4">
                  {currentAlbum?.title}
                </h1>
                <div className="flex items-center gap-2 text-sm text-zinc-100">
                  <span className="font-medium text-white">
                    {currentAlbum?.artist}
                  </span>
                  <span>• {currentAlbum?.songs.length} songs</span>
                  <span>• {currentAlbum?.releaseYear}</span>
                </div>
              </div>
            </div>

            {/* play button */}
            <div className="px-6 pb-4 flex items-center gap-6">
              <Button
                // onClick={handlePlayAlbum}
                size="icon"
                className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-400 
                hover:scale-105 transition-all"
              >
                <Pause className="h-7 w-7 text-black" />
              </Button>
            </div>

            {/* Table Section */}
            <div className="bg-black/20 backdrop-blur-sm">
              {/* table header */}
              <div
                className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-10 py-2 text-sm 
            text-zinc-400 border-b border-white/5"
              >
                <div>#</div>
                <div>Title</div>
                <div>Released Date</div>
                <div>
                  <Clock className="h-4 w-4" />
                </div>
              </div>

              {/* songs list */}

              <div className="px-6">
                <div className="space-y-2 py-4">
                  {currentAlbum?.songs.map((song, index) => {
                    return (
                      <motion.div
                        initial={{ backgroundColor: "rgba(255, 255, 255, 0)" }}
                        whileHover={{
                          backgroundColor: "rgba(255, 255, 255, 0.05)",
                          scale: 1.01,
                          transition: { duration: 0.2 },
                        }}
                        className={`grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-4 py-2 text-sm 
                        text-zinc-400 rounded-md group cursor-pointer`}
                      >
                        <div className="flex items-center justify-center">
                          <motion.span
                            initial={{ opacity: 1 }}
                            whileHover={{ opacity: 0 }}
                          >
                            {index + 1}
                          </motion.span>

                          <motion.div
                            initial={{ opacity: 0, display: "none" }}
                            whileHover={{ opacity: 1 }}
                            className="group-hover:block"
                          >
                            <Play className="h-4 w-4" />
                          </motion.div>
                        </div>

                        <div className="flex items-center gap-3">
                          <motion.img
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            src={song.imageUrl}
                            alt={song.title}
                            className="size-10"
                          />

                          <div>
                            <motion.div
                              initial={{ color: "#ffffff" }}
                              whileHover={{ color: "rgba(255, 255, 255, 0.9)" }}
                              className="font-medium"
                            >
                              {song.title}
                            </motion.div>
                            <motion.div
                              initial={{ color: "rgb(161, 161, 170)" }}
                              whileHover={{ color: "rgb(212, 212, 216)" }}
                            >
                              {song.artist}
                            </motion.div>
                          </div>
                        </div>

                        <motion.div
                          initial={{ color: "rgb(161, 161, 170)" }}
                          whileHover={{ color: "rgb(212, 212, 216)" }}
                          className="flex items-center"
                        >
                          {song.createdAt.split("T")[0]}
                        </motion.div>

                        <motion.div
                          initial={{ color: "rgb(161, 161, 170)" }}
                          whileHover={{ color: "rgb(212, 212, 216)" }}
                          className="flex items-center"
                        >
                          {formatDuration(song.duration)}
                        </motion.div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};
export default AlbumPage;
