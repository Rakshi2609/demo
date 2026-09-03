import mongoose, { Schema, Document, Model } from 'mongoose';
import { Booking as IBooking } from '@/lib/types';

export interface BookingDocument extends Omit<IBooking, '_id'>, Document {}

const BookingSchema = new Schema<BookingDocument>(
  {
    passengerName: {
      type: String,
      required: [true, 'Passenger name is required'],
      trim: true,
    },
    passengerPhone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    pickupLocation: {
      type: String,
      required: [true, 'Pickup location is required'],
      trim: true,
    },
    dropoffLocation: {
      type: String,
      required: [true, 'Drop-off location is required'],
      trim: true,
    },
    rideType: {
      type: String,
      enum: ['economy', 'comfort', 'premium', 'ev'],
      required: [true, 'Ride type is required'],
    },
    date: {
      type: String,
      required: [true, 'Date (YYYY-MM-DD) is required'],
    },
    timeSlot: {
      type: String,
      required: [true, 'Time slot is required'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
    },
    status: {
      type: String,
      enum: ['confirmed', 'cancelled', 'completed'],
      default: 'confirmed',
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index to quickly identify if a vehicle of that type is already scheduled for that specific slot
BookingSchema.index({ date: 1, timeSlot: 1, rideType: 1, status: 1 });

const BookingModel: Model<BookingDocument> =
  mongoose.models.Booking || mongoose.model<BookingDocument>('Booking', BookingSchema);

export default BookingModel;
