import React, { useState } from 'react';
import { RouteId } from '../../types';
import { FAQS } from '../../data/experiences';
import { ArrowRight } from 'lucide-react';

interface HowItWorksViewProps {
  onNavigate: (route: RouteId) => void;
}

export const HowItWorksView: React.FC<HowItWorksViewProps> = ({ onNavigate }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(prev => (prev === index ? null : index));
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <p className="text-[11px] font-bold uppercase tracking-[.18em] text-[#a67f42]">
        How it works
      </p>
      <h1 className="font-display mt-4 text-3xl md:text-4xl font-bold text-[#4b101d]">
        Less coordination. More intention.
      </h1>
      <p className="mt-4 max-w-xl text-sm leading-7 text-[#685f5a]">
        We replace fragmented messaging, guesswork, and venue confusion with a single, deeply considered collaborative planning path.
      </p>

      {/* 3 Step Process */}
      <div className="mt-14 grid gap-8 md:grid-cols-3">
        <article className="border-t border-[#c7a363] pt-5">
          <span className="text-xs font-bold tracking-[.16em] text-[#a67f42]">01</span>
          <h2 className="font-display mt-4 text-xl font-bold text-[#4b101d]">
            Share the brief
          </h2>
          <p className="mt-3 text-sm leading-6 text-[#685f5a]">
            Tell us the occasion, setting, budget, and style. Select your preferred date, surprise constraints, and your partner’s aesthetic sensibilities.
          </p>
        </article>

        <article className="border-t border-[#c7a363] pt-5">
          <span className="text-xs font-bold tracking-[.16em] text-[#a67f42]">02</span>
          <h2 className="font-display mt-4 text-xl font-bold text-[#4b101d]">
            Refine the direction
          </h2>
          <p className="mt-3 text-sm leading-6 text-[#685f5a]">
            A dedicated planner reviews what is possible for your request. We verify private terrace availability, floral seasons, and culinary pairings.
          </p>
        </article>

        <article className="border-t border-[#c7a363] pt-5">
          <span className="text-xs font-bold tracking-[.16em] text-[#a67f42]">03</span>
          <h2 className="font-display mt-4 text-xl font-bold text-[#4b101d]">
            Make the moment
          </h2>
          <p className="mt-3 text-sm leading-6 text-[#685f5a]">
            Confirm the final details with confidence. On the day, every vendor, cue, and musical moment operates smoothly in the background.
          </p>
        </article>
      </div>

      {/* FAQs Section */}
      <div className="mt-20 max-w-3xl border-t border-[#ded4c9] pt-12">
        <h2 className="font-display text-2xl font-bold text-[#4b101d]">
          A few answers.
        </h2>
        <p className="text-xs text-[#685f5a] mt-1">
          Common questions about confidentiality, timing, and personalization.
        </p>

        <div className="mt-8 border-t border-[#ded4c9] divide-y divide-[#ded4c9]">
          {FAQS.map((faq, index) => (
            <div key={index} className="py-2">
              <button
                type="button"
                className="flex w-full items-center justify-between py-4 text-left font-bold text-sm text-[#4b101d] hover:text-[#26070e] transition cursor-pointer"
                onClick={() => toggleFaq(index)}
                aria-expanded={openFaq === index}
              >
                <span>{faq.question}</span>
                <span className="text-xl font-normal text-[#a67f42] transition-transform duration-200">
                  {openFaq === index ? '−' : '+'}
                </span>
              </button>

              {openFaq === index && (
                <p className="max-w-3xl pb-5 text-sm leading-7 text-[#685f5a] animate-in fade-in duration-150">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 bg-[#fffdf9] border border-[#ded4c9] p-8 flex flex-wrap items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-lg font-bold text-[#4b101d]">
              Ready to begin your planning?
            </h3>
            <p className="text-xs text-[#685f5a] mt-1">
              It takes just two minutes to compile your confidential request.
            </p>
          </div>
          <button
            type="button"
            className="bg-[#4b101d] hover:bg-[#26070e] text-white px-6 py-3 text-xs font-bold uppercase tracking-wider transition cursor-pointer"
            onClick={() => {
              onNavigate('plan');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            Start Planning
          </button>
        </div>
      </div>
    </div>
  );
};
