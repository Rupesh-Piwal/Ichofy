const PlaylistSkeleton = () => {
  return Array.from({ length: 7 }).map((_, i) => (
    <div key={i} className="p-2 rounded-md flex items-center gap-3">
      <div className="w-12 h-12 bg-gradient-to-r from-[#B5179E]/40 bg-slate-600 rounded-md flex-shrink-0 animate-pulse" />
      <div className="flex-1 min-w-0 hidden md:block space-y-2">
        <div className="h-4 bg-gradient-to-r from-[#B5179E]/40 bg-slate-600 rounded animate-pulse w-3/4" />
        <div className="h-3 bg-gradient-to-r from-[#B5179E]/40 bg-slate-600 rounded animate-pulse w-1/2" />
      </div>
    </div>
  ));
};
export default PlaylistSkeleton;
