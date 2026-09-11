import React, { useState, useMemo } from 'react';
import { RouteId, Experience } from '../../types';
import { EXPERIENCES } from '../../data/experiences';

interface ExperiencesViewProps {
  onNavigate: (route: RouteId) => void;
  onSelectExperience: (id: string) => void;
}

export const ExperiencesView: React.FC<ExperiencesViewProps> = ({
  onSelectExperience
}) => {
  const [occasionFilter, setOccasionFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [styleFilter, setStyleFilter] = useState('');
  const [showAll, setShowAll] = useState(false);

  // Extract unique filter choices
  const occasions = useMemo(() => Array.from(new Set(EXPERIENCES.map(e => e.occasion))), []);
  const locations = useMemo(() => Array.from(new Set(EXPERIENCES.map(e => e.location))), []);
  const styles = useMemo(() => Array.from(new Set(EXPERIENCES.map(e => e.style))), []);

  const filtered = useMemo(() => {
    return EXPERIENCES.filter(item => {
      if (occasionFilter && item.occasion !== occasionFilter) return false;
      if (locationFilter && item.location !== locationFilter) return false;
      if (styleFilter && item.style !== styleFilter) return false;
      return true;
    });
  }, [occasionFilter, locationFilter, styleFilter]);

  const displayedExperiences = showAll ? filtered : filtered.slice(0, 6);

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <p className="text-[11px] font-bold uppercase tracking-[.18em] text-[#a67f42]">
        Experience edit
      </p>
      <h1 className="font-display mt-4 text-3xl md:text-4xl font-bold text-[#4b101d]">
        Find your starting point.
      </h1>
      <p className="mt-4 max-w-xl text-sm leading-7 text-[#685f5a]">
        A concise collection of directions to personalize. Every setting can be modified to mirror your relationship’s unique sentiment.
      </p>

      {/* Filter Toolbar */}
      <div className="mt-9 grid gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="filter-occasion-select" className="sr-only">Occasion</label>
          <select
            id="filter-occasion-select"
            className="w-full border border-[#ded4c9] bg-[#fffdf9] p-3.5 text-xs text-[#171515] uppercase tracking-wider focus:border-[#4b101d] focus:outline-none cursor-pointer"
            value={occasionFilter}
            onChange={e => setOccasionFilter(e.target.value)}
          >
            <option value="">All occasions</option>
            {occasions.map(occ => (
              <option key={occ} value={occ}>{occ}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="filter-location-select" className="sr-only">Location</label>
          <select
            id="filter-location-select"
            className="w-full border border-[#ded4c9] bg-[#fffdf9] p-3.5 text-xs text-[#171515] uppercase tracking-wider focus:border-[#4b101d] focus:outline-none cursor-pointer"
            value={locationFilter}
            onChange={e => setLocationFilter(e.target.value)}
          >
            <option value="">All locations</option>
            {locations.map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="filter-style-select" className="sr-only">Style</label>
          <select
            id="filter-style-select"
            className="w-full border border-[#ded4c9] bg-[#fffdf9] p-3.5 text-xs text-[#171515] uppercase tracking-wider focus:border-[#4b101d] focus:outline-none cursor-pointer"
            value={styleFilter}
            onChange={e => setStyleFilter(e.target.value)}
          >
            <option value="">All styles</option>
            {styles.map(sty => (
              <option key={sty} value={sty}>{sty}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Meta */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-b border-[#ded4c9] pb-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#685f5a]">
          {filtered.length} curated experience{filtered.length === 1 ? '' : 's'}
        </p>

        {(occasionFilter || locationFilter || styleFilter) && (
          <button
            type="button"
            className="text-xs text-[#a67f42] hover:underline cursor-pointer"
            onClick={() => {
              setOccasionFilter('');
              setLocationFilter('');
              setStyleFilter('');
            }}
          >
            Reset filters
          </button>
        )}
      </div>

      {/* Experience Grid */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {displayedExperiences.map(item => (
          <article
            key={item.id}
            className="flex flex-col justify-between overflow-hidden bg-[#fffdf9] border border-[#ded4c9] transition duration-300 hover:-translate-y-1 hover:shadow-xl group"
          >
            <div>
              <div className="relative h-60 w-full overflow-hidden">
                <img
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  src={item.image}
                  alt={item.title}
                />
                <div className="absolute top-3 left-3 bg-[#171515]/80 backdrop-blur-xs px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-[#d8ba78]">
                  {item.badge}
                </div>
              </div>

              <div className="p-6">
                <p className="text-[11px] font-bold uppercase tracking-[.12em] text-[#a67f42]">
                  {item.location} · {item.style}
                </p>
                <h2 className="font-display mt-3 text-xl font-bold text-[#4b101d]">
                  {item.title}
                </h2>
                <p className="mt-3 text-xs leading-relaxed text-[#685f5a]">
                  {item.description}
                </p>
              </div>
            </div>

            <div className="px-6 pb-6 pt-3 border-t border-[#f0e7dc] flex items-center justify-between">
              <span className="text-xs font-bold text-[#4b101d]">{item.price}</span>
              <button
                type="button"
                className="text-xs font-bold text-[#4b101d] underline underline-offset-4 hover:text-[#26070e] transition cursor-pointer"
                onClick={() => onSelectExperience(item.id)}
              >
                View experience
              </button>
            </div>
          </article>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-full py-16 text-center text-sm text-[#685f5a] bg-white border border-[#ded4c9]">
            <p className="font-medium text-base text-[#4b101d]">No experiences match this filter combination.</p>
            <p className="mt-2 text-xs">Try selecting a different style or clearing your location choice.</p>
            <button
              type="button"
              className="mt-5 text-xs font-bold uppercase tracking-wider text-[#4b101d] border-b border-[#4b101d] pb-0.5 cursor-pointer"
              onClick={() => {
                setOccasionFilter('');
                setLocationFilter('');
                setStyleFilter('');
              }}
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
