import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase, getInMemoryBookings, saveInMemoryBooking } from '@/lib/mongodb';
import BookingModel from '@/models/Booking';
import { Booking } from '@/lib/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');
    const rideType = searchParams.get('rideType');

    const dbState = await connectToDatabase();

    if (dbState.isConnected) {
      const filter: Record<string, unknown> = { status: 'confirmed' };
      if (date) filter.date = date;
      if (rideType) filter.rideType = rideType;

      const bookings = await BookingModel.find(filter).sort({ createdAt: -1 }).lean();
      const bookedSlots = bookings.map((b) => b.timeSlot);

      // Also get all bookings for list view
      const allBookings = await BookingModel.find().sort({ createdAt: -1 }).limit(20).lean();

      return NextResponse.json({
        success: true,
        mode: 'mongodb',
        bookings: allBookings,
        bookedSlots,
      });
    } else {
      // In-Memory fallback mode
      const allBookings = getInMemoryBookings();
      const filtered = allBookings.filter((b) => {
        if (b.status !== 'confirmed') return false;
        if (date && b.date !== date) return false;
        if (rideType && b.rideType !== rideType) return false;
        return true;
      });

      const bookedSlots = filtered.map((b) => b.timeSlot);

      return NextResponse.json({
        success: true,
        mode: 'in-memory',
        bookings: allBookings,
        bookedSlots,
      });
    }
  } catch (error) {
    console.error('Failed to fetch bookings:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error fetching bookings' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      passengerName,
      passengerPhone,
      pickupLocation,
      dropoffLocation,
      rideType,
      date,
      timeSlot,
      price,
      notes,
    } = body;

    // Validation
    if (!passengerName || !passengerPhone || !pickupLocation || !dropoffLocation || !rideType || !date || !timeSlot) {
      return NextResponse.json(
        { success: false, error: 'Please provide all required booking details.' },
        { status: 400 }
      );
    }

    const dbState = await connectToDatabase();

    if (dbState.isConnected) {
      // Check MongoDB for existing slot conflict
      const existing = await BookingModel.findOne({
        date,
        timeSlot,
        rideType,
        status: 'confirmed',
      });

      if (existing) {
        return NextResponse.json(
          {
            success: false,
            error: 'This slot is not available. Please choose another time slot or vehicle category.',
            isSlotUnavailable: true,
          },
          { status: 409 }
        );
      }

      const newBooking = await BookingModel.create({
        passengerName,
        passengerPhone,
        pickupLocation,
        dropoffLocation,
        rideType,
        date,
        timeSlot,
        price: price || 30.0,
        notes: notes || '',
        status: 'confirmed',
      });

      return NextResponse.json(
        {
          success: true,
          message: 'Ride successfully scheduled!',
          booking: newBooking,
          mode: 'mongodb',
        },
        { status: 201 }
      );
    } else {
      // In-memory slot conflict check
      const currentBookings = getInMemoryBookings();
      const conflict = currentBookings.find(
        (b) =>
          b.date === date &&
          b.timeSlot === timeSlot &&
          b.rideType === rideType &&
          b.status === 'confirmed'
      );

      if (conflict) {
        return NextResponse.json(
          {
            success: false,
            error: 'This slot is not available. Please choose another time slot or vehicle category.',
            isSlotUnavailable: true,
          },
          { status: 409 }
        );
      }

      const newBooking: Booking = {
        _id: `booking-${Date.now()}`,
        passengerName,
        passengerPhone,
        pickupLocation,
        dropoffLocation,
        rideType,
        date,
        timeSlot,
        price: price || 30.0,
        status: 'confirmed',
        notes: notes || '',
        createdAt: new Date().toISOString(),
      };

      saveInMemoryBooking(newBooking);

      return NextResponse.json(
        {
          success: true,
          message: 'Ride successfully scheduled!',
          booking: newBooking,
          mode: 'in-memory',
        },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { success: false, error: 'Server error while scheduling ride' },
      { status: 500 }
    );
  }
}
