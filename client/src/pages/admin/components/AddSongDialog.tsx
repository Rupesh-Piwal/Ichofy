"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { axiosInstance } from "@/lib/axios";
import { useMusicStore } from "@/stores/useMusicStore";
import { Plus, Music, ImageIcon } from "lucide-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useAuth } from "@clerk/clerk-react";

interface NewSong {
  title: string;
  artist: string;
  album: string;
  duration: string;
}

const AddSongDialog = () => {
  const { getToken } = useAuth();
  const { albums } = useMusicStore();
  const [songDialogOpen, setSongDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [newSong, setNewSong] = useState<NewSong>({
    title: "",
    artist: "",
    album: "",
    duration: "0",
  });

  const [files, setFiles] = useState<{
    audio: File | null;
    image: File | null;
  }>({
    audio: null,
    image: null,
  });

  const audioInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {
    const token = await getToken();
    setIsLoading(true);

    try {
      if (!files.audio || !files.image) {
        return toast.error("Please upload both audio and image files");
      }

      const formData = new FormData();

      formData.append("title", newSong.title);
      formData.append("artist", newSong.artist);
      formData.append("duration", newSong.duration);
      if (newSong.album && newSong.album !== "none") {
        formData.append("albumId", newSong.album);
      }

      formData.append("audioFile", files.audio);
      formData.append("imageFile", files.image);

      await axiosInstance.post("/admin/songs", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setNewSong({
        title: "",
        artist: "",
        album: "",
        duration: "0",
      });

      setFiles({
        audio: null,
        image: null,
      });
      toast.success("Song added successfully");
      setSongDialogOpen(false);
    } catch (error: any) {
      toast.error("Failed to add song: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={songDialogOpen} onOpenChange={setSongDialogOpen}>
      <DialogTrigger asChild>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block"
        >
          <Button className="bg-gradient-to-r from-[#7209B7] to-[#B5179E] hover:from-[#8A0BC1] hover:to-[#C41BAE] text-white shadow-lg hover:shadow-xl transition-all duration-300">
            <Plus className="mr-2 h-4 w-4" />
            Add Song
          </Button>
        </motion.div>
      </DialogTrigger>

      <DialogContent className="bg-gradient-to-br from-[#7209B7]/10 via-black to-[#B5179E]/10 border-[#7209B7]/20 max-h-[80vh] overflow-auto backdrop-blur-md">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#7209B7] to-[#B5179E]">
            Add New Song
          </DialogTitle>
          <DialogDescription className="text-zinc-400">
            Elevate your music library with a new masterpiece
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-6">
          <input
            type="file"
            accept="audio/*"
            ref={audioInputRef}
            hidden
            onChange={(e) =>
              setFiles((prev) => ({ ...prev, audio: e.target.files![0] }))
            }
          />

          <input
            type="file"
            ref={imageInputRef}
            className="hidden"
            accept="image/*"
            onChange={(e) =>
              setFiles((prev) => ({ ...prev, image: e.target.files![0] }))
            }
          />

          {/* File upload area */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Image upload */}
            <motion.div
              className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-[#7209B7]/30 rounded-lg cursor-pointer bg-[#7209B7]/5 hover:bg-[#7209B7]/10 transition-colors duration-300"
              onClick={() => imageInputRef.current?.click()}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-center">
                {files.image ? (
                  <div className="space-y-2">
                    <div className="text-lg font-semibold text-[#B5179E]">
                      Image Selected
                    </div>
                    <div className="text-sm text-zinc-400">
                      {files.image.name.slice(0, 20)}
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="p-4 bg-[#7209B7]/20 rounded-full inline-block mb-3">
                      <ImageIcon className="h-8 w-8 text-[#B5179E]" />
                    </div>
                    <div className="text-lg font-semibold text-zinc-300 mb-2">
                      Upload Artwork
                    </div>
                    <div className="text-sm text-zinc-400 mb-3">
                      Drag & drop or click to select
                    </div>
                  </>
                )}
              </div>
            </motion.div>

            {/* Audio upload */}
            <motion.div
              className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-[#B5179E]/30 rounded-lg cursor-pointer bg-[#B5179E]/5 hover:bg-[#B5179E]/10 transition-colors duration-300"
              onClick={() => audioInputRef.current?.click()}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-center">
                {files.audio ? (
                  <div className="space-y-2">
                    <div className="text-lg font-semibold text-[#7209B7]">
                      Audio Selected
                    </div>
                    <div className="text-sm text-zinc-400">
                      {files.audio.name.slice(0, 20)}
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="p-4 bg-[#B5179E]/20 rounded-full inline-block mb-3">
                      <Music className="h-8 w-8 text-[#7209B7]" />
                    </div>
                    <div className="text-lg font-semibold text-zinc-300 mb-2">
                      Upload Audio
                    </div>
                    <div className="text-sm text-zinc-400 mb-3">
                      Drag & drop or click to select
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </div>

          {/* Song details */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">Title</label>
              <Input
                value={newSong.title}
                onChange={(e) =>
                  setNewSong({ ...newSong, title: e.target.value })
                }
                className="bg-[#7209B7]/10 border-[#7209B7]/30 text-zinc-100 focus:ring-[#B5179E] focus:border-[#B5179E] transition-all duration-300"
                placeholder="Enter song title"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">
                Artist
              </label>
              <Input
                value={newSong.artist}
                onChange={(e) =>
                  setNewSong({ ...newSong, artist: e.target.value })
                }
                className="bg-[#7209B7]/10 border-[#7209B7]/30 text-zinc-100 focus:ring-[#B5179E] focus:border-[#B5179E] transition-all duration-300"
                placeholder="Enter artist name"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">
                Duration (seconds)
              </label>
              <Input
                type="number"
                min="0"
                value={newSong.duration}
                onChange={(e) =>
                  setNewSong({ ...newSong, duration: e.target.value || "0" })
                }
                className="bg-[#7209B7]/10 border-[#7209B7]/30 text-zinc-100 focus:ring-[#B5179E] focus:border-[#B5179E] transition-all duration-300"
                placeholder="Enter duration in seconds"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">
                Album (Optional)
              </label>
              <Select
                value={newSong.album}
                onValueChange={(value) =>
                  setNewSong({ ...newSong, album: value })
                }
              >
                <SelectTrigger className="bg-[#7209B7]/10 border-[#7209B7]/30 text-zinc-100 focus:ring-[#B5179E] focus:border-[#B5179E] transition-all duration-300">
                  <SelectValue placeholder="Select album" />
                </SelectTrigger>
                <SelectContent className="bg-gradient-to-br from-[#7209B7]/10 to-[#B5179E]/20 border-[#7209B7]/10 backdrop-blur-lg">
                  <SelectItem
                    value="none"
                    className="text-zinc-100 hover:bg-white/10"
                  >
                    No Album (Single)
                  </SelectItem>
                  {albums.map((album) => (
                    <SelectItem
                      key={album._id}
                      value={album._id}
                      className="text-zinc-100 hover:bg-white/10"
                    >
                      {album.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <DialogFooter className="space-x-4">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              onClick={() => setSongDialogOpen(false)}
              disabled={isLoading}
              className="bg-transparent border-[#7209B7]/50 text-zinc-300 hover:bg-[#7209B7]/20 transition-all duration-300"
            >
              Cancel
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={handleSubmit}
              disabled={isLoading}
              className="bg-gradient-to-r from-[#7209B7] to-[#B5179E] hover:from-[#8A0BC1] hover:to-[#C41BAE] text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {isLoading ? "Uploading..." : "Add Song"}
            </Button>
          </motion.div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddSongDialog;
