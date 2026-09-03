export type RideType = 'economy' | 'comfort' | 'premium' | 'ev';

export type BookingStatus = 'confirmed' | 'cancelled' | 'completed';

export interface Booking {
  _id: string;
  passengerName: string;
  passengerPhone: string;
  pickupLocation: string;
  dropoffLocation: string;
  rideType: RideType;
  date: string; // YYYY-MM-DD
  timeSlot: string; // e.g. "09:00 AM - 10:00 AM"
  price: number;
  status: BookingStatus;
  notes?: string;
  createdAt: string;
}

export interface CabOption {
  id: RideType;
  name: string;
  tagline: string;
  capacity: number;
  baseFare: number;
  multiplier: number;
  iconName: string;
  features: string[];
}

export interface TimeSlot {
  id: string;
  label: string;
  period: 'Morning' | 'Afternoon' | 'Evening' | 'Night';
  isPopular?: boolean;
}
