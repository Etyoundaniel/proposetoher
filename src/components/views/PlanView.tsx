import React, { useState, useEffect } from 'react';
import { RouteId, PlanningBrief } from '../../types';
import { OCCASIONS, LOCATIONS, BUDGET_RANGES, STYLES } from '../../data/experiences';
import { CheckCircle, ArrowLeft, ArrowRight, Printer } from 'lucide-react';

interface PlanViewProps {
  onNavigate: (route: RouteId) => void;
  selectedExperienceName?: string;
  initialBudgetVal?: number;
}

const NOTIFICATION_EMAIL = 'danietyoun@gmail.com';
const DEFAULT_FORMCARRY_URL = 'https://formcarry.com/s/danietyoun';

export const PlanView: React.FC<PlanViewProps> = ({
  onNavigate,
  selectedExperienceName,
  initialBudgetVal
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [occasion, setOccasion] = useState(selectedExperienceName ? 'Marriage proposal' : '');
  const [location, setLocation] = useState('');
  const [budget, setBudget] = useState(
    initialBudgetVal ? (initialBudgetVal >= 100000 ? 'KSh 100,000+' : initialBudgetVal >= 50000 ? 'KSh 50,000–100,000' : 'KSh 25,000–50,000') : ''
  );
  const [style, setStyle] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [partnerPreferences, setPartnerPreferences] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedBrief, setSubmittedBrief] = useState<PlanningBrief | null>(null);

  // Reference & Formcarry background endpoint
  const [refNumber, setRefNumber] = useState('');
  const [formcarryEndpoint] = useState<string>(() => {
    return localStorage.getItem('yespropose_formcarry_endpoint') || ((import.meta as unknown as { env: Record<string, string> }).env?.VITE_FORMCARRY_ENDPOINT) || DEFAULT_FORMCARRY_URL;
  });

  useEffect(() => {
    if (selectedExperienceName) {
      if (selectedExperienceName.toLowerCase().includes('rooftop')) setStyle('Rooftop');
      else if (selectedExperienceName.toLowerCase().includes('dinner')) setStyle('Private dinner');
      else if (selectedExperienceName.toLowerCase().includes('sunset')) setStyle('Outdoor');
      else if (selectedExperienceName.toLowerCase().includes('beach')) setStyle('Intimate');
    }
  }, [selectedExperienceName]);

  const validateStep = (): boolean => {
    setErrorMessage('');
    if (currentStep === 1 && !occasion) {
      setErrorMessage('Please choose an occasion to continue.');
      return false;
    }
    if (currentStep === 2 && !location) {
      setErrorMessage('Please choose a location to continue.');
      return false;
    }
    if (currentStep === 3 && !budget) {
      setErrorMessage('Please choose a budget range to continue.');
      return false;
    }
    if (currentStep === 4 && !style) {
      setErrorMessage('Please choose a mood or style to continue.');
      return false;
    }
    if (currentStep === 5) {
      if (!name.trim()) {
        setErrorMessage('Please provide your name so a planner can address you.');
        return false;
      }
      if (!email.trim() || !email.includes('@')) {
        setErrorMessage('Please provide a valid email address.');
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep(prev => Math.min(prev + 1, 6));
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setErrorMessage('');
    setCurrentStep(prev => Math.max(prev - 1, 1));
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  // Dispatch all printed brief details to Formcarry quietly in background
  const dispatchToFormcarry = async (brief: PlanningBrief, ref: string) => {
    const targetUrl = formcarryEndpoint || DEFAULT_FORMCARRY_URL;
    const timestamp = new Date().toLocaleString();

    const formattedPrintout = `
=============================================
          YESPROPOSE PLANNING BRIEF
=============================================
Reference Code: ${ref}
Timestamp: ${timestamp}
Notification Recipient: ${NOTIFICATION_EMAIL}

CLIENT CONTACT:
- Full Name: ${brief.name}
- Email: ${brief.email}
- Phone: ${brief.phone || 'Not provided'}

MOMENT SPECIFICATIONS:
- Occasion: ${brief.occasion}
- Location: ${brief.location}
- Budget Target: ${brief.budget}
- Mood / Style: ${brief.style}
- Preferred Date: ${brief.preferredDate || 'Flexible'}
- Preferred Time: ${brief.preferredTime || 'Flexible'}

PRIVATE NOTES & PREFERENCES:
- Partner Preferences: ${brief.partnerPreferences || 'None'}
- Special Requests: ${brief.specialRequests || 'None'}
=============================================
Notification dispatched to ${NOTIFICATION_EMAIL} via Formcarry.
`;

    const payload = {
      _to: NOTIFICATION_EMAIL,
      notification_email: NOTIFICATION_EMAIL,
      recipient: NOTIFICATION_EMAIL,
      _replyto: brief.email,
      _subject: `New yespropose Brief [#${ref}] - ${brief.occasion} for ${brief.name}`,
      name: brief.name,
      email: brief.email,
      phone: brief.phone || 'N/A',
      occasion: brief.occasion,
      location: brief.location,
      budget: brief.budget,
      style: brief.style,
      preferred_date: brief.preferredDate || 'Flexible',
      preferred_time: brief.preferredTime || 'Flexible',
      partner_preferences: brief.partnerPreferences || 'None',
      special_requests: brief.specialRequests || 'None',
      reference_number: ref,
      printed_brief_details: formattedPrintout,
      submitted_at: timestamp
    };

    try {
      await fetch(targetUrl, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
    } catch {
      // Background silent transmission
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep()) return;

    const generatedRef = `YP-${Math.floor(100000 + Math.random() * 900000)}`;
    setRefNumber(generatedRef);

    const newBrief: PlanningBrief = {
      id: generatedRef,
      occasion,
      location,
      budget,
      style,
      experience: selectedExperienceName || 'Custom brief',
      preferredDate: preferredDate || 'To be determined',
      preferredTime: preferredTime || 'Flexible',
      partnerPreferences,
      specialRequests,
      name,
      email,
      phone,
      createdAt: new Date().toISOString()
    };

    // Save to local storage
    try {
      const existing = JSON.parse(localStorage.getItem('yespropose_briefs') || localStorage.getItem('propose_to_her_briefs') || '[]');
      existing.unshift(newBrief);
      localStorage.setItem('yespropose_briefs', JSON.stringify(existing));
    } catch {
      // Ignore local storage quota errors
    }

    setSubmittedBrief(newBrief);
    setIsSubmitted(true);
    window.scrollTo({ top: 80, behavior: 'smooth' });

    // Instantly transmit all details to Formcarry with danietyoun@gmail.com
    dispatchToFormcarry(newBrief, generatedRef);
  };

  const steps = [
    { num: 1, label: 'Occasion' },
    { num: 2, label: 'Location' },
    { num: 3, label: 'Budget' },
    { num: 4, label: 'Style' },
    { num: 5, label: 'Details' },
    { num: 6, label: 'Review' },
  ];

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <p className="text-[11px] font-bold uppercase tracking-[.18em] text-[#a67f42]">
        Plan your moment
      </p>
      <h1 className="font-display mt-4 text-3xl md:text-4xl font-bold text-[#4b101d]">
        A few thoughtful choices.
      </h1>
      <p className="mt-4 max-w-xl text-sm leading-7 text-[#685f5a]">
        Share the essentials. We will take it from there. Every detail is handled with absolute discretion.
      </p>

      {/* Progress Indicators */}
      {!isSubmitted && (
        <div className="mt-10 flex items-center gap-2 overflow-x-auto pb-4">
          {steps.map((s, index) => (
            <React.Fragment key={s.num}>
              <div className="shrink-0 text-center flex flex-col items-center">
                <div
                  className={`grid place-items-center w-7 h-7 rounded-full text-[10px] font-bold transition duration-200 ${
                    s.num === currentStep
                      ? 'bg-[#4b101d] text-white border border-[#4b101d]'
                      : s.num < currentStep
                      ? 'bg-[#4b101d] text-white'
                      : 'border border-[#cfc2b7] text-[#7c716b] bg-[#fffdf9]'
                  }`}
                >
                  0{s.num}
                </div>
                <span className="mt-2 block text-[9px] font-bold uppercase tracking-wider text-[#7c716b]">
                  {s.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`h-px min-w-8 flex-1 transition duration-200 ${
                    s.num < currentStep ? 'bg-[#4b101d]' : 'bg-[#dbd0c7]'
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      )}

      {/* Error Alert */}
      {errorMessage && (
        <div className="mt-6 border-l-2 border-[#9f3533] bg-[#fff1ed] p-4 text-xs font-semibold text-[#7c2725] animate-in fade-in duration-150">
          {errorMessage}
        </div>
      )}

      {/* Form Container */}
      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="mt-8 border border-[#ded4c9] bg-[#fffdf9] p-6 sm:p-10 shadow-sm">
          {/* Step 1: Occasion */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="font-display text-2xl font-bold text-[#4b101d]">
                  What are you planning?
                </h2>
                <p className="text-xs text-[#736966] mt-1">
                  Select the milestone we are curating.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 pt-2">
                {OCCASIONS.map(occ => (
                  <button
                    key={occ}
                    type="button"
                    className={`p-4 text-left text-sm font-semibold border transition cursor-pointer ${
                      occasion === occ
                        ? 'border-[#4b101d] bg-[#4b101d] text-white'
                        : 'border-[#ded4c9] bg-[#fffdf9] text-[#171515] hover:border-[#4b101d]'
                    }`}
                    onClick={() => {
                      setOccasion(occ);
                      setErrorMessage('');
                    }}
                  >
                    {occ}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Location */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="font-display text-2xl font-bold text-[#4b101d]">
                  Where should it happen?
                </h2>
                <p className="text-xs text-[#736966] mt-1">
                  Choose your destination or select custom destination.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 pt-2">
                {LOCATIONS.map(loc => (
                  <button
                    key={loc}
                    type="button"
                    className={`p-4 text-left text-sm font-semibold border transition cursor-pointer ${
                      location === loc
                        ? 'border-[#4b101d] bg-[#4b101d] text-white'
                        : 'border-[#ded4c9] bg-[#fffdf9] text-[#171515] hover:border-[#4b101d]'
                    }`}
                    onClick={() => {
                      setLocation(loc);
                      setErrorMessage('');
                    }}
                  >
                    {loc}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Budget */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="font-display text-2xl font-bold text-[#4b101d]">
                  What range feels right?
                </h2>
                <p className="text-xs text-[#736966] mt-1">
                  This helps our planners balance venue exclusivity and styling scope.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 pt-2">
                {BUDGET_RANGES.map(b => (
                  <button
                    key={b}
                    type="button"
                    className={`p-4 text-left text-sm font-semibold border transition cursor-pointer ${
                      budget === b
                        ? 'border-[#4b101d] bg-[#4b101d] text-white'
                        : 'border-[#ded4c9] bg-[#fffdf9] text-[#171515] hover:border-[#4b101d]'
                    }`}
                    onClick={() => {
                      setBudget(b);
                      setErrorMessage('');
                    }}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Style */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="font-display text-2xl font-bold text-[#4b101d]">
                  What is the mood?
                </h2>
                <p className="text-xs text-[#736966] mt-1">
                  Select the aesthetic that resonates with your partner’s style.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 pt-2">
                {STYLES.map(s => (
                  <button
                    key={s}
                    type="button"
                    className={`p-4 text-left text-sm font-semibold border transition cursor-pointer ${
                      style === s
                        ? 'border-[#4b101d] bg-[#4b101d] text-white'
                        : 'border-[#ded4c9] bg-[#fffdf9] text-[#171515] hover:border-[#4b101d]'
                    }`}
                    onClick={() => {
                      setStyle(s);
                      setErrorMessage('');
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 5: Details */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div>
                <h2 className="font-display text-2xl font-bold text-[#4b101d]">
                  A few final details.
                </h2>
                <p className="text-xs text-[#736966] mt-1">
                  Help us understand your preferred timing and confidential contact.
                </p>
              </div>
              <div className="grid gap-5 sm:grid-cols-2 pt-2">
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#36201e]">
                    Preferred date
                  </label>
                  <input
                    type="date"
                    className="w-full border border-[#ded4c9] bg-[#fffdf9] p-3 text-sm focus:border-[#4b101d] focus:outline-none"
                    value={preferredDate}
                    onChange={e => setPreferredDate(e.target.value)}
                  />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#36201e]">
                    Preferred time
                  </label>
                  <input
                    type="time"
                    className="w-full border border-[#ded4c9] bg-[#fffdf9] p-3 text-sm focus:border-[#4b101d] focus:outline-none"
                    value={preferredTime}
                    onChange={e => setPreferredTime(e.target.value)}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#36201e]">
                    Their preferences (colors, flowers, favorite music)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Loves white roses, classical strings, hates large crowds, prefers low candlelight..."
                    className="w-full border border-[#ded4c9] bg-[#fffdf9] p-3 text-sm focus:border-[#4b101d] focus:outline-none"
                    value={partnerPreferences}
                    onChange={e => setPartnerPreferences(e.target.value)}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#36201e]">
                    Anything else to know? (e.g. photographer, secret signals)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Need hidden photographer with zoom lens, surprise arrival under the pretense of a work dinner..."
                    className="w-full border border-[#ded4c9] bg-[#fffdf9] p-3 text-sm focus:border-[#4b101d] focus:outline-none"
                    value={specialRequests}
                    onChange={e => setSpecialRequests(e.target.value)}
                  />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#36201e]">
                    Your name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Full name"
                    className="w-full border border-[#ded4c9] bg-[#fffdf9] p-3 text-sm focus:border-[#4b101d] focus:outline-none"
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#36201e]">
                    Email (for private brief) *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="youremail@example.com"
                    className="w-full border border-[#ded4c9] bg-[#fffdf9] p-3 text-sm focus:border-[#4b101d] focus:outline-none"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#36201e]">
                    Phone (WhatsApp preferred for discrete updates)
                  </label>
                  <input
                    type="tel"
                    placeholder="+254 700 000 000"
                    className="w-full border border-[#ded4c9] bg-[#fffdf9] p-3 text-sm focus:border-[#4b101d] focus:outline-none"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 6: Review */}
          {currentStep === 6 && (
            <div className="space-y-6">
              <div>
                <h2 className="font-display text-2xl font-bold text-[#4b101d]">
                  Review your brief.
                </h2>
                <p className="text-xs text-[#736966] mt-1">
                  Confirm your priorities before transmitting to our planning team.
                </p>
              </div>

              <div className="mt-6 border-t border-[#ded4c9] divide-y divide-[#e7ded6] text-sm">
                <div className="flex justify-between py-3">
                  <strong className="text-[#36201e]">Occasion</strong>
                  <span className="text-right text-[#685f5a] font-medium">{occasion}</span>
                </div>
                <div className="flex justify-between py-3">
                  <strong className="text-[#36201e]">Location</strong>
                  <span className="text-right text-[#685f5a] font-medium">{location}</span>
                </div>
                <div className="flex justify-between py-3">
                  <strong className="text-[#36201e]">Budget range</strong>
                  <span className="text-right text-[#685f5a] font-medium">{budget}</span>
                </div>
                <div className="flex justify-between py-3">
                  <strong className="text-[#36201e]">Mood / Style</strong>
                  <span className="text-right text-[#685f5a] font-medium">{style}</span>
                </div>
                <div className="flex justify-between py-3">
                  <strong className="text-[#36201e]">Date & Time</strong>
                  <span className="text-right text-[#685f5a] font-medium">
                    {preferredDate || 'Flexible'} {preferredTime ? `at ${preferredTime}` : ''}
                  </span>
                </div>
                <div className="flex justify-between py-3">
                  <strong className="text-[#36201e]">Contact</strong>
                  <span className="text-right text-[#685f5a] font-medium">
                    {name} ({email})
                  </span>
                </div>
              </div>

              <p className="mt-6 border-l-2 border-[#c7a363] bg-[#f7f0e6] p-4 text-xs sm:text-sm leading-6 text-[#4b101d]">
                <strong>Important note:</strong> This is a request. Venue availability, exact floral arrangements, and final pricing are confirmed after comprehensive review by our event director.
              </p>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="mt-10 flex items-center justify-between border-t border-[#e4ddd5] pt-6">
            {currentStep > 1 ? (
              <button
                type="button"
                className="border border-[#bcaea4] bg-[#fffdf9] px-5 py-3 text-xs font-bold uppercase tracking-wider text-[#4b101d] hover:bg-[#fbf7ef] transition cursor-pointer flex items-center gap-1.5"
                onClick={handleBack}
              >
                <ArrowLeft size={14} /> Back
              </button>
            ) : (
              <div />
            )}

            {currentStep < 6 ? (
              <button
                type="button"
                className="bg-[#4b101d] hover:bg-[#26070e] text-white px-6 py-3 text-xs font-bold uppercase tracking-wider transition cursor-pointer flex items-center gap-1.5 shadow-sm"
                onClick={handleNext}
              >
                Continue <ArrowRight size={14} />
              </button>
            ) : (
              <button
                type="submit"
                className="bg-[#4b101d] hover:bg-[#26070e] text-white px-7 py-3 text-xs font-bold uppercase tracking-wider transition cursor-pointer shadow-md"
              >
                Send request
              </button>
            )}
          </div>
        </form>
      ) : (
        /* Success State */
        <section className="mt-8 border border-[#ded4c9] bg-[#fffdf9] p-6 sm:p-10 text-center shadow-sm animate-in fade-in duration-300">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f4ece1] text-[#4b101d] no-print">
            <CheckCircle size={28} />
          </div>
          <h2 className="font-display mt-4 text-2xl md:text-3xl font-bold text-[#4b101d] no-print">
            Successful submission!
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-sm leading-7 text-[#685f5a] no-print">
            Thank you, {submittedBrief?.name}. A senior experience planner will review your brief for <strong>{submittedBrief?.occasion}</strong> in <strong>{submittedBrief?.location}</strong> and reach out via {submittedBrief?.email} within 24 hours.
          </p>

          {/* The Complete Printed Brief Card (Target of "Print Brief") */}
          <div className="mx-auto mt-6 max-w-xl bg-white border border-[#ded4c9] p-6 text-left text-xs shadow-xs printable-brief">
            <div className="flex items-center justify-between pb-3 border-b border-[#f0e7dc]">
              <div>
                <span className="font-display text-sm font-bold tracking-wider text-[#4b101d]">YESPROPOSE</span>
                <span className="block text-[10px] text-[#8a7f78] uppercase tracking-wider">Planning Brief & Specifications</span>
              </div>
              <div className="text-right">
                <span className="font-mono text-xs font-bold text-[#4b101d]">{refNumber}</span>
                <span className="block text-[10px] text-[#8a7f78]">
                  {new Date(submittedBrief?.createdAt || Date.now()).toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* Core Specifications Grid */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 pb-4 border-b border-[#f0e7dc]">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#a67f42]">Occasion</span>
                <p className="font-semibold text-sm text-[#171515] mt-0.5">{submittedBrief?.occasion}</p>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#a67f42]">Location</span>
                <p className="font-semibold text-sm text-[#171515] mt-0.5">{submittedBrief?.location}</p>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#a67f42]">Budget Target</span>
                <p className="font-semibold text-sm text-[#171515] mt-0.5">{submittedBrief?.budget}</p>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#a67f42]">Mood / Style</span>
                <p className="font-semibold text-sm text-[#171515] mt-0.5">{submittedBrief?.style}</p>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#a67f42]">Target Date</span>
                <p className="font-semibold text-sm text-[#171515] mt-0.5">{submittedBrief?.preferredDate || 'Flexible'}</p>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#a67f42]">Preferred Time</span>
                <p className="font-semibold text-sm text-[#171515] mt-0.5">{submittedBrief?.preferredTime || 'Flexible'}</p>
              </div>
            </div>

            {/* Private Notes & Preferences */}
            {(submittedBrief?.partnerPreferences || submittedBrief?.specialRequests) && (
              <div className="mt-4 space-y-3">
                {submittedBrief?.partnerPreferences && (
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#a67f42]">Partner Preferences</span>
                    <p className="text-xs text-[#4c4541] mt-0.5 leading-relaxed">
                      {submittedBrief.partnerPreferences}
                    </p>
                  </div>
                )}
                {submittedBrief?.specialRequests && (
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#a67f42]">Special Requests & Notes</span>
                    <p className="text-xs text-[#4c4541] mt-0.5 leading-relaxed">
                      {submittedBrief.specialRequests}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap justify-center items-center gap-4 no-print">
            <button
              type="button"
              className="bg-[#4b101d] hover:bg-[#26070e] text-white px-6 py-3 text-xs font-bold uppercase tracking-wider transition cursor-pointer flex items-center gap-1.5 shadow-sm"
              onClick={() => window.print()}
            >
              <Printer size={14} /> Print Brief
            </button>

            <button
              type="button"
              className="border border-[#4b101d] text-[#4b101d] hover:bg-[#4b101d] hover:text-white px-6 py-3 text-xs font-bold uppercase tracking-wider transition cursor-pointer"
              onClick={() => {
                onNavigate('experiences');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              Explore Experiences →
            </button>
          </div>
        </section>
      )}
    </div>
  );
};
