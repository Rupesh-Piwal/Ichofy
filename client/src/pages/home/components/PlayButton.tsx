import { Button } from "@/components/ui/button";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { Song } from "@/types";
import { Pause, Play } from "lucide-react";

const PlayButton = ({ song }: { song: Song }) => {
  const { currentSong, isPlaying, setCurrentSong, togglePlay } =
    usePlayerStore();
  const isCurrentSong = currentSong?._id === song._id;

  const handlePlay = () => {
    if (isCurrentSong) togglePlay();
    else setCurrentSong(song);
  };

  return (
    <Button
      size="icon"
      onClick={handlePlay}
      className={`
        absolute 
        bg-gradient-to-br from-[#B5179E] to-[#7209B7]
        hover:from-[#c428ab] hover:to-[#8319cc]
        hover:scale-105
        transition-all duration-300
        shadow-lg hover:shadow-xl hover:shadow-[#B5179E]/20
        border-0 rounded-full

        /* Position and visibility */
        bottom-6 right-6
        opacity-0 translate-y-2
        group-hover:translate-y-0
        ${isCurrentSong ? "opacity-100" : "opacity-0 group-hover:opacity-100"}

        /* Handle different layouts */
        [.flex_&]:bottom-2 [.flex_&]:right-2
      `}
    >
      {isCurrentSong && isPlaying ? (
        <>
          <Pause className="size-5 text-white" />
          <span className="absolute inset-0 rounded-full animate-ping bg-[#B5179E]/40" />
          <span className="absolute inset-0 rounded-full animate-pulse bg-[#7209B7]/40" />
        </>
      ) : (
        <Play className="size-5 text-white translate-x-0.5" />
      )}

      <div
        className={`
        absolute inset-0 rounded-full
        bg-gradient-to-br from-[#B5179E] to-[#7209B7]
        opacity-0 hover:opacity-50
        blur-xl transition-opacity duration-300
      `}
      />
    </Button>
  );
};

export default PlayButton;
