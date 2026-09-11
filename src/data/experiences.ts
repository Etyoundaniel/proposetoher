import { Experience } from '../types';

export const EXPERIENCES: Experience[] = [
  {
    id: 'rooftop',
    title: 'Rooftop Proposal',
    location: 'Nairobi',
    occasion: 'Marriage proposal',
    style: 'Rooftop',
    price: 'From KSh 50,000',
    description: 'A private city-view setting, shaped around your story.',
    included: 'Private terrace hire, ambient candlelight styling, dedicated hospitality team, tailored planning brief, and discreet coordination.',
    image: 'https://images.pexels.com/photos/2287523/pexels-photo-2287523.jpeg?auto=compress&cs=tinysrgb&w=800',
    badge: 'Nairobi · Rooftop',
    highlights: ['Panoramic skyline backdrop', 'Intimate candlelit pathway', 'Chilled champagne & personalized florals']
  },
  {
    id: 'dinner',
    title: 'Private Dinner Moment',
    location: 'Nairobi',
    occasion: 'Anniversary',
    style: 'Private dinner',
    price: 'From KSh 30,000',
    description: 'An intimate evening with considered hospitality details.',
    included: 'Secluded dining enclave, custom tablescape direction, multi-course curated menu consultation, and optional acoustic accompaniment.',
    image: 'https://images.pexels.com/photos/18471540/pexels-photo-18471540.jpeg?auto=compress&cs=tinysrgb&w=800',
    badge: 'Nairobi · Private dining',
    highlights: ['Chef-crafted bespoke menu', 'Fine linen & organic florals', 'Curated wine pairing']
  },
  {
    id: 'sunset',
    title: 'Sunset Proposal',
    location: 'Naivasha',
    occasion: 'Marriage proposal',
    style: 'Outdoor',
    price: 'From KSh 45,000',
    description: 'A golden-hour proposal designed for a quiet, cinematic reveal.',
    included: 'Lakeside or acacia grove private access, sunset timing choreography, bohemian-luxe lounge setup, and quiet photographic support.',
    image: 'https://images.pexels.com/photos/19448255/pexels-photo-19448255.jpeg?auto=compress&cs=tinysrgb&w=800',
    badge: 'Naivasha · Outdoor',
    highlights: ['Golden hour horizon views', 'Artisanal grazing platter', 'Seamless transition from daylight to stars']
  },
  {
    id: 'beach',
    title: 'Coastal Escape',
    location: 'Mombasa',
    occasion: 'Anniversary',
    style: 'Beach',
    price: 'Quote on request',
    description: 'A slow coastal celebration with space for the details that matter.',
    included: 'Secluded beach enclave permit, soft tide lighting, fresh coastal dining arrangements, and bespoke transport coordination.',
    image: 'https://images.pexels.com/photos/1024968/pexels-photo-1024968.jpeg?auto=compress&cs=tinysrgb&w=1280',
    badge: 'Mombasa · Beach',
    highlights: ['Ocean breeze dining pavilion', 'Torches & soft acoustic tones', 'Private barefoot setup']
  },
  {
    id: 'hotel',
    title: 'Hotel Suite Surprise',
    location: 'Nairobi',
    occasion: 'Birthday surprise',
    style: 'Hotel',
    price: 'From KSh 25,000',
    description: 'A discreet hospitality-led surprise with a personal finish.',
    included: 'Luxury suite liaison, personalized floral installations, arrival timing synchronization, and gourmet confectionery selection.',
    image: 'https://images.pexels.com/photos/6474943/pexels-photo-6474943.jpeg?auto=compress&cs=tinysrgb&w=800',
    badge: 'Nairobi · Hotel',
    highlights: ['Discreet room styling', 'Artisan chocolates & vintage vintage', 'Bespoke letterpress keepsakes']
  },
  {
    id: 'custom',
    title: 'Bespoke Moment',
    location: 'Other location',
    occasion: 'Custom experience',
    style: 'Custom',
    price: 'Quote on request',
    description: 'A starting point for a moment that does not fit a template.',
    included: 'One-on-one discovery consultation, mood board & scouting curation, bespoke supplier procurement, and full day-of concierge direction.',
    image: 'https://images.pexels.com/photos/14600070/pexels-photo-14600070.jpeg?auto=compress&cs=tinysrgb&w=800',
    badge: 'Bespoke · Custom',
    highlights: ['Unconstrained conceptual freedom', 'Access to private properties', 'Full end-to-end secret coordination']
  }
];

export const HERO_SLIDES = [
  {
    url: 'https://images.pexels.com/photos/36266512/pexels-photo-36266512.jpeg',
    alt: 'A man proposes to a woman by the sea during sunset, surrounded by a romantic table setup.'
  },
  {
    url: 'https://images.pexels.com/photos/6315271/pexels-photo-6315271.jpeg',
    alt: 'A Black couple shares a rooftop marriage proposal near city buildings at night.'
  },
  {
    url: 'https://images.pexels.com/photos/5911161/pexels-photo-5911161.jpeg',
    alt: 'A couple in elegant clothes shares a romantic dinner at a restaurant table.'
  },
  {
    url: 'https://images.pexels.com/photos/14600070/pexels-photo-14600070.jpeg',
    alt: 'A couple celebrates a romantic marriage proposal at sunset in a blooming lavender field.'
  },
  {
    url: 'https://images.pexels.com/photos/4863854/pexels-photo-4863854.jpeg',
    alt: 'A couple shares a romantic proposal by the beach during a stunning sunset.'
  },
  {
    url: 'https://images.pexels.com/photos/6474943/pexels-photo-6474943.jpeg',
    alt: 'An elegant couple sits together in a luxurious hotel lounge.'
  }
];

export const OCCASIONS = [
  'Marriage proposal',
  'Anniversary',
  'Birthday surprise',
  'Just Because',
  'Custom experience'
];

export const LOCATIONS = [
  'Nairobi',
  'Mombasa',
  'Naivasha',
  'Other location',
  'International request'
];

export const BUDGET_RANGES = [
  'Under KSh 25,000',
  'KSh 25,000–50,000',
  'KSh 50,000–100,000',
  'KSh 100,000+',
  'I need guidance'
];

export const STYLES = [
  'Luxury',
  'Intimate',
  'Outdoor',
  'Rooftop',
  'Private dinner',
  'Custom'
];

export const FAQS = [
  {
    question: 'How early should I begin?',
    answer: 'Earlier planning usually gives more creative and venue options. Share your preferred date and our team will advise based on venue availability, sunset timing, and seasonal considerations.'
  },
  {
    question: 'Can I personalize an experience?',
    answer: 'Yes. Every experience is a starting point, not a rigid package. We adapt color palettes, floral preferences, favorite music, dietary requests, and personalized keepsakes to reflect your relationship.'
  },
  {
    question: 'When is pricing confirmed?',
    answer: 'Final availability and pricing are confirmed after your request is reviewed by our planners. We outline clear line items with no hidden surprises.'
  },
  {
    question: 'How do you keep the surprise completely safe?',
    answer: 'Discretion is our highest priority. We coordinate via your preferred channel, use discreet billing descriptors, and liaise directly with venues so your partner suspects nothing until the reveal.'
  }
];
