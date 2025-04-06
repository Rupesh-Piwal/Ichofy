import { useAuthStore } from "@/stores/useAuthStore";
import Header from "./components/Header";
import DashboardStats from "./components/DashboardStats";
import { Album, Music } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SongsTabContent from "./components/SongsTabContent";
import AlbumsTabContent from "./components/AlbumsTabContent";
import { useEffect } from "react";
import { useMusicStore } from "@/stores/useMusicStore";

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
      <div className="text-center py-40 text-6xl font-bold">
        <div className="bg-gradient-to-r from-[#7209B7] to-[#B5179E] text-transparent bg-clip-text">
          Unauthorized Access
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#7209B7]/10 via-black to-[#B5179E]/10 text-slate-300 p-2 md:p-8">
      <Header />
      <DashboardStats />

      <Tabs defaultValue="songs" className="space-y-6">
        <TabsList className="p-1 bg-black/40 backdrop-blur-lg border border-[#7209B7]/20 rounded-lg">
          <TabsTrigger
            value="songs"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#7209B7] data-[state=active]:to-[#B5179E] data-[state=active]:text-white transition-all duration-300"
          >
            <div className="flex items-center">
              <Music className="mr-2 size-4" />
              Songs
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="albums"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#7209B7] data-[state=active]:to-[#B5179E] data-[state=active]:text-white transition-all duration-300"
          >
            <div className="flex items-center">
              <Album className="mr-2 size-4" />
              Albums
            </div>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="songs">
          <SongsTabContent />
        </TabsContent>
        <TabsContent value="albums">
          <AlbumsTabContent />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPage;
