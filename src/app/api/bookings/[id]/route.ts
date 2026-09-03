import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase, deleteInMemoryBooking } from '@/lib/mongodb';
import BookingModel from '@/models/Booking';

export const dynamic = 'force-dynamic';

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const dbState = await connectToDatabase();

    if (dbState.isConnected) {
      try {
        await BookingModel.findByIdAndDelete(id);
        return NextResponse.json({ success: true, message: 'Booking cancelled' });
      } catch (dbErr) {
        console.warn('MongoDB delete failed, falling back to memory delete:', dbErr);
      }
    }

    deleteInMemoryBooking(id);
    return NextResponse.json({ success: true, message: 'Booking cancelled' });
  } catch (error) {
    console.error('Error cancelling booking:', error);
    return NextResponse.json({ success: false, error: 'Failed to cancel booking' }, { status: 500 });
  }
}
