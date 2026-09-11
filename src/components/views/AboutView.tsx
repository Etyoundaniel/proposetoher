import React from 'react';
import { RouteId } from '../../types';

interface AboutViewProps {
  onNavigate: (route: RouteId) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate }) => {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <p className="text-[11px] font-bold uppercase tracking-[.18em] text-[#a67f42]">
        About
      </p>
      <h1 className="font-display mt-4 text-3xl md:text-4xl font-bold text-[#4b101d]">
        Technology with a human sense of occasion.
      </h1>
      <p className="mt-6 max-w-3xl text-lg leading-8 text-[#4c4541] font-light">
        Propose To Her makes meaningful relationship experiences easier to discover, shape, and request. We believe the most consequential question of your life deserves calm consideration rather than chaotic logistics.
      </p>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        <article className="border-t border-[#c7a363] pt-6 bg-[#fffdf9] p-6 border-b border-x border-[#ded4c9]">
          <span className="text-xs font-bold tracking-widest text-[#a67f42]">PHILOSOPHY 01</span>
          <h2 className="font-display mt-4 text-xl font-bold text-[#4b101d]">
            Considered design
          </h2>
          <p className="mt-3 text-xs leading-6 text-[#685f5a]">
            Every environment is chosen with intent. From low-reflection architectural viewpoints to natural candle geometry, we balance aesthetics with intimate privacy.
          </p>
        </article>

        <article className="border-t border-[#c7a363] pt-6 bg-[#fffdf9] p-6 border-b border-x border-[#ded4c9]">
          <span className="text-xs font-bold tracking-widest text-[#a67f42]">PHILOSOPHY 02</span>
          <h2 className="font-display mt-4 text-xl font-bold text-[#4b101d]">
            Trusted coordination
          </h2>
          <p className="mt-3 text-xs leading-6 text-[#685f5a]">
            We operate with strict confidentiality. From discreet billing to secret on-site signals, your partner never catches wind of what is coming until the reveal.
          </p>
        </article>

        <article className="border-t border-[#c7a363] pt-6 bg-[#fffdf9] p-6 border-b border-x border-[#ded4c9]">
          <span className="text-xs font-bold tracking-widest text-[#a67f42]">PHILOSOPHY 03</span>
          <h2 className="font-display mt-4 text-xl font-bold text-[#4b101d]">
            Personal detail
          </h2>
          <p className="mt-3 text-xs leading-6 text-[#685f5a]">
            No two couples share the same song, inside joke, or milestone memory. We replace generic packages with bespoke touches that celebrate your specific journey.
          </p>
        </article>
      </div>

      <div className="mt-16 bg-[#171515] p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <h3 className="font-display text-2xl font-bold text-white">
            Plan your moment today.
          </h3>
          <p className="mt-2 text-xs text-[#d9d0ca] max-w-lg">
            Share your thoughts and let our experience curators take care of every delicate coordination detail.
          </p>
        </div>
        <button
          type="button"
          className="bg-[#c7a363] hover:bg-[#dcc083] text-[#24160d] px-6 py-3.5 text-xs font-bold uppercase tracking-wider transition cursor-pointer whitespace-nowrap"
          onClick={() => {
            onNavigate('plan');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          Start Planning
        </button>
      </div>
    </div>
  );
};
