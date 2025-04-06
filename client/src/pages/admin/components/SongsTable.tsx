import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMusicStore } from "@/stores/useMusicStore";
import { Calendar, Loader2, Trash2, AlertCircle } from "lucide-react";

const SongsTable = () => {
  const { songs, isLoading, error, deleteSong } = useMusicStore();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="animate-spin">
          <Loader2 className="size-8 text-[#7209B7]" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-16 px-4">
        <div className="flex items-center gap-2 text-red-400 bg-red-400/10 px-4 py-3 rounded-lg">
          <AlertCircle className="size-5" />
          <span>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative rounded-xl overflow-hidden border border-[#7209B7]/10 bg-black/20 backdrop-blur-sm">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-[#7209B7]/5 border-b border-[#7209B7]/10">
            <TableHead className="w-[50px]"></TableHead>
            <TableHead className="text-[#B5179E]">Title</TableHead>
            <TableHead className="text-[#B5179E]">Artist</TableHead>
            <TableHead className="text-[#B5179E]">Release Date</TableHead>
            <TableHead className="text-right text-[#B5179E]">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {songs.map((song) => (
            <tr
              key={song._id}
              className="group hover:bg-[#7209B7]/5 border-b border-[#7209B7]/10"
            >
              <TableCell className="p-2">
                <div className="size-12 rounded-lg overflow-hidden border-2 border-transparent group-hover:border-[#7209B7]/30 transition-all duration-300">
                  <img
                    src={song.imageUrl}
                    alt={song.title}
                    className="size-full object-cover"
                  />
                </div>
              </TableCell>
              <TableCell>
                <div className="font-medium bg-gradient-to-r from-[#7209B7] to-[#B5179E] bg-clip-text text-transparent">
                  {song.title}
                </div>
              </TableCell>
              <TableCell>{song.artist}</TableCell>
              <TableCell>
                <span className="inline-flex items-center gap-2 text-zinc-400 bg-[#7209B7]/5 px-3 py-1 rounded-full">
                  <Calendar className="size-4" />
                  {song.createdAt.split("T")[0]}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex gap-2 justify-end">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="relative overflow-hidden group"
                    onClick={() => deleteSong(song._id)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#7209B7] to-[#B5179E] opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                    <Trash2 className="size-4 text-red-700 group-hover:text-red-400 transition-colors duration-300" />
                  </Button>
                </div>
              </TableCell>
            </tr>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SongsTable;
