import React, { useState, useEffect } from 'react';
import { RouteId, Experience } from '../../types';
import { HERO_SLIDES, EXPERIENCES } from '../../data/experiences';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

interface HomeViewProps {
  onNavigate: (route: RouteId) => void;
  onSelectExperience: (id: string) => void;
  onCustomizeExperience: (id: string) => void;
  initialBudget: number;
  onSetBudget: (budget: number) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onSelectExperience,
  onCustomizeExperience,
  initialBudget,
  onSetBudget
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderValue, setSliderValue] = useState(initialBudget || 50000);

  // Auto advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % HERO_SLIDES.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  const handleBudgetChange = (val: number) => {
    setSliderValue(val);
    onSetBudget(val);
  };

  const curatedCards = EXPERIENCES.slice(0, 3);

  return (
    <div className="w-full">
      {/* Hero Carousel Section */}
      <section
        className="hero-carousel relative overflow-hidden bg-[#171515]"
        style={{ minHeight: 'calc(78vh)' }}
        aria-roledescription="carousel"
        aria-label="Relationship moments"
      >
        {HERO_SLIDES.map((slide, idx) => (
          <img
            key={slide.url}
            src={slide.url}
            alt={slide.alt}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out ${
              idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          />
        ))}

        {/* Gradient Overlay */}
        <div className="hero-overlay absolute inset-0 z-20 pointer-events-none"></div>

        {/* Hero Content */}
        <div className="hero-content relative z-30 mx-auto flex max-w-7xl items-center px-6 py-24 min-h-[78vh]">
          <div className="hero-readability max-w-2xl text-white">
            <p className="text-[11px] font-bold uppercase tracking-[.18em] text-[#d8ba78]">
              Relationship experiences, considered
            </p>
            <h1 className="font-display mt-6 max-w-xl text-3xl sm:text-4xl md:text-5xl leading-[1.18] font-bold text-white tracking-normal">
              Plan a moment worth remembering.
            </h1>
            <p className="mt-6 max-w-lg text-base leading-7 text-[#e8e1db] font-light">
              Discover a direction, shape the details, and send one thoughtful request.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <button
                type="button"
                className="bg-[#c7a363] hover:bg-[#dcc083] text-[#24160d] px-6 py-3.5 text-xs font-bold uppercase tracking-wider transition transform hover:-translate-y-0.5 cursor-pointer shadow-md"
                onClick={() => {
                  onNavigate('plan');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                Start Planning
              </button>
              <button
                type="button"
                className="border border-white/70 hover:bg-white hover:text-[#4b101d] text-white px-6 py-3.5 text-xs font-bold uppercase tracking-wider transition cursor-pointer"
                onClick={() => {
                  onNavigate('experiences');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                Explore Experiences
              </button>
            </div>
          </div>
        </div>

        {/* Slide Controls & Dots */}
        <div className="absolute bottom-6 right-6 z-30 flex items-center gap-3 bg-black/40 backdrop-blur-sm px-4 py-2 border border-white/10">
          <button
            type="button"
            className="text-white/70 hover:text-white transition cursor-pointer p-1"
            onClick={() => setCurrentSlide(prev => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
            aria-label="Previous slide"
          >
            <ChevronLeft size={16} />
          </button>
          <div className="flex gap-1.5">
            {HERO_SLIDES.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`h-1.5 transition-all rounded-full cursor-pointer ${
                  i === currentSlide ? 'w-5 bg-[#c7a363]' : 'w-1.5 bg-white/40 hover:bg-white/70'
                }`}
                onClick={() => setCurrentSlide(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
          <button
            type="button"
            className="text-white/70 hover:text-white transition cursor-pointer p-1"
            onClick={() => setCurrentSlide(prev => (prev + 1) % HERO_SLIDES.length)}
            aria-label="Next slide"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </section>

      {/* The Journey Section */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-[#ded4c9] pb-8">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[.18em] text-[#a67f42]">
              The journey
            </p>
            <h2 className="font-display mt-4 max-w-xl text-2xl md:text-3xl font-bold text-[#4b101d]">
              A clear path from idea to request.
            </h2>
          </div>
          <button
            type="button"
            className="border-b border-[#4b101d] pb-1 text-xs font-bold uppercase tracking-wider text-[#4b101d] hover:text-[#26070e] transition cursor-pointer flex items-center gap-1.5"
            onClick={() => {
              onNavigate('plan');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            Start with your idea <ArrowRight size={13} />
          </button>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          <article className="border-t border-[#c7a363] pt-5">
            <span className="text-xs font-bold tracking-[.16em] text-[#a67f42]">01</span>
            <h3 className="font-display mt-4 text-xl font-bold text-[#4b101d]">
              Discover
            </h3>
            <p className="mt-3 text-sm leading-6 text-[#685f5a]">
              Explore a refined edit of experience directions, from intimate rooftops to serene outdoor escapes.
            </p>
          </article>
          <article className="border-t border-[#c7a363] pt-5">
            <span className="text-xs font-bold tracking-[.16em] text-[#a67f42]">02</span>
            <h3 className="font-display mt-4 text-xl font-bold text-[#4b101d]">
              Plan
            </h3>
            <p className="mt-3 text-sm leading-6 text-[#685f5a]">
              Choose the essentials in a few focused steps—location, mood, budget range, and private preferences.
            </p>
          </article>
          <article className="border-t border-[#c7a363] pt-5">
            <span className="text-xs font-bold tracking-[.16em] text-[#a67f42]">03</span>
            <h3 className="font-display mt-4 text-xl font-bold text-[#4b101d]">
              Request
            </h3>
            <p className="mt-3 text-sm leading-6 text-[#685f5a]">
              A dedicated planner reviews your brief, verifies venue availability, and follows up with custom options.
            </p>
          </article>
        </div>
      </section>

      {/* Curated Directions Section */}
      <section className="bg-[#f2ece3] px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-5 border-b border-[#ded4c9] pb-8">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[.18em] text-[#a67f42]">
                Curated directions
              </p>
              <h2 className="font-display mt-4 text-2xl md:text-3xl font-bold text-[#4b101d]">
                Begin with a feeling.
              </h2>
            </div>
            <button
              type="button"
              className="border-b border-[#4b101d] pb-1 text-xs font-bold uppercase tracking-wider text-[#4b101d] hover:text-[#26070e] transition cursor-pointer"
              onClick={() => {
                onNavigate('experiences');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              View all experiences
            </button>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {curatedCards.map(item => (
              <article
                key={item.id}
                className="overflow-hidden bg-[#fffdf9] border border-[#ded4c9] transition duration-300 hover:-translate-y-1 hover:shadow-xl group"
              >
                <div className="relative h-64 w-full overflow-hidden">
                  <img
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    src={item.image}
                    alt={item.title}
                  />
                  <div className="absolute top-4 left-4 bg-[#171515]/85 backdrop-blur-xs px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#d8ba78]">
                    {item.badge}
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-[11px] font-bold uppercase tracking-[.12em] text-[#a67f42]">
                    {item.location} · {item.style}
                  </p>
                  <h3 className="font-display mt-2.5 text-xl font-bold text-[#4b101d]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed text-[#685f5a] line-clamp-2">
                    {item.description}
                  </p>
                  <div className="mt-5 pt-4 border-t border-[#f0e7dc] flex items-center justify-between">
                    <span className="text-xs font-bold text-[#4b101d]">{item.price}</span>
                    <button
                      type="button"
                      className="text-xs font-bold text-[#4b101d] underline underline-offset-4 hover:text-[#26070e] transition cursor-pointer"
                      onClick={() => onSelectExperience(item.id)}
                    >
                      Explore direction
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Experience Banner */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
        <article className="grid overflow-hidden md:grid-cols-2 border border-[#ded4c9] shadow-xl">
          <img
            loading="lazy"
            className="min-h-80 h-full w-full object-cover"
            src="https://images.pexels.com/photos/2287523/pexels-photo-2287523.jpeg?auto=compress&cs=tinysrgb&w=800"
            alt="Luxurious dining setup in a rooftop restaurant overlooking the cityscape at sunset."
          />
          <div className="bg-[#4b101d] p-8 md:p-12 text-white flex flex-col justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[.18em] text-[#d8ba78]">
                Featured experience
              </p>
              <h2 className="font-display mt-4 text-2xl md:text-3xl font-bold leading-snug text-white">
                An elevated city-view proposal.
              </h2>
              <p className="mt-5 max-w-md text-sm leading-7 text-[#ebe1dc] font-light">
                A refined rooftop setting for one extraordinary question. Featuring private terrace access, candlelit path, floral arch, and synchronized champagne service.
              </p>
              <div className="mt-6 flex items-center gap-3">
                <span className="text-xs text-[#d8ba78] font-semibold uppercase tracking-wider">Estimated</span>
                <p className="text-base font-bold text-[#e1c381]">
                  Starting from KSh 50,000
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/15 flex flex-wrap gap-4">
              <button
                type="button"
                className="bg-[#c7a363] hover:bg-[#dcc083] text-[#24160d] px-6 py-3 text-xs font-bold uppercase tracking-wider transition cursor-pointer"
                onClick={() => onCustomizeExperience('rooftop')}
              >
                Start Planning
              </button>
              <button
                type="button"
                className="border border-white/40 hover:bg-white/10 text-white px-5 py-3 text-xs font-bold uppercase tracking-wider transition cursor-pointer"
                onClick={() => onSelectExperience('rooftop')}
              >
                View Details
              </button>
            </div>
          </div>
        </article>
      </section>

      {/* Budget Preview Section */}
      <section className="bg-[#171515] px-6 py-18 text-white border-t border-b border-white/10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_.85fr] lg:items-center">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[.18em] text-[#d8ba78]">
              Budget preview
            </p>
            <h2 className="font-display mt-4 max-w-xl text-2xl md:text-3xl font-bold text-white">
              Start with a comfortable range.
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-7 text-[#d9d0ca] font-light">
              Your brief helps shape suitable possibilities. Adjust the interactive scale to see an illustrative baseline, then carry your preference directly into the planner.
            </p>
          </div>

          <div className="border border-white/15 bg-white/[.04] p-6 sm:p-8 backdrop-blur-xs">
            <label className="text-xs font-bold uppercase tracking-wider text-white block">
              Illustrative budget
            </label>
            <input
              type="range"
              min="10000"
              max="150000"
              step="5000"
              value={sliderValue}
              onChange={e => handleBudgetChange(Number(e.target.value))}
              className="mt-6 w-full accent-[#c7a363] cursor-pointer h-2 bg-white/20 rounded-lg"
            />
            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs text-[#bfb4ac]">
                KSh 10,000 — KSh 150,000+
              </span>
              <strong className="text-base text-[#e1c381] font-bold">
                KSh {sliderValue.toLocaleString()}
              </strong>
            </div>

            <button
              type="button"
              className="bg-[#c7a363] hover:bg-[#dcc083] text-[#24160d] mt-7 w-full py-3.5 text-xs font-bold uppercase tracking-wider transition cursor-pointer"
              onClick={() => {
                onNavigate('plan');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              Build my brief with this range
            </button>
          </div>
        </div>
      </section>

      {/* Final Chapter Section */}
      <section className="relative overflow-hidden px-6 py-28 text-center">
        <img
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.pexels.com/photos/1024968/pexels-photo-1024968.jpeg?auto=compress&cs=tinysrgb&w=1280"
          alt="A couple shares a romantic moment on a tropical beach during a beautiful sunset."
        />
        <div className="absolute inset-0 bg-[#21090f]/85"></div>
        <div className="relative mx-auto max-w-3xl text-center text-white">
          <p className="text-[11px] font-bold uppercase tracking-[.18em] text-[#d8ba78]">
            Your next chapter
          </p>
          <h2 className="font-display mt-5 text-3xl md:text-4xl font-bold leading-snug text-white">
            Make space for the moment.
          </h2>
          <p className="mt-4 max-w-md mx-auto text-sm text-[#e0d6d0] font-light">
            Take two minutes to assemble your priorities. We ensure every flower, candle, and cue is ready for your question.
          </p>
          <button
            type="button"
            className="bg-[#c7a363] hover:bg-[#dcc083] text-[#24160d] mt-8 px-7 py-3.5 text-xs font-bold uppercase tracking-wider transition cursor-pointer shadow-lg"
            onClick={() => {
              onNavigate('plan');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            Start Planning
          </button>
        </div>
      </section>
    </div>
  );
};
