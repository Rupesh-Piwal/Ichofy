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
import { motion, AnimatePresence } from "framer-motion";

const SongsTable = () => {
  const { songs, isLoading, error, deleteSong } = useMusicStore();

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

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-center py-16 px-4"
      >
        <div className="flex items-center gap-2 text-red-400 bg-red-400/10 px-4 py-3 rounded-lg">
          <AlertCircle className="size-5" />
          <span>{error}</span>
        </div>
      </motion.div>
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
          <AnimatePresence>
            {songs.map((song, index) => (
              <motion.tr
                key={song._id}
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
                        src={song.imageUrl}
                        alt={song.title}
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
                    {song.title}
                  </motion.div>
                </TableCell>
                <TableCell>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 + 0.2 }}
                  >
                    {song.artist}
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
                    {song.createdAt.split("T")[0]}
                  </motion.span>
                </TableCell>

                <TableCell className="text-right">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 + 0.4 }}
                    className="flex gap-2 justify-end"
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      className="relative overflow-hidden group"
                      onClick={() => deleteSong(song._id)}
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

export default SongsTable;
