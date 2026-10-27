import React, { useEffect } from 'react';
import { VideoExperience } from '../types';
import { X, ChevronLeft, ChevronRight, Music } from 'lucide-react';
import { RingIcon } from './icons/RingIcon';

interface VideoModalProps {
  video: VideoExperience | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onPlanWithVideo?: (video: VideoExperience) => void;
  totalCount: number;
  currentIndex: number;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  video,
  onClose,
  onPrev,
  onNext,
  onPlanWithVideo,
  totalCount,
  currentIndex
}) => {
  useEffect(() => {
    if (!video) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') onPrev();
      else if (e.key === 'ArrowRight') onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [video, onClose, onPrev, onNext]);

  if (!video) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={video.title}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-[#141212] text-white border border-white/15 shadow-2xl flex flex-col overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Minimal Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#1a1717]">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#d8ba78]">
              {video.category === 'music' ? <Music size={12} /> : <RingIcon size={13} />}
              <span>{video.title}</span>
            </span>
            <span className="text-white/40 text-xs">·</span>
            <span className="text-xs text-white/50 font-mono">
              {currentIndex + 1}/{totalCount}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-white/70 hover:text-white p-1 transition cursor-pointer"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Video Player Box: Centered, Direct Playback */}
        <div className="relative bg-black h-[520px] sm:h-[560px] overflow-hidden flex items-center justify-center">
          <iframe
            key={video.id}
            src={video.embedUrl}
            title={video.title}
            className="w-full h-[580px] border-0 -mt-2 bg-transparent"
            scrolling="no"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
          />

          {/* Left / Right Nav Overlays */}
          <button
            type="button"
            onClick={onPrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-[#4b101d] text-white p-2 rounded-full transition shadow-lg z-20 cursor-pointer border border-white/10"
            aria-label="Previous video"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={onNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-[#4b101d] text-white p-2 rounded-full transition shadow-lg z-20 cursor-pointer border border-white/10"
            aria-label="Next video"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Minimal Controls Bar */}
        <div className="px-4 py-3 bg-[#1a1717] border-t border-white/10 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onPrev}
              className="text-xs text-white/70 hover:text-white flex items-center gap-1 cursor-pointer py-1 px-2 border border-white/15"
            >
              <ChevronLeft size={13} /> Prev
            </button>
            <button
              type="button"
              onClick={onNext}
              className="text-xs text-white/70 hover:text-white flex items-center gap-1 cursor-pointer py-1 px-2 border border-white/15"
            >
              Next <ChevronRight size={13} />
            </button>
          </div>

          {onPlanWithVideo && (
            <button
              type="button"
              onClick={() => {
                onPlanWithVideo(video);
                onClose();
              }}
              className="bg-[#c7a363] hover:bg-[#dbb877] text-[#24160d] py-1.5 px-4 text-xs font-bold uppercase tracking-wider transition cursor-pointer"
            >
              Plan with this
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
