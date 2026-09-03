'use client';

import React, { useState } from 'react';
import { toast } from 'sonner';
import { Booking } from '@/lib/types';
import { CAB_OPTIONS } from '@/lib/constants';
import {
  Calendar,
  Clock,
  MapPin,
  Car,
  User,
  Phone,
  Trash2,
  CheckCircle2,
  AlertCircle,
  FileText,
} from 'lucide-react';

interface BookingListProps {
  bookings: Booking[];
  isLoading: boolean;
  onBookingDeleted: () => void;
}

export function BookingList({ bookings, isLoading, onBookingDeleted }: BookingListProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleCancelBooking = async (id: string, timeSlot: string) => {
    setDeletingId(id);
    try {
      const response = await fetch(`/api/bookings/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();

      if (data.success) {
        toast.info('Booking Cancelled', {
          description: `The reservation for ${timeSlot} was removed. Slot is now free.`,
        });
        onBookingDeleted();
      } else {
        toast.error('Failed to cancel', { description: data.error });
      }
    } catch (error) {
      console.error('Cancellation error:', error);
      toast.error('Error cancelling reservation');
    } finally {
      setDeletingId(null);
    }
  };

  const getCabName = (rideType: string) => {
    const cab = CAB_OPTIONS.find((c) => c.id === rideType);
    return cab ? cab.name : rideType;
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 sm:p-7">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Scheduled Reservations</h3>
          <p className="text-xs text-slate-500">Live rides synced with the database</p>
        </div>
        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
          {bookings.length} Bookings
        </span>
      </div>

      {isLoading ? (
        <div className="py-12 text-center text-slate-400 text-sm">
          <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-slate-300 border-t-amber-500 mb-2" />
          <p>Loading scheduled rides...</p>
        </div>
      ) : bookings.length === 0 ? (
        <div className="py-12 text-center text-slate-400">
          <Car className="mx-auto h-10 w-10 stroke-1 text-slate-300 mb-2" />
          <p className="text-sm font-medium text-slate-600">No scheduled rides yet</p>
          <p className="text-xs text-slate-400 mt-0.5">Use the form to book your first cab slot</p>
        </div>
      ) : (
        <div className="divide-y divide-slate-100 mt-2">
          {bookings.map((booking) => {
            const isDeleting = deletingId === booking._id;

            return (
              <div
                key={booking._id}
                className="py-4.5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 transition-colors hover:bg-slate-50/50 rounded-xl px-2 -mx-2"
              >
                {/* Left Info */}
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1 rounded-md bg-amber-100/80 px-2 py-0.5 text-xs font-semibold text-amber-900">
                      <Car className="h-3 w-3" />
                      {getCabName(booking.rideType)}
                    </span>

                    <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700">
                      <Calendar className="h-3 w-3 text-slate-400" />
                      {booking.date}
                    </span>

                    <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                      <Clock className="h-3 w-3 text-emerald-600" />
                      {booking.timeSlot}
                    </span>

                    <span className="rounded-full bg-emerald-100/70 text-emerald-800 px-2 py-0.5 text-[11px] font-semibold flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" /> Confirmed
                    </span>
                  </div>

                  {/* Route */}
                  <div className="space-y-1 text-xs text-slate-700">
                    <div className="flex items-center gap-1.5 font-medium">
                      <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
                      <span className="text-slate-500">From:</span>
                      <span className="text-slate-900">{booking.pickupLocation}</span>
                    </div>
                    <div className="flex items-center gap-1.5 font-medium">
                      <span className="h-2 w-2 rounded-full bg-rose-500 shrink-0" />
                      <span className="text-slate-500">To:</span>
                      <span className="text-slate-900">{booking.dropoffLocation}</span>
                    </div>
                  </div>

                  {/* Passenger */}
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {booking.passengerName}
                    </span>
                    <span className="flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      {booking.passengerPhone}
                    </span>
                    {booking.notes && (
                      <span className="flex items-center gap-1 italic text-slate-400">
                        <FileText className="h-3 w-3" />
                        "{booking.notes}"
                      </span>
                    )}
                  </div>
                </div>

                {/* Right Info & Actions */}
                <div className="flex items-center justify-between lg:justify-end gap-4 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                  <div className="text-right">
                    <span className="text-xs text-slate-400 block font-medium">Fare</span>
                    <span className="text-lg font-bold text-slate-900">
                      ${booking.price.toFixed(2)}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCancelBooking(booking._id, booking.timeSlot)}
                    disabled={isDeleting}
                    className="flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 hover:border-rose-200 transition disabled:opacity-50"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span>{isDeleting ? 'Cancelling...' : 'Cancel'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
