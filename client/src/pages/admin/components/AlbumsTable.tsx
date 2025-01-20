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
import { Calendar, Music, Trash2, Loader2 } from "lucide-react";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AlbumsTable = () => {
  const { albums, deleteAlbum, fetchAlbums, isLoading } = useMusicStore();

  useEffect(() => {
    fetchAlbums();
  }, [fetchAlbums]);

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-center py-16"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Loader2 className="size-8 text-[#7209B7]" />
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div className="font-sleek relative rounded-xl overflow-hidden border border-[#7209B7]/10 bg-black/20 backdrop-blur-sm">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-[#7209B7]/5 border-b border-[#7209B7]/10">
            <TableHead className="w-[50px]"></TableHead>
            <TableHead className="text-[#B5179E]">Title</TableHead>
            <TableHead className="text-[#B5179E]">Artist</TableHead>
            <TableHead className="text-[#B5179E]">Release Year</TableHead>
            <TableHead className="text-[#B5179E]">Songs</TableHead>
            <TableHead className="text-right text-[#B5179E]">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <AnimatePresence>
            {albums.map((album, index) => (
              <motion.tr
                key={album._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: index * 0.05 }}
                className="group hover:bg-[#7209B7]/5 border-b border-[#7209B7]/10"
              >
                <TableCell className="p-2">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <div className="size-12 rounded-lg overflow-hidden border-2 border-transparent group-hover:border-[#7209B7]/30 transition-all duration-300">
                      <img
                        src={album.imageUrl}
                        alt={album.title}
                        className="size-full object-cover"
                      />
                    </div>
                  </motion.div>
                </TableCell>
                <TableCell>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 + 0.1 }}
                    className="font-medium bg-gradient-to-r from-[#7209B7] to-[#B5179E] bg-clip-text text-transparent"
                  >
                    {album.title}
                  </motion.div>
                </TableCell>
                <TableCell>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 + 0.2 }}
                  >
                    {album.artist}
                  </motion.div>
                </TableCell>
                <TableCell>
                  <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 + 0.3 }}
                    className="inline-flex items-center gap-2 text-zinc-400 bg-[#7209B7]/5 px-3 py-1 rounded-full"
                  >
                    <Calendar className="size-4" />
                    {album.releaseYear}
                  </motion.span>
                </TableCell>
                <TableCell>
                  <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 + 0.4 }}
                    className="inline-flex items-center gap-2 text-zinc-400 bg-[#B5179E]/5 px-3 py-1 rounded-full"
                  >
                    <Music className="size-4" />
                    {album.songs.length} songs
                  </motion.span>
                </TableCell>
                <TableCell className="text-right">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 + 0.5 }}
                    className="flex gap-2 justify-end"
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      className="relative overflow-hidden group"
                      onClick={() => deleteAlbum(album._id)}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-[#7209B7] to-[#B5179E] opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                        whileHover={{ scale: 1.2 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 17,
                        }}
                      />
                      <Trash2 className="size-4 text-red-700 group-hover:text-red-400 transition-colors duration-300" />
                    </Button>
                  </motion.div>
                </TableCell>
              </motion.tr>
            ))}
          </AnimatePresence>
        </TableBody>
      </Table>
    </div>
  );
};

export default AlbumsTable;
