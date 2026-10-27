import React, { useState, useEffect } from 'react';
import { RouteId, Experience } from './types';
import { EXPERIENCES } from './data/experiences';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ChatWidget } from './components/ChatWidget';
import { HomeView } from './components/views/HomeView';
import { PlanView } from './components/views/PlanView';
import { ExperiencesView } from './components/views/ExperiencesView';
import { DetailsView } from './components/views/DetailsView';
import { HowItWorksView } from './components/views/HowItWorksView';
import { PartnersView } from './components/views/PartnersView';
import { AboutView } from './components/views/AboutView';
import { InvestorView } from './components/views/InvestorView';
import { ContactView } from './components/views/ContactView';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<RouteId>('home');
  const [selectedExperienceId, setSelectedExperienceId] = useState<string>('rooftop');
  const [customizingExperienceTitle, setCustomizingExperienceTitle] = useState<string>('');
  const [initialBudget, setInitialBudget] = useState<number>(50000);

  // Handle URL hash changes or browser back/forward if needed
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as RouteId;
      if (['home', 'plan', 'experiences', 'details', 'how', 'partners', 'about', 'investor', 'contact'].includes(hash)) {
        setCurrentRoute(hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (route: RouteId) => {
    setCurrentRoute(route);
    window.location.hash = route;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectExperience = (id: string) => {
    setSelectedExperienceId(id);
    navigateTo('details');
  };

  const handleCustomizeExperience = (id: string) => {
    const exp = EXPERIENCES.find(e => e.id === id);
    if (exp) {
      setCustomizingExperienceTitle(exp.title);
    }
    navigateTo('plan');
  };

  const currentExperience = EXPERIENCES.find(e => e.id === selectedExperienceId) || EXPERIENCES[0];

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf7ef] text-[#171515] font-sans pb-16 md:pb-0">
      {/* Primary Sticky Header */}
      <Navbar currentRoute={currentRoute} onNavigate={navigateTo} />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentRoute === 'home' && (
          <HomeView
            onNavigate={navigateTo}
            onSelectExperience={handleSelectExperience}
            onCustomizeExperience={handleCustomizeExperience}
            initialBudget={initialBudget}
            onSetBudget={setInitialBudget}
          />
        )}

        {currentRoute === 'plan' && (
          <PlanView
            onNavigate={navigateTo}
            selectedExperienceName={customizingExperienceTitle}
            initialBudgetVal={initialBudget}
          />
        )}

        {currentRoute === 'experiences' && (
          <ExperiencesView
            onNavigate={navigateTo}
            onSelectExperience={handleSelectExperience}
            onCustomizeExperience={handleCustomizeExperience}
          />
        )}

        {currentRoute === 'details' && (
          <DetailsView
            experience={currentExperience}
            onNavigate={navigateTo}
            onCustomizeExperience={handleCustomizeExperience}
          />
        )}

        {currentRoute === 'how' && <HowItWorksView onNavigate={navigateTo} />}

        {currentRoute === 'partners' && <PartnersView onNavigate={navigateTo} />}

        {currentRoute === 'about' && <AboutView onNavigate={navigateTo} />}

        {currentRoute === 'investor' && <InvestorView onNavigate={navigateTo} />}

        {currentRoute === 'contact' && <ContactView onNavigate={navigateTo} />}
      </main>

      {/* Floating Concierge Chat Widget */}
      <ChatWidget onNavigate={navigateTo} />

      {/* Footer */}
      <Footer onNavigate={navigateTo} />

      {/* Mobile Sticky CTA Bar */}
      {currentRoute !== 'plan' && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#171515] p-3 border-t border-white/10 shadow-2xl">
          <button
            type="button"
            className="w-full bg-[#c7a363] hover:bg-[#dcc083] text-[#24160d] py-3 text-xs font-bold uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-2"
            onClick={() => navigateTo('plan')}
          >
            Start Planning
          </button>
        </div>
      )}
    </div>
  );
}
