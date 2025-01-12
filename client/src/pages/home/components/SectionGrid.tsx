import { Song } from "@/types";
import SectionGridSkeleton from "./SectionGridSkeleton ";
import PlayButton from "./PlayButton";

type SectionGridProps = {
  title: string;
  songs: Song[];
  isLoading: boolean;
};

const SectionGrid = ({ songs, title, isLoading }: SectionGridProps) => {
  if (isLoading) return <SectionGridSkeleton />;

  return (
    <section className="mb-12 px-4 py-6 bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-xl shadow-xl">
      <h2 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-800 to-pink-600 mb-6">
        {title}
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
        {songs.map((song) => (
          <div
            key={song._id}
            className="bg-zinc-800/40 rounded-lg overflow-hidden hover:bg-zinc-700/40 transition-all duration-300 group cursor-pointer transform hover:-translate-y-1 hover:shadow-2xl"
          >
            <div className="relative">
              <div className="aspect-square rounded-t-lg shadow-lg overflow-hidden">
                <img
                  src={song.imageUrl}
                  alt={song.title}
                  className="w-full h-full object-cover transition-transform duration-500 
                  group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50">
                <PlayButton song={song} />
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-1 truncate group-hover:text-purple-400 transition-colors duration-300">
                {song.title}
              </h3>
              <p className="text-sm text-zinc-400 truncate group-hover:text-zinc-300 transition-colors duration-300">
                {song.artist}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SectionGrid;
