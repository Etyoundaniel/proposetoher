import React, { useState } from 'react';
import { RouteId } from '../../types';

interface InvestorViewProps {
  onNavigate: (route: RouteId) => void;
}

export const InvestorView: React.FC<InvestorViewProps> = ({ onNavigate }) => {
  const [disclosureOpen, setDisclosureOpen] = useState(false);

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <p className="text-[11px] font-bold uppercase tracking-[.18em] text-[#a67f42]">
        Investor information
      </p>
      <h1 className="font-display mt-4 text-3xl md:text-4xl font-bold text-[#4b101d]">
        A focused platform for meaningful moments.
      </h1>
      <p className="mt-5 max-w-3xl text-sm leading-7 text-[#685f5a]">
        A concise product thesis for relationship-experience discovery and coordination. Market figures and future opportunities are illustrative unless sourced.
      </p>

      {/* 3 Investor Cards */}
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        <article className="bg-[#4b101d] p-6 text-white border border-[#4b101d] flex flex-col justify-between shadow-sm">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#d8ba78]">Problem</span>
            <h2 className="font-display text-xl font-bold mt-2 text-white">
              Customer need
            </h2>
            <p className="mt-4 text-xs leading-6 text-[#e6dad4]">
              High-intent consumers looking to stage memorable relationship milestones encounter fragmented vendor lists, opaque pricing, and substantial execution anxiety.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-white/10 text-[11px] text-[#d8ba78]">
            High average order value · Emotional retention
          </div>
        </article>

        <article className="bg-[#f0e8dd] p-6 border border-[#ded4c9] flex flex-col justify-between shadow-sm">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#a67f42]">Solution</span>
            <h2 className="font-display text-xl font-bold mt-2 text-[#4b101d]">
              Product thesis
            </h2>
            <p className="mt-4 text-xs leading-6 text-[#685f5a]">
              A focused, frictionless brief generator that translates aesthetic aspiration into actionable execution briefs, matched with vetted regional hospitality partners.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-[#ded4c9] text-[11px] text-[#4b101d] font-semibold">
            Standardized requests · Curated inventory
          </div>
        </article>

        <article className="bg-[#f0e8dd] p-6 border border-[#ded4c9] flex flex-col justify-between shadow-sm">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#a67f42]">Economics</span>
            <h2 className="font-display text-xl font-bold mt-2 text-[#4b101d]">
              Operating model
            </h2>
            <p className="mt-4 text-xs leading-6 text-[#685f5a]">
              Asset-light coordination model capturing transactional take-rates, bespoke design retainers, and premium partner listing subscriptions across premier metropolitan markets.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-[#ded4c9] text-[11px] text-[#4b101d] font-semibold">
            Scale-ready marketplace · Negative working capital
          </div>
        </article>
      </div>

      {/* Market Disclosure Accordion */}
      <div className="disclosure mt-12 border-y border-[#ded4c9]">
        <button
          type="button"
          className="flex w-full items-center justify-between py-5 text-left cursor-pointer"
          aria-expanded={disclosureOpen}
          onClick={() => setDisclosureOpen(!disclosureOpen)}
        >
          <span className="font-display text-lg font-bold text-[#4b101d]">
            Notes on market figures & expansion strategy
          </span>
          <span className="text-2xl text-[#4b101d] font-light">
            {disclosureOpen ? '−' : '+'}
          </span>
        </button>

        {disclosureOpen && (
          <p className="max-w-3xl pb-6 text-xs leading-6 text-[#685f5a] animate-in fade-in duration-150">
            Any market sizing, demand estimates, or expansion pathways shown in investor conversations should be clearly sourced or labelled illustrative. They are not guarantees of performance. yespropose operates within the high-end experiential gifting and luxury wedding-adjacent market segments.
          </p>
        )}
      </div>

      <div className="mt-10 flex items-center gap-4">
        <button
          type="button"
          className="bg-[#4b101d] hover:bg-[#26070e] text-white px-6 py-3.5 text-xs font-bold uppercase tracking-wider transition cursor-pointer"
          onClick={() => {
            onNavigate('contact');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          Contact the team
        </button>
      </div>
    </div>
  );
};
