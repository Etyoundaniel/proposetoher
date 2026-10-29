import React, { useState } from 'react';
import { RouteId, ContactInquiry } from '../../types';
import { CheckCircle2 } from 'lucide-react';

interface ContactViewProps {
  onNavigate: (route: RouteId) => void;
}

export const ContactView: React.FC<ContactViewProps> = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [inquiryType, setInquiryType] = useState('Plan a moment');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMessage('Please provide your name, email, and message to proceed.');
      return;
    }

    const inquiry: ContactInquiry = {
      name,
      email,
      inquiryType,
      message,
      createdAt: new Date().toISOString()
    };

    try {
      const existing = JSON.parse(localStorage.getItem('yespropose_inquiries') || localStorage.getItem('propose_to_her_inquiries') || '[]');
      existing.unshift(inquiry);
      localStorage.setItem('yespropose_inquiries', JSON.stringify(existing));
    } catch {
      // Ignore
    }

    setErrorMessage('');
    setIsSuccess(true);
  };

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <p className="text-[11px] font-bold uppercase tracking-[.18em] text-[#a67f42]">
        Contact
      </p>
      <h1 className="font-display mt-4 text-3xl md:text-4xl font-bold text-[#4b101d]">
        Start a conversation.
      </h1>
      <p className="mt-4 max-w-xl text-sm leading-7 text-[#685f5a]">
        For planning, partnerships, and strategic enquiries. All client communications are treated with utmost confidentiality.
      </p>

      {/* Direct WhatsApp Concierge Link */}
      <div className="mt-8 flex flex-wrap items-center gap-4 text-xs">
        <a
          href="https://wa.me/254735742536?text=Hello%20yespropose%2C%20I%20would%20like%20to%20inquire%20about%20a%20proposal"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1faa51] text-white px-4 py-2.5 font-bold uppercase tracking-wider text-[11px] transition shadow-xs cursor-pointer"
        >
          <span>WhatsApp Concierge: +254 735 742 536</span>
        </a>
        <span className="text-xs text-[#736966]">Direct confidential planning line</span>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 max-w-2xl border border-[#ded4c9] bg-[#fffdf9] p-6 sm:p-10 shadow-sm" noValidate>
        {errorMessage && (
          <p className="mb-6 border-l-2 border-[#9f3533] bg-[#fff1ed] p-3 text-xs text-[#7c2725]" role="alert">
            {errorMessage}
          </p>
        )}

        <div className="grid gap-5">
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#36201e]">
              Name *
            </label>
            <input
              type="text"
              required
              className="w-full border border-[#ded4c9] bg-[#fffdf9] p-3 text-sm focus:border-[#4b101d] focus:outline-none"
              placeholder="Your full name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#36201e]">
              Email *
            </label>
            <input
              type="email"
              required
              className="w-full border border-[#ded4c9] bg-[#fffdf9] p-3 text-sm focus:border-[#4b101d] focus:outline-none"
              placeholder="name@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#36201e]">
              Inquiry type
            </label>
            <select
              className="w-full border border-[#ded4c9] bg-[#fffdf9] p-3 text-sm focus:border-[#4b101d] focus:outline-none cursor-pointer"
              value={inquiryType}
              onChange={e => setInquiryType(e.target.value)}
            >
              <option value="Plan a moment">Plan a moment</option>
              <option value="Become a partner">Become a partner</option>
              <option value="Investor or strategic partnership">Investor or strategic partnership</option>
              <option value="General inquiry">General inquiry</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#36201e]">
              Message *
            </label>
            <textarea
              rows={4}
              required
              className="w-full border border-[#ded4c9] bg-[#fffdf9] p-3 text-sm focus:border-[#4b101d] focus:outline-none"
              placeholder="Tell us about your target date, location idea, or partnership intent..."
              value={message}
              onChange={e => setMessage(e.target.value)}
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-[#4b101d] hover:bg-[#26070e] text-white mt-8 px-6 py-3.5 text-xs font-bold uppercase tracking-wider transition cursor-pointer"
        >
          Send inquiry
        </button>

        {isSuccess && (
          <div className="mt-6 border-l-2 border-[#c7a363] bg-[#fbf4e6] p-4 text-xs leading-6 text-[#4b101d] animate-in fade-in duration-200 flex items-start gap-2">
            <CheckCircle2 size={16} className="text-[#a67f42] shrink-0 mt-0.5" />
            <span>
              Thank you. Your confidential inquiry has been safely received. A member of our concierge team will follow up promptly.
            </span>
          </div>
        )}
      </form>
    </div>
  );
};
