import { useAuthStore } from "@/stores/useAuthStore";
import Header from "./components/Header";
import DashboardStats from "./components/DashboardStats";
import { Album, Music } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SongsTabContent from "./components/SongsTabContent";
import AlbumsTabContent from "./components/AlbumsTabContent";
import { useEffect } from "react";
import { useMusicStore } from "@/stores/useMusicStore";
import { motion, AnimatePresence } from "framer-motion";

const AdminPage = () => {
  const { isAdmin, isLoading } = useAuthStore();
  const { fetchAlbums, fetchSongs, fetchStats } = useMusicStore();

  useEffect(() => {
    fetchAlbums();
    fetchSongs();
    fetchStats();
  }, [fetchAlbums, fetchSongs, fetchStats]);

  if (!isAdmin && !isLoading)
    return (
      <AnimatePresence>
        <motion.div
          className="text-center py-40 text-6xl font-bold"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
        >
          <motion.div
            className="bg-gradient-to-r from-[#7209B7] to-[#B5179E] text-transparent bg-clip-text"
            animate={{
              scale: [1, 1.02, 1],
              rotate: [0, -2, 2, -2, 0],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          >
            Unauthorized Access
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-[#7209B7]/10 via-black to-[#B5179E]/10 text-slate-300 p-2 md:p-8"
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Header />
      </motion.div>

      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <DashboardStats />
      </motion.div>

      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Tabs defaultValue="songs" className="space-y-6">
          <TabsList className="p-1 bg-black/40 backdrop-blur-lg border border-[#7209B7]/20 rounded-lg">
            <TabsTrigger
              value="songs"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#7209B7] data-[state=active]:to-[#B5179E] data-[state=active]:text-white transition-all duration-300"
            >
              <motion.div
                className="flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Music className="mr-2 size-4" />
                Songs
              </motion.div>
            </TabsTrigger>
            <TabsTrigger
              value="albums"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#7209B7] data-[state=active]:to-[#B5179E] data-[state=active]:text-white transition-all duration-300"
            >
              <motion.div
                className="flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Album className="mr-2 size-4" />
                Albums
              </motion.div>
            </TabsTrigger>
          </TabsList>

          <AnimatePresence mode="wait">
            <TabsContent value="songs">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <SongsTabContent />
              </motion.div>
            </TabsContent>
            <TabsContent value="albums">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <AlbumsTabContent />
              </motion.div>
            </TabsContent>
          </AnimatePresence>
        </Tabs>
      </motion.div>
    </motion.div>
  );
};

export default AdminPage;
