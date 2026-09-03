import mongoose from 'mongoose';
import { Booking } from './types';

const MONGODB_URI = process.env.MONGODB_URI || '';

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
  // eslint-disable-next-line no-var
  var inMemoryBookings: Booking[] | undefined;
}

let cached: MongooseCache = global.mongooseCache || { conn: null, promise: null };

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

// In-memory fallback dataset for smooth instant demo without mandatory external Mongo setup
const todayStr = new Date().toISOString().split('T')[0];
const tomorrowStr = new Date(Date.now() + 86400000).toISOString().split('T')[0];

const defaultSeedBookings: Booking[] = [
  {
    _id: 'demo-b1',
    passengerName: 'Sarah Jenkins',
    passengerPhone: '+1 (555) 234-5678',
    pickupLocation: 'International Airport - Terminal 2',
    dropoffLocation: 'Downtown Central Plaza & Metro',
    rideType: 'economy',
    date: todayStr,
    timeSlot: '09:00 AM - 10:00 AM',
    price: 24.50,
    status: 'confirmed',
    notes: 'Flight landing at Gate 12, carrying 2 bags',
    createdAt: new Date().toISOString(),
  },
  {
    _id: 'demo-b2',
    passengerName: 'Marcus Vance',
    passengerPhone: '+1 (555) 876-5432',
    pickupLocation: 'Silicon Tech Park - Gate 4',
    dropoffLocation: 'Grand Central Railway Station',
    rideType: 'premium',
    date: todayStr,
    timeSlot: '05:00 PM - 06:00 PM',
    price: 58.00,
    status: 'confirmed',
    notes: 'Executive client meeting',
    createdAt: new Date().toISOString(),
  },
  {
    _id: 'demo-b3',
    passengerName: 'Elena Rostova',
    passengerPhone: '+1 (555) 345-9871',
    pickupLocation: 'Bayview Marina & Financial Tower',
    dropoffLocation: 'North Medical Center',
    rideType: 'ev',
    date: tomorrowStr,
    timeSlot: '08:00 AM - 09:00 AM',
    price: 29.00,
    status: 'confirmed',
    notes: 'Quiet eco commute',
    createdAt: new Date().toISOString(),
  },
];

if (!global.inMemoryBookings) {
  global.inMemoryBookings = [...defaultSeedBookings];
}

export async function connectToDatabase() {
  if (!MONGODB_URI) {
    return { isConnected: false, mode: 'in-memory' as const };
  }

  if (cached.conn) {
    return { isConnected: true, mode: 'mongodb' as const, connection: cached.conn };
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }

  try {
    cached.conn = await cached.promise;
    return { isConnected: true, mode: 'mongodb' as const, connection: cached.conn };
  } catch (error) {
    cached.promise = null;
    console.warn('MongoDB connection failed, falling back to persistent memory mode for demo:', error);
    return { isConnected: false, mode: 'in-memory' as const, error };
  }
}

export function getInMemoryBookings(): Booking[] {
  if (!global.inMemoryBookings) {
    global.inMemoryBookings = [...defaultSeedBookings];
  }
  return global.inMemoryBookings;
}

export function saveInMemoryBooking(booking: Booking): Booking {
  if (!global.inMemoryBookings) {
    global.inMemoryBookings = [...defaultSeedBookings];
  }
  global.inMemoryBookings.unshift(booking);
  return booking;
}

export function deleteInMemoryBooking(id: string): boolean {
  if (!global.inMemoryBookings) return false;
  const initialLength = global.inMemoryBookings.length;
  global.inMemoryBookings = global.inMemoryBookings.filter((b) => b._id !== id);
  return global.inMemoryBookings.length < initialLength;
}

export function resetInMemoryBookings(): Booking[] {
  global.inMemoryBookings = [...defaultSeedBookings];
  return global.inMemoryBookings;
}
