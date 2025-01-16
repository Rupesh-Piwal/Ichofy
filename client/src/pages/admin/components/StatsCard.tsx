"use client";

import { motion } from "framer-motion";

type StatsCardProps = {
  icon: React.ElementType;
  label: string;
  value: string;
  index: number;
  bgColor: string;
  iconColor: string;
};

const StatsCard = ({
  icon: Icon,
  label,
  value,
  index,
  bgColor,
  iconColor,
}: StatsCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -5 }}
      className={`relative p-6 rounded-xl backdrop-blur-sm border border-white/10 overflow-hidden group ${bgColor}`}
    >
      <div className="relative z-10">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: index * 0.1 + 0.2, duration: 0.3 }}
          className="mb-4"
        >
          <div
            className={`w-12 h-12 rounded-lg flex items-center justify-center ${iconColor}`}
          >
            <Icon className="size-6 text-white" />
          </div>
        </motion.div>

        <h3 className="text-white text-sm font-medium mb-2">{label}</h3>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 + 0.3, duration: 0.3 }}
          className="text-2xl font-bold text-white"
        >
          {value}
        </motion.div>
      </div>

      {/* Subtle background animation */}
      <motion.div
        className={`absolute inset-0 opacity-20`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 0.5 }}
      />

      {/* Elegant hover effect */}
      <motion.div
        className={`absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300`}
        initial={false}
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      />
    </motion.div>
  );
};

export default StatsCard;
