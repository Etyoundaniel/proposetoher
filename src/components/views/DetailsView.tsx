import React, { useState } from 'react';
import { RouteId, Experience } from '../../types';
import { ArrowLeft, Check, ChevronDown, ChevronUp } from 'lucide-react';

interface DetailsViewProps {
  experience: Experience;
  onNavigate: (route: RouteId) => void;
  onCustomizeExperience: (id: string) => void;
}

export const DetailsView: React.FC<DetailsViewProps> = ({
  experience,
  onNavigate,
  onCustomizeExperience
}) => {
  const [disclosureOpen, setDisclosureOpen] = useState(true);

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <button
        type="button"
        className="text-xs font-bold uppercase tracking-wider text-[#4b101d] underline underline-offset-4 hover:text-[#26070e] transition flex items-center gap-1.5 cursor-pointer"
        onClick={() => onNavigate('experiences')}
      >
        <ArrowLeft size={14} /> Back to experiences
      </button>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.05fr_.95fr] border border-[#ded4c9] bg-[#fffdf9] shadow-xl overflow-hidden">
        {/* Left Wine Card */}
        <div className="bg-[#4b101d] p-8 md:p-12 text-white flex flex-col justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[.18em] text-[#d8ba78]">
              {experience.location} · {experience.style}
            </p>
            <h1 className="font-display mt-5 text-3xl sm:text-4xl font-bold leading-snug text-white">
              {experience.title}
            </h1>
            <p className="mt-6 text-xl font-bold text-[#e1c381]">
              {experience.price}
            </p>
            <p className="mt-2 text-xs text-[#d8ba78] font-light">
              Occasion context: {experience.occasion}
            </p>
          </div>

          <div className="mt-8 border-t border-white/15 pt-6">
            <img
              src={experience.image}
              alt={experience.title}
              className="h-56 w-full object-cover border border-white/10 shadow-md"
            />
          </div>
        </div>

        {/* Right Info Section */}
        <div className="p-8 md:p-10 flex flex-col justify-between">
          <div>
            <h2 className="font-display text-xl font-bold text-[#4b101d]">
              Overview & Atmosphere
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#514946]">
              {experience.description}
            </p>

            {/* Highlights */}
            {experience.highlights && (
              <div className="mt-6 space-y-2 border-t border-[#ded4c9] pt-5">
                <p className="text-xs font-bold uppercase tracking-wider text-[#a67f42]">
                  Key Highlights
                </p>
                <ul className="space-y-2 mt-3">
                  {experience.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-[#685f5a]">
                      <span className="text-[#a67f42] mt-0.5">•</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Inclusions Disclosure */}
            <div className="mt-7 border-y border-[#ded4c9]">
              <button
                type="button"
                className="flex w-full items-center justify-between py-4 text-left font-bold text-xs uppercase tracking-wider text-[#4b101d] cursor-pointer"
                onClick={() => setDisclosureOpen(!disclosureOpen)}
                aria-expanded={disclosureOpen}
              >
                <span>What is included</span>
                <span className="text-lg font-normal text-[#4b101d]">
                  {disclosureOpen ? '−' : '+'}
                </span>
              </button>

              {disclosureOpen && (
                <div className="pb-5 text-xs leading-6 text-[#685f5a] animate-in fade-in duration-200">
                  <p>{experience.included}</p>
                  <p className="mt-2 text-[11px] text-[#8b807b] italic">
                    Note: Final bespoke options, floral arrangements, and exact venue scheduling are confirmed following detailed review.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-[#ded4c9]">
            <button
              type="button"
              className="bg-[#4b101d] hover:bg-[#26070e] text-white w-full py-4 text-xs font-bold uppercase tracking-wider transition cursor-pointer shadow-md"
              onClick={() => onCustomizeExperience(experience.id)}
            >
              Start planning this moment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
