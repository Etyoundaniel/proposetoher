export type RouteId =
  | 'home'
  | 'plan'
  | 'experiences'
  | 'details'
  | 'how'
  | 'partners'
  | 'about'
  | 'investor'
  | 'contact';

export interface Experience {
  id: string;
  title: string;
  location: string;
  occasion: string;
  style: string;
  price: string;
  description: string;
  included: string;
  image: string;
  badge?: string;
  highlights?: string[];
}

export interface PlanningBrief {
  occasion: string;
  location: string;
  budget: string;
  style: string;
  experience?: string;
  preferredDate?: string;
  preferredTime?: string;
  partnerPreferences?: string;
  specialRequests?: string;
  name: string;
  email: string;
  phone?: string;
  createdAt: string;
}

export interface PartnerApplication {
  businessName: string;
  contactPerson: string;
  email: string;
  category: string;
  portfolio: string;
  services: string;
  createdAt: string;
}

export interface ContactInquiry {
  name: string;
  email: string;
  inquiryType: string;
  message: string;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  time: string;
}
