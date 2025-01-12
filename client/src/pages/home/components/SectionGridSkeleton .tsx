import "../../../index.css";

const SectionGridSkeleton = () => {
  return (
    <div className="mb-8">
      <div className="mb-4 flex items-center justify-between">
        <div className="h-8 w-48 rounded-lg overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-800/80 to-zinc-800/40 animate-pulse" />
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent
            translate-x-[-100%] animate-[shimmer_2s_infinite]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="group bg-zinc-800/40 p-4 rounded-xl overflow-hidden
              backdrop-blur-sm relative"
          >
            <div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent
              translate-x-[-100%] animate-[shimmer_2s_infinite]"
            />

            <div className="aspect-square rounded-lg overflow-hidden mb-4 relative">
              <div
                className="absolute inset-0 
                bg-gradient-to-br from-[#B5179E]/20 to-[#7209B7]/20
                animate-[pulse_2s_infinite]"
              />

              <div className="absolute bottom-6 right-6">
                <div
                  className="w-10 h-10 rounded-full
                  bg-gradient-to-br from-[#B5179E]/20 to-[#7209B7]/20
                  animate-[pulse_2s_infinite]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div
                className="h-4 bg-gradient-to-r from-zinc-700/60 to-zinc-700/40 
                rounded-full w-3/4 animate-pulse"
              />
              <div
                className="h-3 bg-gradient-to-r from-zinc-700/60 to-zinc-700/40 
                rounded-full w-1/2 animate-pulse"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionGridSkeleton;
