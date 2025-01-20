import { useMusicStore } from "@/stores/useMusicStore";
import FeaturedGridSkeleton from "@/components/skeletons/FeaturedGridSkeleton";
import PlayButton from "./PlayButton";

const FeaturedSection = () => {
  const { isLoading, featuredSongs, error } = useMusicStore();

  if (isLoading) return <FeaturedGridSkeleton />;

  if (error)
    return (
      <div className="font-body rounded-lg bg-red-500/10 border border-red-500/20 p-4">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );

  return (
    <div className="font-sleek grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      {featuredSongs.map((song) => (
        <div
          key={song._id}
          className="group relative flex items-center
            bg-zinc-800/40 hover:bg-zinc-700/40
            overflow-hidden
            transition-all duration-300 ease-out
            hover:shadow-xl hover:shadow-black/20
            hover:-translate-y-0.5
            cursor-pointer
            backdrop-blur-sm
            h-20
          "
        >

          <div className="absolute inset-0 bg-gradient-to-r from-[#B5179E]/5 to-[#7209B7]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden">
            <img
              src={song.imageUrl}
              alt={song.title}
              className="w-full h-full object-cover
                transition-transform duration-300 
                group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
          </div>

          <div className="flex-1 min-w-0 flex items-center pr-16 pl-4 h-full relative">
            <div className="flex-1">
              <p
                className="font-medium truncate 
                transition-colors duration-300
                group-hover:text-white"
              >
                {song.title}
              </p>
              <p
                className="text-sm text-zinc-400 truncate 
                transition-colors duration-300
                group-hover:text-zinc-300"
              >
                {song.artist}
              </p>
            </div>

            <div className="absolute right-[1px] top-[60px] -translate-y-1/2">
              <PlayButton song={song} />
            </div>
          </div>

          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100
            bg-gradient-to-r from-transparent via-white/5 to-transparent
            translate-x-[-100%] group-hover:translate-x-[100%]
            transition-transform duration-1000 ease-out"
          />
        </div>
      ))}
    </div>
  );
};

export default FeaturedSection;
