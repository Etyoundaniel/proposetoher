import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { RouteId } from '../types';

interface NavbarProps {
  currentRoute: RouteId;
  onNavigate: (route: RouteId) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentRoute, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);

  const handleNav = (route: RouteId) => {
    onNavigate(route);
    setMobileMenuOpen(false);
    setMoreDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#171515]/95 backdrop-blur">
      <nav aria-label="Primary navigation" className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <button
          type="button"
          className="text-left text-white cursor-pointer group"
          onClick={() => handleNav('home')}
          aria-label="Go to home"
        >
          <span className="font-display block text-sm tracking-[.18em] font-bold text-white transition group-hover:text-[#d8ba78]">
            YESPROPOSE
          </span>
          <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[.17em] text-[#bdb5ae]">
            A considered way to plan the moment.
          </span>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-7">
          <button
            type="button"
            className={`text-[11px] font-bold uppercase tracking-[.14em] transition cursor-pointer ${
              currentRoute === 'plan' ? 'text-[#c7a363]' : 'text-[#d9d1cb] hover:text-[#c7a363]'
            }`}
            onClick={() => handleNav('plan')}
          >
            Plan
          </button>
          <button
            type="button"
            className={`text-[11px] font-bold uppercase tracking-[.14em] transition cursor-pointer ${
              currentRoute === 'experiences' ? 'text-[#c7a363]' : 'text-[#d9d1cb] hover:text-[#c7a363]'
            }`}
            onClick={() => handleNav('experiences')}
          >
            Experiences
          </button>
          <button
            type="button"
            className={`text-[11px] font-bold uppercase tracking-[.14em] transition cursor-pointer ${
              currentRoute === 'how' ? 'text-[#c7a363]' : 'text-[#d9d1cb] hover:text-[#c7a363]'
            }`}
            onClick={() => handleNav('how')}
          >
            How it works
          </button>

          {/* More dropdown */}
          <div className="relative">
            <button
              type="button"
              className="text-[11px] font-bold uppercase tracking-[.14em] text-[#d9d1cb] hover:text-[#c7a363] transition flex items-center gap-1 cursor-pointer"
              onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
              onBlur={() => setTimeout(() => setMoreDropdownOpen(false), 200)}
              aria-expanded={moreDropdownOpen}
            >
              More
              <span className="text-[9px] opacity-70">▾</span>
            </button>

            {moreDropdownOpen && (
              <div className="absolute right-0 top-8 w-48 border border-white/10 bg-[#211c1d] p-2 shadow-2xl z-50">
                <button
                  type="button"
                  className="block w-full px-3 py-2 text-left text-xs text-white hover:bg-white/10 transition cursor-pointer"
                  onClick={() => handleNav('partners')}
                >
                  Partner with us
                </button>
                <button
                  type="button"
                  className="block w-full px-3 py-2 text-left text-xs text-white hover:bg-white/10 transition cursor-pointer"
                  onClick={() => handleNav('about')}
                >
                  About
                </button>
                <button
                  type="button"
                  className="block w-full px-3 py-2 text-left text-xs text-white hover:bg-white/10 transition cursor-pointer"
                  onClick={() => handleNav('investor')}
                >
                  Investor
                </button>
                <button
                  type="button"
                  className="block w-full px-3 py-2 text-left text-xs text-white hover:bg-white/10 transition cursor-pointer"
                  onClick={() => handleNav('contact')}
                >
                  Contact
                </button>
              </div>
            )}
          </div>

          <button
            type="button"
            className="bg-[#c7a363] hover:bg-[#dcc083] text-[#24160d] px-4 py-2 text-xs font-bold uppercase tracking-wider transition transform hover:-translate-y-0.5 cursor-pointer shadow-sm"
            onClick={() => handleNav('plan')}
          >
            Start Planning
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          className="md:hidden flex h-10 w-10 items-center justify-center text-white focus:outline-none cursor-pointer"
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#171515] px-6 py-4 space-y-1 animate-in fade-in slide-in-from-top-2 duration-200">
          <button
            type="button"
            className="block w-full py-2.5 text-left text-sm font-semibold text-[#c7a363]"
            onClick={() => handleNav('plan')}
          >
            Start Planning
          </button>
          <button
            type="button"
            className="block w-full py-2.5 text-left text-sm text-[#e8e1db] hover:text-white"
            onClick={() => handleNav('experiences')}
          >
            Experiences
          </button>
          <button
            type="button"
            className="block w-full py-2.5 text-left text-sm text-[#e8e1db] hover:text-white"
            onClick={() => handleNav('how')}
          >
            How it works
          </button>
          <button
            type="button"
            className="block w-full py-2.5 text-left text-sm text-[#e8e1db] hover:text-white"
            onClick={() => handleNav('partners')}
          >
            Partner with us
          </button>
          <button
            type="button"
            className="block w-full py-2.5 text-left text-sm text-[#e8e1db] hover:text-white"
            onClick={() => handleNav('about')}
          >
            About
          </button>
          <button
            type="button"
            className="block w-full py-2.5 text-left text-sm text-[#e8e1db] hover:text-white"
            onClick={() => handleNav('investor')}
          >
            Investor
          </button>
          <button
            type="button"
            className="block w-full py-2.5 text-left text-sm text-[#e8e1db] hover:text-white"
            onClick={() => handleNav('contact')}
          >
            Contact
          </button>
        </div>
      )}
    </header>
  );
};
