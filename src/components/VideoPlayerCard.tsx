import React, { useState } from 'react';
import { VideoExperience } from '../types';
import { Maximize2, Music, Play } from 'lucide-react';
import { RingIcon } from './icons/RingIcon';

interface VideoPlayerCardProps {
  video: VideoExperience;
  onOpenTheater: (video: VideoExperience) => void;
  onPlanWithVideo?: (video: VideoExperience) => void;
  autoPlayOnMount?: boolean;
}

export const VideoPlayerCard: React.FC<VideoPlayerCardProps> = ({
  video,
  onOpenTheater,
  onPlanWithVideo,
  autoPlayOnMount = false
}) => {
  const [isPlaying, setIsPlaying] = useState(autoPlayOnMount);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  return (
    <article
      className="flex flex-col bg-[#fffdf9] border border-[#ded4c9] overflow-hidden shadow-xs hover:shadow-md transition group/card"
      onMouseEnter={() => {
        if (!isPlaying) setIsPlaying(true);
      }}
    >
      {/* Minimal Top Header: Just title and category with Ring icon for proposals */}
      <div className="px-4 py-2.5 bg-[#fbf8f3] border-b border-[#f0e8dc] flex items-center justify-between gap-2">
        <h3 className="font-display text-sm md:text-base font-bold text-[#4b101d] truncate">
          {video.title}
        </h3>
        <span className="flex items-center gap-1.5 text-[11px] font-semibold text-[#a67f42] uppercase tracking-wider shrink-0">
          {video.category === 'music' ? (
            <>
              <Music size={12} />
              <span>Music</span>
            </>
          ) : (
            <>
              <RingIcon size={13} className="text-[#a67f42]" />
              <span>Proposal</span>
            </>
          )}
        </span>
      </div>

      {/* Video Container: Plays automatically on cursor hover or click */}
      <div
        className="relative w-full bg-black overflow-hidden h-[420px] sm:h-[450px]"
        onMouseEnter={() => {
          if (!isPlaying) setIsPlaying(true);
        }}
      >
        {isPlaying ? (
          <>
            {!iframeLoaded && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#1a1717] text-white/70 z-0">
                <div className="w-8 h-8 border-2 border-[#c7a363] border-t-transparent rounded-full animate-spin mb-2" />
                <span className="text-[11px] text-[#d8ba78]">Loading player...</span>
              </div>
            )}

            <iframe
              src={video.embedUrl}
              title={video.title}
              className="relative z-10 w-full h-[470px] border-0 -mt-1 bg-transparent"
              scrolling="no"
              allowFullScreen
              onLoad={() => setIframeLoaded(true)}
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
            />
          </>
        ) : (
          <div
            className="group relative w-full h-full cursor-pointer overflow-hidden"
            onClick={() => setIsPlaying(true)}
          >
            {/* Poster Image */}
            <img
              src={video.poster || 'https://images.pexels.com/photos/2287523/pexels-photo-2287523.jpeg?auto=compress&cs=tinysrgb&w=800'}
              alt={video.title}
              className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
            />
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 transition" />

            {/* Hover-to-play icon */}
            <div className="absolute inset-0 flex items-center justify-center text-white">
              <div className="w-13 h-13 rounded-full bg-[#4b101d]/90 text-white flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:bg-[#c7a363] group-hover:text-[#171515] transition duration-300 border border-white/20">
                <Play size={20} className="ml-0.5" fill="currentColor" />
              </div>
            </div>
          </div>
        )}

        {/* Theater Overlay Button */}
        <button
          type="button"
          onClick={() => onOpenTheater(video)}
          title="Theater View"
          className="absolute top-2.5 right-2.5 z-20 flex items-center gap-1 bg-black/75 hover:bg-[#4b101d] text-white text-[11px] font-medium px-2.5 py-1 transition cursor-pointer shadow border border-white/10"
        >
          <Maximize2 size={12} />
          <span>Theater</span>
        </button>
      </div>

      {/* Minimal Action Footer */}
      <div className="px-4 py-2.5 bg-[#fffdf9] border-t border-[#f0e8dc] flex items-center justify-between">
        <button
          type="button"
          onClick={() => onOpenTheater(video)}
          className="text-xs font-semibold text-[#4b101d] hover:text-[#26070e] cursor-pointer"
        >
          Theater view
        </button>

        {onPlanWithVideo && (
          <button
            type="button"
            onClick={() => onPlanWithVideo(video)}
            className="bg-[#4b101d] hover:bg-[#340711] text-white px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition cursor-pointer"
          >
            Plan this
          </button>
        )}
      </div>
    </article>
  );
};
