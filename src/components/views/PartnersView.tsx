import React, { useState } from 'react';
import { RouteId, PartnerApplication } from '../../types';
import { CheckCircle2 } from 'lucide-react';

interface PartnersViewProps {
  onNavigate: (route: RouteId) => void;
}

export const PartnersView: React.FC<PartnersViewProps> = () => {
  const [businessName, setBusinessName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('');
  const [portfolio, setPortfolio] = useState('');
  const [services, setServices] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName.trim() || !contactPerson.trim() || !email.trim() || !category.trim()) {
      setErrorMessage('Please complete all required fields (Business name, Contact person, Email, and Category).');
      return;
    }

    const application: PartnerApplication = {
      businessName,
      contactPerson,
      email,
      category,
      portfolio,
      services,
      createdAt: new Date().toISOString()
    };

    try {
      const existing = JSON.parse(localStorage.getItem('yespropose_partners') || localStorage.getItem('propose_to_her_partners') || '[]');
      existing.unshift(application);
      localStorage.setItem('yespropose_partners', JSON.stringify(existing));
    } catch {
      // Ignore
    }

    setErrorMessage('');
    setIsSuccess(true);
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <p className="text-[11px] font-bold uppercase tracking-[.18em] text-[#a67f42]">
        Partner with us
      </p>
      <h1 className="font-display mt-4 text-3xl md:text-4xl font-bold text-[#4b101d]">
        Create remarkable moments together.
      </h1>
      <p className="mt-4 max-w-xl text-sm leading-7 text-[#685f5a]">
        We welcome thoughtful hospitality spaces, florists, acoustic musicians, fine dining venues, and artisanal creators who believe in intentional celebration.
      </p>

      <div className="mt-12 grid gap-8 lg:grid-cols-[.75fr_1.25fr]">
        {/* Left Side: Wine Card */}
        <aside className="bg-[#4b101d] p-8 md:p-10 text-white flex flex-col justify-between shadow-lg">
          <div>
            <h2 className="font-display text-2xl font-bold text-white">
              A curated network.
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#e8ded8] font-light">
              Bring your craft to considered, experience-led requests. We connect discerning clients who value discretion, artistry, and flawless hospitality with outstanding venues and specialists.
            </p>

            <div className="mt-8 space-y-3 text-xs text-[#d8ba78]">
              <p>• Premium client briefs with verified budgets</p>
              <p>• Dedicated single-point coordinator for all bookings</p>
              <p>• Fair, transparent partner compensation structures</p>
            </div>
          </div>

          <p className="mt-10 border-t border-white/15 pt-6 text-[11px] leading-relaxed text-[#cabeb7]">
            Applications are reviewed for quality, fit, and availability. Acceptance and bookings are subject to portfolio review and partner standards.
          </p>
        </aside>

        {/* Right Side: Form */}
        <form onSubmit={handleSubmit} className="border border-[#ded4c9] bg-[#fffdf9] p-6 sm:p-10 shadow-sm" novalidate="">
          <h2 className="font-display text-2xl font-bold text-[#4b101d]">
            Introduce your business.
          </h2>
          <p className="text-xs text-[#685f5a] mt-1 mb-6">
            Tell us about your venue, service, or creative offering.
          </p>

          {errorMessage && (
            <p className="mb-6 border-l-2 border-[#9f3533] bg-[#fff1ed] p-3 text-xs text-[#7c2725]" role="alert">
              {errorMessage}
            </p>
          )}

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#36201e]">
                Business name *
              </label>
              <input
                type="text"
                required
                className="w-full border border-[#ded4c9] bg-[#fffdf9] p-3 text-sm focus:border-[#4b101d] focus:outline-none"
                placeholder="e.g. Acacia View Rooftop"
                value={businessName}
                onChange={e => setBusinessName(e.target.value)}
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#36201e]">
                Contact person *
              </label>
              <input
                type="text"
                required
                className="w-full border border-[#ded4c9] bg-[#fffdf9] p-3 text-sm focus:border-[#4b101d] focus:outline-none"
                placeholder="Full name"
                value={contactPerson}
                onChange={e => setContactPerson(e.target.value)}
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#36201e]">
                Email address *
              </label>
              <input
                type="email"
                required
                className="w-full border border-[#ded4c9] bg-[#fffdf9] p-3 text-sm focus:border-[#4b101d] focus:outline-none"
                placeholder="contact@business.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#36201e]">
                Category *
              </label>
              <select
                required
                className="w-full border border-[#ded4c9] bg-[#fffdf9] p-3 text-sm focus:border-[#4b101d] focus:outline-none"
                value={category}
                onChange={e => setCategory(e.target.value)}
              >
                <option value="">Select category</option>
                <option value="Venue & Hospitality">Venue & Hospitality</option>
                <option value="Floristry & Botanical Styling">Floristry & Botanical Styling</option>
                <option value="Private Chef & Fine Dining">Private Chef & Fine Dining</option>
                <option value="Photography & Cinematography">Photography & Cinematography</option>
                <option value="Acoustic Music & Performance">Acoustic Music & Performance</option>
                <option value="Artisanal Gifts & Jewelry">Artisanal Gifts & Jewelry</option>
                <option value="Other Specialist">Other Specialist</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#36201e]">
                Website or portfolio link
              </label>
              <input
                type="url"
                className="w-full border border-[#ded4c9] bg-[#fffdf9] p-3 text-sm focus:border-[#4b101d] focus:outline-none"
                placeholder="https://yourportfolio.com or Instagram handle"
                value={portfolio}
                onChange={e => setPortfolio(e.target.value)}
              />
            </div>

            <div className="sm:col-span-2">
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#36201e]">
                What do you offer?
              </label>
              <textarea
                rows={3}
                className="w-full border border-[#ded4c9] bg-[#fffdf9] p-3 text-sm focus:border-[#4b101d] focus:outline-none"
                placeholder="Describe your capacity, location, styling aesthetic, or distinct services..."
                value={services}
                onChange={e => setServices(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-[#4b101d] hover:bg-[#26070e] text-white mt-8 px-6 py-3.5 text-xs font-bold uppercase tracking-wider transition cursor-pointer"
          >
            Submit application
          </button>

          {isSuccess && (
            <div className="mt-6 border-l-2 border-[#c7a363] bg-[#fbf4e6] p-4 text-xs leading-6 text-[#4b101d] animate-in fade-in duration-200 flex items-start gap-2">
              <CheckCircle2 size={16} className="text-[#a67f42] shrink-0 mt-0.5" />
              <span>
                Thank you for applying. Your partner dossier has been securely recorded. Our partner relations director will review your details and reach out.
              </span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
