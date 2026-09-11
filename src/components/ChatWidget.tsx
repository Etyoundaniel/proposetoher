import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { RouteId, ChatMessage } from '../types';

interface ChatWidgetProps {
  onNavigate: (route: RouteId) => void;
}

export const ChatWidget: React.FC<ChatWidgetProps> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleActionClick = (action: string) => {
    if (action === 'plan') {
      onNavigate('plan');
      setIsOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (action === 'experiences') {
      onNavigate('experiences');
      setIsOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (action === 'planner') {
      onNavigate('contact');
      setIsOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (action === 'whatsapp') {
      const newMsg: ChatMessage = {
        id: String(Date.now()),
        sender: 'assistant',
        text: 'WhatsApp Concierge: You can chat directly with a lead planner on WhatsApp (+254 700 882 190) or submit a brief via our Plan page for priority scheduling.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, newMsg]);
    }
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const query = inputText.trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: String(Date.now()),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');

    // Generate contextual response based on keywords
    setTimeout(() => {
      let reply = "Thank you for reaching out. Tell us what you envision, or click 'Plan my moment' above to customize every detail in under two minutes.";
      const lower = query.toLowerCase();

      if (lower.includes('cost') || lower.includes('price') || lower.includes('budget') || lower.includes('ksh') || lower.includes('how much')) {
        reply = "Experiences typically start from KSh 25,000 for private hotel surprises up to KSh 50,000+ for full rooftop installations. Use our interactive planner to see options tailored to your comfortable range.";
      } else if (lower.includes('rooftop') || lower.includes('nairobi')) {
        reply = "Our Nairobi Rooftop Proposal experience features private panoramic city views, bespoke candle installations, and quiet champagne service. Would you like to view this experience?";
      } else if (lower.includes('naivasha') || lower.includes('sunset') || lower.includes('outdoor')) {
        reply = "Our Sunset Proposal in Naivasha coordinates private golden-hour lake and acacia grove setups with tailored bohemian luxury styling.";
      } else if (lower.includes('beach') || lower.includes('mombasa') || lower.includes('coast')) {
        reply = "The Coastal Escape experience in Mombasa offers secluded tide-side pavilions, acoustic strings, and fresh seafood dinner under the stars.";
      } else if (lower.includes('surprise') || lower.includes('secret')) {
        reply = "Surprise integrity is our specialty. All communication happens discreetly through your selected channel, with no paperwork or venue clues sent to your shared accounts.";
      }

      const botMsg: ChatMessage = {
        id: String(Date.now() + 1),
        sender: 'assistant',
        text: reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
    }, 450);
  };

  return (
    <aside id="chat-widget" className="fixed bottom-5 right-5 z-50">
      {isOpen && (
        <div
          id="chat-panel"
          className="mb-3 w-[min(360px,calc(100vw-2.5rem))] overflow-hidden border border-[#ded4c9] bg-[#fffdf9] shadow-2xl animate-in fade-in slide-in-from-bottom-3 duration-200"
          role="dialog"
          aria-labelledby="chat-title"
        >
          {/* Header */}
          <div className="flex items-center justify-between bg-[#4b101d] px-5 py-4 text-white">
            <div>
              <h2 id="chat-title" className="font-display text-base font-bold text-white tracking-wide">
                How can we help?
              </h2>
              <span className="text-[10px] text-[#d8ba78] block">Propose To Her Concierge</span>
            </div>
            <button
              id="chat-close"
              type="button"
              className="rounded-full p-1 text-white/80 hover:text-white hover:bg-white/10 transition cursor-pointer"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              <X size={18} />
            </button>
          </div>

          {/* Panel Body */}
          <div className="p-5 max-h-[460px] overflow-y-auto flex flex-col justify-between">
            <div>
              <p className="text-sm leading-6 text-[#685f5a]">
                Tell us what you’re planning and we’ll point you in the right direction.
              </p>

              {/* Quick Action Buttons */}
              <div className="mt-4 grid gap-2">
                <button
                  type="button"
                  className="border border-[#ded4c9] bg-white px-3 py-2 text-left text-xs font-bold text-[#4b101d] hover:border-[#4b101d] hover:bg-[#fbf7ef] transition cursor-pointer"
                  onClick={() => handleActionClick('plan')}
                >
                  Plan my moment
                </button>
                <button
                  type="button"
                  className="border border-[#ded4c9] bg-white px-3 py-2 text-left text-xs font-bold text-[#4b101d] hover:border-[#4b101d] hover:bg-[#fbf7ef] transition cursor-pointer"
                  onClick={() => handleActionClick('experiences')}
                >
                  Explore experiences
                </button>
                <button
                  type="button"
                  className="border border-[#ded4c9] bg-white px-3 py-2 text-left text-xs font-bold text-[#4b101d] hover:border-[#4b101d] hover:bg-[#fbf7ef] transition cursor-pointer"
                  onClick={() => handleActionClick('planner')}
                >
                  Talk to a planner
                </button>
                <button
                  type="button"
                  className="border border-[#c7a363] bg-[#fbf4e6] px-3 py-2 text-left text-xs font-bold text-[#4b101d] hover:bg-[#f5e9d2] transition cursor-pointer flex items-center justify-between"
                  onClick={() => handleActionClick('whatsapp')}
                >
                  <span>Continue on WhatsApp</span>
                  <span className="text-[10px] text-[#a67f42] uppercase">Direct</span>
                </button>
              </div>

              {/* Message List */}
              {messages.length > 0 && (
                <div className="mt-4 space-y-2.5 text-xs max-h-48 overflow-y-auto border-t border-[#ded4c9] pt-3">
                  {messages.map(msg => (
                    <div
                      key={msg.id}
                      className={`p-3 text-xs leading-relaxed ${
                        msg.sender === 'user'
                          ? 'ml-auto max-w-[85%] bg-[#4b101d] text-white'
                          : 'bg-[#f7f0e6] text-[#4c4541] border-l-2 border-[#c7a363]'
                      }`}
                    >
                      <p>{msg.text}</p>
                      <span
                        className={`block text-[9px] mt-1 ${
                          msg.sender === 'user' ? 'text-white/60 text-right' : 'text-[#8b807b]'
                        }`}
                      >
                        {msg.time}
                      </span>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSend} className="mt-4 flex gap-2 pt-2 border-t border-[#ded4c9]">
              <label htmlFor="chat-input-field" className="sr-only">
                Type a message
              </label>
              <input
                id="chat-input-field"
                type="text"
                className="w-full border border-[#ded4c9] bg-white px-3 py-2 text-xs text-[#171515] placeholder:text-[#9c918c] focus:border-[#4b101d] focus:outline-none"
                placeholder="Ask anything about venues or dates..."
                value={inputText}
                onChange={e => setInputText(e.target.value)}
              />
              <button
                type="submit"
                className="bg-[#4b101d] hover:bg-[#26070e] text-white px-3 py-2 text-xs font-bold transition cursor-pointer flex items-center justify-center"
                aria-label="Send message"
              >
                <Send size={14} />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Launcher Button */}
      <button
        id="chat-launch"
        type="button"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#c7a363] text-[#24160d] shadow-xl hover:-translate-y-1 hover:bg-[#d8ba78] transition cursor-pointer"
        aria-label="Chat with us"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      >
        <MessageCircle size={24} />
      </button>
    </aside>
  );
};
