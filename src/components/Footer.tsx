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
          <div className="inline-flex items-center mb-3">
            <img
              src="/assets/aistudio/DYxTd-removebg-preview_f13f5fbb.png"
              alt="yespropose logo"
              className="h-10 sm:h-12 w-auto object-contain drop-shadow-[0_1px_8px_rgba(255,255,255,0.18)]"
            />
          </div>
          <p className="text-xs tracking-wide text-[#bdb5ae]">
            © yespropose. Plan with intention.
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
          <a
            href="https://wa.me/254735742536?text=Hello%20yespropose%2C%20I%20would%20like%20to%20plan%20a%20moment"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#25D366] hover:text-[#5ce48f] transition font-medium"
          >
            WhatsApp (+254 735 742 536)
          </a>
        </div>
      </div>
    </footer>
  );
};
