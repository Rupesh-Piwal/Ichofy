import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Music } from "lucide-react";
import AddSongDialog from "./AddSongDialog";
import SongsTable from "./SongsTable";

const SongsTabContent = () => {
  return (
    <div>
      <Card className="bg-black/20 border-[#7209B7]/10 backdrop-blur-sm overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-[#7209B7]/5 via-transparent to-[#B5179E]/5" />

        <CardHeader className="relative">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-gradient-to-br from-[#7209B7] to-[#B5179E]">
                  <Music className="size-5 text-white" />
                </div>
                <span className="bg-gradient-to-r from-[#7209B7] to-[#B5179E] bg-clip-text text-transparent text-2xl">
                  Songs Library
                </span>
              </CardTitle>

              <CardDescription className="text-zinc-400">
                Manage your music tracks
              </CardDescription>
            </div>

            <div>
              <AddSongDialog />
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-[#7209B7]/20 via-[#B5179E]/20 to-transparent" />
        </CardHeader>

        <CardContent>
          <SongsTable />
        </CardContent>
      </Card>
    </div>
  );
};

export default SongsTabContent;
