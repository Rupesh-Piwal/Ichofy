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
import { axiosInstance } from "@/lib/axios";
import { Plus, AlbumIcon } from "lucide-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { motion} from "framer-motion";

const AddAlbumDialog = () => {
  const [albumDialogOpen, setAlbumDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [newAlbum, setNewAlbum] = useState({
    title: "",
    artist: "",
    releaseYear: new Date().getFullYear(),
  });

  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      if (!imageFile) {
        return toast.error("Please upload an image");
      }

      const formData = new FormData();
      formData.append("title", newAlbum.title);
      formData.append("artist", newAlbum.artist);
      formData.append("releaseYear", newAlbum.releaseYear.toString());
      formData.append("imageFile", imageFile);

      await axiosInstance.post("/admin/albums", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setNewAlbum({
        title: "",
        artist: "",
        releaseYear: new Date().getFullYear(),
      });
      setImageFile(null);
      setAlbumDialogOpen(false);
      toast.success("Album created successfully");
    } catch (error: any) {
      toast.error("Failed to create album: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={albumDialogOpen} onOpenChange={setAlbumDialogOpen}>
      <DialogTrigger asChild>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block"
        >
          <Button className="bg-gradient-to-r from-[#7209B7] to-[#B5179E] hover:from-[#8A0BC1] hover:to-[#C41BAE] text-white shadow-lg hover:shadow-xl transition-all duration-300">
            <Plus className="mr-2 h-4 w-4" />
            Add Album
          </Button>
        </motion.div>
      </DialogTrigger>
      <DialogContent className="bg-gradient-to-br from-[#7209B7]/10 via-black to-[#B5179E]/10 border-[#7209B7]/20 max-h-[80vh] overflow-auto backdrop-blur-md">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#7209B7] to-[#B5179E]">
            Add New Album
          </DialogTitle>
          <DialogDescription className="text-zinc-400">
            Expand your collection with a new masterpiece
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-6">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageSelect}
            accept="image/*"
            className="hidden"
          />
          <motion.div
            className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-[#7209B7]/30 rounded-lg cursor-pointer bg-[#7209B7]/5 hover:bg-[#7209B7]/10 transition-colors duration-300"
            onClick={() => fileInputRef.current?.click()}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="text-center">
              {imageFile ? (
                <div className="space-y-2">
                  <div className="text-lg font-semibold text-[#B5179E]">
                    Image Selected
                  </div>
                  <div className="text-sm text-zinc-400">
                    {imageFile.name.slice(0, 20)}
                  </div>
                </div>
              ) : (
                <>
                  <div className="p-4 bg-[#7209B7]/20 rounded-full inline-block mb-3">
                    <AlbumIcon className="h-8 w-8 text-[#B5179E]" />
                  </div>
                  <div className="text-lg font-semibold text-zinc-300 mb-2">
                    Upload Album Artwork
                  </div>
                  <div className="text-sm text-zinc-400 mb-3">
                    Drag & drop or click to select
                  </div>
                </>
              )}
            </div>
          </motion.div>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">
                Album Title
              </label>
              <Input
                value={newAlbum.title}
                onChange={(e) =>
                  setNewAlbum({ ...newAlbum, title: e.target.value })
                }
                className="bg-[#7209B7]/10 border-[#7209B7]/30 text-zinc-100 focus:ring-[#B5179E] focus:border-[#B5179E] transition-all duration-300"
                placeholder="Enter album title"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">
                Artist
              </label>
              <Input
                value={newAlbum.artist}
                onChange={(e) =>
                  setNewAlbum({ ...newAlbum, artist: e.target.value })
                }
                className="bg-[#7209B7]/10 border-[#7209B7]/30 text-zinc-100 focus:ring-[#B5179E] focus:border-[#B5179E] transition-all duration-300"
                placeholder="Enter artist name"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">
                Release Year
              </label>
              <Input
                type="number"
                value={newAlbum.releaseYear}
                onChange={(e) =>
                  setNewAlbum({
                    ...newAlbum,
                    releaseYear: parseInt(e.target.value),
                  })
                }
                className="bg-[#7209B7]/10 border-[#7209B7]/30 text-zinc-100 focus:ring-[#B5179E] focus:border-[#B5179E] transition-all duration-300"
                placeholder="Enter release year"
                min={1900}
                max={new Date().getFullYear()}
              />
            </div>
          </div>
        </div>
        <DialogFooter className="space-x-4">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              onClick={() => setAlbumDialogOpen(false)}
              disabled={isLoading}
              className="bg-transparent border-[#7209B7]/50 text-zinc-300 hover:bg-[#7209B7]/20 transition-all duration-300"
            >
              Cancel
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={handleSubmit}
              className="bg-gradient-to-r from-[#7209B7] to-[#B5179E] hover:from-[#8A0BC1] hover:to-[#C41BAE] text-white shadow-lg hover:shadow-xl transition-all duration-300"
              disabled={
                isLoading || !imageFile || !newAlbum.title || !newAlbum.artist
              }
            >
              {isLoading ? "Creating..." : "Add Album"}
            </Button>
          </motion.div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddAlbumDialog;
