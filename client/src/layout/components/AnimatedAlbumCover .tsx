import React from "react";

interface AnimatedAlbumCoverProps {
  imageUrl: string;
  title: string;
  isPlaying: boolean;
}

const AnimatedAlbumCover: React.FC<AnimatedAlbumCoverProps> = ({
  imageUrl,
  title,
  isPlaying,
}) => {
  return (
    <div className="relative group w-14 h-14">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
      />

      {/* Enhanced gradient overlay */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#B5179E]/20 via-transparent to-[#7209B7]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Bottom gradient for waves */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black/40 to-transparent rounded-b-lg" />

      {/* Animated waves */}
      {isPlaying && (
        <div className="absolute bottom-1 left-0 right-0 flex items-end justify-center h-6 overflow-hidden">
          <svg viewBox="0 0 60 20" className="w-12 h-4">
            <defs>
              <linearGradient id="wave-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#B5179E" />
                <stop offset="100%" stopColor="#7209B7" />
              </linearGradient>
            </defs>
            {[0, 1, 2, 3, 4].map((i) => (
              <rect
                key={i}
                x={8 + i * 9}
                y="0"
                width="3"
                height="22"
                rx="1"
                fill="url(#wave-gradient)"
                className={`transform origin-bottom animate-wave-${i + 1}`}
                style={{
                  filter: "drop-shadow(0 0 2px rgba(181, 23, 158, 0.5))",
                }}
              >
                <animate
                  attributeName="height"
                  values="6;14;6"
                  dur="1.2s"
                  begin={`${i * 0.15}s`}
                  repeatCount="indefinite"
                />
              </rect>
            ))}
          </svg>
        </div>
      )}
    </div>
  );
};

// Add the following styles to your global CSS or Tailwind config
const style = `
  @keyframes wave-1 { 0%, 100% { transform: scaleY(0.8); } 50% { transform: scaleY(1.5); } }
  @keyframes wave-2 { 0%, 100% { transform: scaleY(0.6); } 50% { transform: scaleY(1.3); } }
  @keyframes wave-3 { 0%, 100% { transform: scaleY(1.0); } 50% { transform: scaleY(1.8); } }
  @keyframes wave-4 { 0%, 100% { transform: scaleY(0.7); } 50% { transform: scaleY(1.4); } }
  @keyframes wave-5 { 0%, 100% { transform: scaleY(0.9); } 50% { transform: scaleY(1.6); } }

  .animate-wave-1 { animation: wave-1 1.2s ease-in-out infinite; }
  .animate-wave-2 { animation: wave-2 1.2s ease-in-out infinite; }
  .animate-wave-3 { animation: wave-3 1.2s ease-in-out infinite; }
  .animate-wave-4 { animation: wave-4 1.2s ease-in-out infinite; }
  .animate-wave-5 { animation: wave-5 1.2s ease-in-out infinite; }
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = style;
document.head.appendChild(styleSheet);

export default AnimatedAlbumCover;
