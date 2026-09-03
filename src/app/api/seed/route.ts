import { NextResponse } from 'next/server';
import { connectToDatabase, resetInMemoryBookings } from '@/lib/mongodb';
import BookingModel from '@/models/Booking';

export const dynamic = 'force-dynamic';

export async function POST() {
  try {
    const todayStr = new Date().toISOString().split('T')[0];
    const tomorrowStr = new Date(Date.now() + 86400000).toISOString().split('T')[0];

    const demoSeeds = [
      {
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
      },
      {
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
      },
      {
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
      },
    ];

    const dbState = await connectToDatabase();

    if (dbState.isConnected) {
      try {
        await BookingModel.deleteMany({});
        await BookingModel.insertMany(demoSeeds);
        return NextResponse.json({
          success: true,
          mode: 'mongodb',
          message: 'Demo slot dataset reset and seeded in MongoDB!',
        });
      } catch (dbErr) {
        console.warn('MongoDB seed failed, falling back to in-memory:', dbErr);
      }
    }

    resetInMemoryBookings();
    return NextResponse.json({
      success: true,
      mode: 'in-memory',
      message: 'Demo slot dataset reset successfully!',
    });
  } catch (error) {
    console.error('Error seeding demo data:', error);
    resetInMemoryBookings();
    return NextResponse.json({
      success: true,
      mode: 'in-memory',
      message: 'Demo slots reset successfully (fallback mode).',
    });
  }
}
