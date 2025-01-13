const PlaylistSkeleton = () => {
  return Array.from({ length: 7 }).map((_, i) => (
    <div
      key={i}
      className="p-2 rounded-xl flex items-center gap-3 group
        hover:bg-zinc-800/20 transition-colors duration-300
        relative overflow-hidden"
    >
      {/* Shimmering gradient overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent
        translate-x-[-100%] animate-[shimmer_2s_infinite]"
      />

      {/* Image skeleton with gradient */}
      <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
        <div
          className="absolute inset-0 
          bg-gradient-to-br from-[#B5179E]/20 to-[#7209B7]/20
          animate-[pulse_2s_infinite]"
        />
      </div>

      {/* Content container */}
      <div className="flex-1 min-w-0 hidden md:block space-y-2">
        {/* Title skeleton */}
        <div
          className="h-4 bg-gradient-to-r from-zinc-700/60 to-zinc-700/40 
          rounded-full w-3/4 animate-pulse"
        />
        {/* Subtitle skeleton */}
        <div
          className="h-3 bg-gradient-to-r from-zinc-700/60 to-zinc-700/40 
          rounded-full w-1/2 animate-pulse"
        />
      </div>

      {/* Play button skeleton on hover */}
      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div
          className="w-8 h-8 rounded-full
          bg-gradient-to-br from-[#B5179E]/20 to-[#7209B7]/20
          animate-[pulse_2s_infinite]"
        />
      </div>
    </div>
  ));
};

export default PlaylistSkeleton;
