import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase, deleteInMemoryBooking } from '@/lib/mongodb';
import BookingModel from '@/models/Booking';

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const dbState = await connectToDatabase();

    if (dbState.isConnected) {
      await BookingModel.findByIdAndDelete(id);
      return NextResponse.json({ success: true, message: 'Booking cancelled' });
    } else {
      deleteInMemoryBooking(id);
      return NextResponse.json({ success: true, message: 'Booking cancelled (memory)' });
    }
  } catch (error) {
    console.error('Error cancelling booking:', error);
    return NextResponse.json({ success: false, error: 'Failed to cancel booking' }, { status: 500 });
  }
}
