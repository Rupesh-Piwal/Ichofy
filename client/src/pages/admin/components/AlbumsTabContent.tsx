import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Library } from "lucide-react";
import AlbumsTable from "./AlbumsTable";
import AddAlbumDialog from "./AddAlbumDialog";

const AlbumsTabContent = () => {
  return (
    <div>
      <Card className="relative bg-black/20 border border-[#7209B7]/10 backdrop-blur-sm overflow-hidden">
        {/* Decorative gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#7209B7]/5 via-transparent to-[#B5179E]/5 pointer-events-none" />

        <CardHeader className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-gradient-to-br from-[#7209B7] to-[#B5179E]">
                  <Library className="size-5 text-white" />
                </div>
                <span className="bg-gradient-to-r from-[#7209B7] to-[#B5179E] bg-clip-text text-transparent text-2xl">
                  Albums Library
                </span>
              </CardTitle>
              <CardDescription className="text-slate-400">
                Manage your album collection
              </CardDescription>
            </div>

            <div>
              <AddAlbumDialog />
            </div>
          </div>

          {/* Decorative gradient line */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-[#7209B7]/20 via-[#B5179E]/20 to-transparent" />
        </CardHeader>

        <CardContent>
          <AlbumsTable />
        </CardContent>
      </Card>
    </div>
  );
};

export default AlbumsTabContent;
