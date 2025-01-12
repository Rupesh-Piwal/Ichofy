import "../../index.css"; // Import your global styles here

const FeaturedGridSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="group flex items-center 
            bg-zinc-800/40 backdrop-blur-sm
            overflow-hidden h-20
            relative
            animate-pulse"
        >
          {/* Shimmering gradient overlay */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent
            translate-x-[-100%] animate-[shimmer_2s_infinite]
            pointer-events-none"
          />

          {/* Image skeleton with gradient */}
          <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden">
            <div
              className="w-full h-full 
              bg-gradient-to-br from-[#B5179E]/20 to-[#7209B7]/20
              animate-[pulse_2s_infinite]"
            />
          </div>

          {/* Content container */}
          <div className="flex-1 min-w-0 flex items-center pr-16 pl-4 h-full relative">
            <div className="flex-1 space-y-2">
              {/* Title skeleton */}
              <div className="h-4 bg-gradient-to-r from-zinc-700/60 to-zinc-700/40 rounded-full w-3/4" />
              {/* Artist skeleton */}
              <div className="h-3 bg-gradient-to-r from-zinc-700/60 to-zinc-700/40 rounded-full w-1/2" />
            </div>

            {/* Play button skeleton */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <div
                className="w-10 h-10 rounded-full
                bg-gradient-to-br from-[#B5179E]/20 to-[#7209B7]/20
                animate-[pulse_2s_infinite]"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturedGridSkeleton;
