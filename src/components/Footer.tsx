import React from 'react';
import { RouteId } from '../types';

interface FooterProps {
  onNavigate: (route: RouteId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#171515] px-6 py-10 text-[#ded6d0] border-t border-white/10">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6">
        <div>
          <p className="text-xs tracking-wide text-[#bdb5ae]">
            © Propose To Her. Plan with intention.
          </p>
          <p className="text-[11px] text-[#736966] mt-1">
            Handcrafted romantic moments, bespoke proposals & private dining experiences.
          </p>
        </div>

        <div className="flex items-center gap-6 text-xs">
          <button
            type="button"
            className="text-[#d7b878] hover:text-white transition cursor-pointer"
            onClick={() => {
              onNavigate('partners');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            Partners
          </button>
          <button
            type="button"
            className="text-[#d7b878] hover:text-white transition cursor-pointer"
            onClick={() => {
              onNavigate('investor');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            Investor
          </button>
          <button
            type="button"
            className="text-[#d7b878] hover:text-white transition cursor-pointer"
            onClick={() => {
              onNavigate('contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            Contact
          </button>
        </div>
      </div>
    </footer>
  );
};
