import { CabOption, TimeSlot } from './types';

export const CAB_OPTIONS: CabOption[] = [
  {
    id: 'economy',
    name: 'Glide Compact',
    tagline: 'Affordable, quick everyday rides',
    capacity: 4,
    baseFare: 24.50,
    multiplier: 1.0,
    iconName: 'Car',
    features: ['AC Included', 'Instant Dispatch', 'Standard Luggage'],
  },
  {
    id: 'comfort',
    name: 'Glide Comfort',
    tagline: 'Extra legroom & top-rated drivers',
    capacity: 4,
    baseFare: 36.00,
    multiplier: 1.45,
    iconName: 'Sparkles',
    features: ['Extra Legroom', 'Quiet Ride', 'Bottled Water'],
  },
  {
    id: 'premium',
    name: 'Executive SUV',
    tagline: 'High-end luxury vehicles for teams & luggage',
    capacity: 6,
    baseFare: 58.00,
    multiplier: 2.2,
    iconName: 'Crown',
    features: ['Black Car Fleet', 'Wi-Fi Onboard', 'Max 6 Bags'],
  },
  {
    id: 'ev',
    name: 'Green Zero-EV',
    tagline: '100% Electric eco-friendly commute',
    capacity: 4,
    baseFare: 29.00,
    multiplier: 1.2,
    iconName: 'Leaf',
    features: ['Zero Emission', 'Tesla/Ioniq Fleet', 'Silent Cabin'],
  },
];

export const TIME_SLOTS: TimeSlot[] = [
  { id: 'slot-0700', label: '07:00 AM - 08:00 AM', period: 'Morning', isPopular: false },
  { id: 'slot-0800', label: '08:00 AM - 09:00 AM', period: 'Morning', isPopular: true },
  { id: 'slot-0900', label: '09:00 AM - 10:00 AM', period: 'Morning', isPopular: true },
  { id: 'slot-1000', label: '10:00 AM - 11:00 AM', period: 'Morning', isPopular: false },
  { id: 'slot-1100', label: '11:00 AM - 12:00 PM', period: 'Morning', isPopular: false },
  { id: 'slot-1200', label: '12:00 PM - 01:00 PM', period: 'Afternoon', isPopular: false },
  { id: 'slot-1300', label: '01:00 PM - 02:00 PM', period: 'Afternoon', isPopular: false },
  { id: 'slot-1400', label: '02:00 PM - 03:00 PM', period: 'Afternoon', isPopular: false },
  { id: 'slot-1500', label: '03:00 PM - 04:00 PM', period: 'Afternoon', isPopular: false },
  { id: 'slot-1600', label: '04:00 PM - 05:00 PM', period: 'Evening', isPopular: false },
  { id: 'slot-1700', label: '05:00 PM - 06:00 PM', period: 'Evening', isPopular: true },
  { id: 'slot-1800', label: '06:00 PM - 07:00 PM', period: 'Evening', isPopular: true },
  { id: 'slot-1900', label: '07:00 PM - 08:00 PM', period: 'Evening', isPopular: false },
  { id: 'slot-2000', label: '08:00 PM - 09:00 PM', period: 'Night', isPopular: false },
  { id: 'slot-2100', label: '09:00 PM - 10:00 PM', period: 'Night', isPopular: false },
];

export const POPULAR_LOCATIONS = [
  'International Airport - Terminal 2',
  'Downtown Central Plaza & Metro',
  'Silicon Tech Park - Gate 4',
  'Grand Central Railway Station',
  'Bayview Marina & Financial Tower',
  'Suburban Heights Mall',
  'North Medical Center',
];
