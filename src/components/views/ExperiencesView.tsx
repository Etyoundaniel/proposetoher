import React, { useState, useMemo } from 'react';
import { RouteId, VideoExperience } from '../../types';
import { VIDEO_EXPERIENCES } from '../../data/videoExperiences';
import { VideoPlayerCard } from '../VideoPlayerCard';
import { VideoModal } from '../VideoModal';
import { Music, Layers } from 'lucide-react';
import { RingIcon } from '../icons/RingIcon';

interface ExperiencesViewProps {
  onNavigate: (route: RouteId) => void;
  onSelectExperience: (id: string) => void;
  onCustomizeExperience?: (id: string) => void;
}

export const ExperiencesView: React.FC<ExperiencesViewProps> = ({
  onNavigate,
  onCustomizeExperience
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'proposal' | 'music'>('all');
  const [theaterVideo, setTheaterVideo] = useState<VideoExperience | null>(null);

  const filteredVideos = useMemo(() => {
    if (activeTab === 'all') return VIDEO_EXPERIENCES;
    return VIDEO_EXPERIENCES.filter(item => item.category === activeTab);
  }, [activeTab]);

  const currentModalIndex = useMemo(() => {
    if (!theaterVideo) return -1;
    return filteredVideos.findIndex(v => v.id === theaterVideo.id);
  }, [theaterVideo, filteredVideos]);

  const handlePrevModal = () => {
    if (filteredVideos.length === 0) return;
    const prevIdx = (currentModalIndex - 1 + filteredVideos.length) % filteredVideos.length;
    setTheaterVideo(filteredVideos[prevIdx]);
  };

  const handleNextModal = () => {
    if (filteredVideos.length === 0) return;
    const nextIdx = (currentModalIndex + 1) % filteredVideos.length;
    setTheaterVideo(filteredVideos[nextIdx]);
  };

  const handlePlanWithVideo = (video: VideoExperience) => {
    if (onCustomizeExperience) {
      onCustomizeExperience(video.title);
    } else {
      onNavigate('plan');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const proposalCount = VIDEO_EXPERIENCES.filter(v => v.category === 'proposal').length;
  const musicCount = VIDEO_EXPERIENCES.filter(v => v.category === 'music').length;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 md:py-12">
      {/* Crisp Header - Minimal words */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#ded4c9]">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-[#4b101d]">
            Video Experiences
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-[#685f5a]">
            Play directly on the platform. Tap any video to start.
          </p>
        </div>

        {/* Clean Filter Controls */}
        <div className="inline-flex items-center bg-[#f0e7dc] p-1 border border-[#ded4c9]">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'all'
                ? 'bg-[#4b101d] text-white shadow-xs'
                : 'text-[#5c524c] hover:text-[#171515]'
            }`}
          >
            <Layers size={12} />
            <span>All ({VIDEO_EXPERIENCES.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('proposal')}
            className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'proposal'
                ? 'bg-[#4b101d] text-white shadow-xs'
                : 'text-[#5c524c] hover:text-[#171515]'
            }`}
          >
            <RingIcon size={13} />
            <span>Proposals ({proposalCount})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('music')}
            className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'music'
                ? 'bg-[#4b101d] text-white shadow-xs'
                : 'text-[#5c524c] hover:text-[#171515]'
            }`}
          >
            <Music size={12} />
            <span>Music ({musicCount})</span>
          </button>
        </div>
      </div>

      {/* Video Grid */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredVideos.map(video => (
          <VideoPlayerCard
            key={video.id}
            video={video}
            onOpenTheater={v => setTheaterVideo(v)}
            onPlanWithVideo={handlePlanWithVideo}
          />
        ))}
      </div>

      {/* Theater View Modal */}
      {theaterVideo && (
        <VideoModal
          video={theaterVideo}
          onClose={() => setTheaterVideo(null)}
          onPrev={handlePrevModal}
          onNext={handleNextModal}
          onPlanWithVideo={handlePlanWithVideo}
          totalCount={filteredVideos.length}
          currentIndex={currentModalIndex >= 0 ? currentModalIndex : 0}
        />
      )}
    </div>
  );
};
