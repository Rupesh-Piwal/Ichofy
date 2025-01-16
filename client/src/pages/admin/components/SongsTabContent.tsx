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
import { motion } from "framer-motion";

const SongsTabContent = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-black/20 border-[#7209B7]/10 backdrop-blur-sm overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-[#7209B7]/5 via-transparent to-[#B5179E]/5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        />

        <CardHeader className="relative">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <CardTitle className="flex items-center gap-3 mb-2">
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="p-2 rounded-lg bg-gradient-to-br from-[#7209B7] to-[#B5179E]">
                    <Music className="size-5 text-white" />
                  </div>
                </motion.div>
                <span className="bg-gradient-to-r from-[#7209B7] to-[#B5179E] bg-clip-text text-transparent text-2xl">
                  Songs Library
                </span>
              </CardTitle>
              <CardDescription className="text-zinc-400">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Manage your music tracks
                </motion.div>
              </CardDescription>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.05 }}
            >
              <AddSongDialog />
            </motion.div>
          </div>

          {/* Decorative line */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-[#7209B7]/20 via-[#B5179E]/20 to-transparent"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 0.6 }}
          />
        </CardHeader>

        <CardContent>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <SongsTable />
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SongsTabContent;
