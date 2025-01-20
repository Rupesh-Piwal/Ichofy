import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Library } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import PlaylistSkeleton from "@/components/skeletons/PlaylistSkeleton ";
import { useMusicStore } from "@/stores/useMusicStore";

const PlaylistList = () => {
  const { albums, fetchAlbums, isLoading } = useMusicStore();

  useEffect(() => {
    fetchAlbums();
  }, [fetchAlbums]);

  return (
    <div className="flex-1 rounded-lg h-full bg-gradient-to-br from-[#B5179E]/5 to-[#7209B7]/5 p-4 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center text-white px-2">
          <Library className="size-5 mr-2" />
          <span className="md:inline font-semibold">Playlists</span>
        </div>
      </div>
      <ScrollArea className="h-[calc(100vh-300px)]">
        <div className="space-y-2">
          {isLoading ? (
            <PlaylistSkeleton />
          ) : (
            albums.map((album) => (
              <Link
                to={`/albums/${album._id}`}
                key={album._id}
                className="p-2 hover:bg-white/10 rounded-md flex items-center gap-3 group cursor-pointer transition-colors duration-200"
              >
                <img
                  src={album.imageUrl || "/placeholder.svg"}
                  alt={`${album.title} cover`}
                  className="size-12 rounded-md flex-shrink-0 object-cover shadow-md"
                />
                <div className="flex-1 min-w-0 md:block">
                  <p className="font-medium truncate text-white group-hover:text-[#B5179E]">
                    {album.title}
                  </p>
                  <p className="text-sm text-pink-200 truncate group-hover:text-[#7209B7]">
                    Album • {album.artist}
                  </p>
                </div>
              </Link>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default PlaylistList;
