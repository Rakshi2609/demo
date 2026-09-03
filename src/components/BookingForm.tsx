'use client';

import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { CAB_OPTIONS, POPULAR_LOCATIONS, TIME_SLOTS } from '@/lib/constants';
import { RideType } from '@/lib/types';
import { VehicleSelector } from './VehicleSelector';
import { TimeSlotPicker } from './TimeSlotPicker';
import {
  MapPin,
  Calendar,
  User,
  Phone,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
  Clock,
  Sparkles,
} from 'lucide-react';

interface BookingFormProps {
  bookedSlots: string[];
  selectedDate: string;
  onChangeDate: (date: string) => void;
  selectedRideType: RideType;
  onChangeRideType: (type: RideType) => void;
  onBookingCreated: () => void;
}

export function BookingForm({
  bookedSlots,
  selectedDate,
  onChangeDate,
  selectedRideType,
  onChangeRideType,
  onBookingCreated,
}: BookingFormProps) {
  const [pickup, setPickup] = useState('International Airport - Terminal 2');
  const [dropoff, setDropoff] = useState('Downtown Central Plaza & Metro');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [passengerName, setPassengerName] = useState('Alex Rivera');
  const [passengerPhone, setPassengerPhone] = useState('+1 (555) 432-8765');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto-select first available slot if not selected
  useEffect(() => {
    if (!selectedSlot) {
      const firstAvailable = TIME_SLOTS.find((s) => !bookedSlots.includes(s.label));
      if (firstAvailable) {
        setSelectedSlot(firstAvailable.label);
      }
    } else if (bookedSlots.includes(selectedSlot)) {
      // If the currently selected slot becomes booked on date change
      const firstAvailable = TIME_SLOTS.find((s) => !bookedSlots.includes(s.label));
      if (firstAvailable) {
        setSelectedSlot(firstAvailable.label);
      }
    }
  }, [bookedSlots, selectedSlot]);

  // Selected cab details & dynamic fare calculation
  const currentCab = CAB_OPTIONS.find((c) => c.id === selectedRideType) || CAB_OPTIONS[0];
  const baseFare = currentCab.baseFare;
  const platformFee = 2.5;
  const tax = (baseFare + platformFee) * 0.08;
  const totalPrice = Number((baseFare + platformFee + tax).toFixed(2));

  // Handle clicking on an occupied slot directly
  const handleSlotConflictClick = (slotLabel: string) => {
    toast.error('This slot is not available', {
      description: `The time slot "${slotLabel}" for ${currentCab.name} on ${selectedDate} is already reserved. Please select another slot.`,
      duration: 4000,
    });
  };

  // Dedicated demo simulation button
  const handleSimulateConflict = () => {
    const bookedExample = bookedSlots[0] || '09:00 AM - 10:00 AM';
    toast.error('This slot is not available', {
      description: `[Demo Test] The time slot "${bookedExample}" is occupied by another scheduled driver. Please select an available slot.`,
      duration: 4500,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!pickup.trim() || !dropoff.trim()) {
      toast.error('Missing route information', {
        description: 'Please provide both pickup and drop-off destinations.',
      });
      return;
    }

    if (!selectedSlot) {
      toast.error('Please select a time slot', {
        description: 'Choose one of the available time slots for your ride.',
      });
      return;
    }

    // Client-side quick check
    if (bookedSlots.includes(selectedSlot)) {
      toast.error('This slot is not available', {
        description: `The slot ${selectedSlot} has just been reserved. Please pick another one.`,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          passengerName,
          passengerPhone,
          pickupLocation: pickup,
          dropoffLocation: dropoff,
          rideType: selectedRideType,
          date: selectedDate,
          timeSlot: selectedSlot,
          price: totalPrice,
          notes,
        }),
      });

      const data = await response.json();

      if (response.status === 409 || !data.success) {
        // Trigger the exact requested toast
        toast.error('This slot is not available', {
          description:
            data.error ||
            `The slot "${selectedSlot}" is no longer available. Please select another time.`,
          duration: 5000,
        });
        return;
      }

      toast.success('Ride Scheduled Successfully!', {
        description: `Your ${currentCab.name} is booked for ${selectedDate} at ${selectedSlot}.`,
      });

      onBookingCreated();
    } catch (error) {
      console.error('Submission failed:', error);
      toast.error('Booking failed', {
        description: 'Could not communicate with the scheduling server.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const todayStr = new Date().toISOString().split('T')[0];
  const tomorrowStr = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 sm:p-7">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-slate-100 gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Schedule Your Cab</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Guaranteed on-time arrival with real-time slot conflict detection
          </p>
        </div>

        {/* Conflict demo trigger button */}
        <button
          type="button"
          onClick={handleSimulateConflict}
          className="inline-flex items-center gap-1.5 self-start sm:self-auto px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 border border-rose-200 text-xs font-semibold text-rose-700 transition"
          title="Click to trigger the 'This slot is not available' toast demo"
        >
          <AlertCircle className="h-3.5 w-3.5" />
          <span>Test "Slot Unavailable" Toast</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-7">
        {/* Step 1: Vehicle Selection */}
        <VehicleSelector selectedType={selectedRideType} onSelect={onChangeRideType} />

        {/* Step 2: Route & Date */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-slate-800">
            2. Trip Locations & Scheduled Date
          </label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Pickup */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-600 flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-emerald-600" />
                Pickup Address
              </label>
              <input
                type="text"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                required
                placeholder="e.g. JFK Airport Terminal 4"
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-400/20"
              />
            </div>

            {/* Dropoff */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-600 flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-rose-600" />
                Drop-off Destination
              </label>
              <input
                type="text"
                value={dropoff}
                onChange={(e) => setDropoff(e.target.value)}
                required
                placeholder="e.g. Financial District"
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-400/20"
              />
            </div>
          </div>

          {/* Quick presets */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-[11px] text-slate-400 font-medium">Quick suggestions:</span>
            {POPULAR_LOCATIONS.slice(0, 3).map((loc) => (
              <button
                key={loc}
                type="button"
                onClick={() => setDropoff(loc)}
                className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              >
                + {loc.split(' - ')[0]}
              </button>
            ))}
          </div>

          {/* Date Selector Pills */}
          <div className="pt-2">
            <label className="text-xs font-medium text-slate-600 mb-2 flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-amber-600" />
              Pickup Date
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => onChangeDate(todayStr)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition ${
                  selectedDate === todayStr
                    ? 'border-amber-500 bg-amber-500 text-slate-950 shadow-xs'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                Today ({todayStr})
              </button>

              <button
                type="button"
                onClick={() => onChangeDate(tomorrowStr)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition ${
                  selectedDate === tomorrowStr
                    ? 'border-amber-500 bg-amber-500 text-slate-950 shadow-xs'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                Tomorrow ({tomorrowStr})
              </button>

              <div className="relative flex items-center">
                <input
                  type="date"
                  min={todayStr}
                  value={selectedDate}
                  onChange={(e) => onChangeDate(e.target.value)}
                  className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-700 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Step 3: Time Slot Matrix */}
        <TimeSlotPicker
          selectedSlot={selectedSlot}
          bookedSlots={bookedSlots}
          onSelectSlot={setSelectedSlot}
          onSlotConflictClick={handleSlotConflictClick}
          selectedDate={selectedDate}
        />

        {/* Step 4: Passenger Info */}
        <div className="space-y-3 pt-2 border-t border-slate-100">
          <label className="text-sm font-semibold text-slate-800">
            4. Passenger & Contact Info
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-600 flex items-center gap-1.5">
                <User className="h-3.5 w-3.5 text-slate-400" />
                Full Name
              </label>
              <input
                type="text"
                value={passengerName}
                onChange={(e) => setPassengerName(e.target.value)}
                required
                placeholder="Rider name"
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 focus:bg-white focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-400/20"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-600 flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5 text-slate-400" />
                Mobile Phone (for Driver SMS updates)
              </label>
              <input
                type="tel"
                value={passengerPhone}
                onChange={(e) => setPassengerPhone(e.target.value)}
                required
                placeholder="+1 (555) 000-0000"
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 focus:bg-white focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-400/20"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-600">
              Driver Instructions / Notes (Optional)
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Flight AA-302 landing, please arrive with child seat"
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 focus:bg-white focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-400/20"
            />
          </div>
        </div>

        {/* Pricing Summary & Confirmation Banner */}
        <div className="rounded-xl bg-slate-50 border border-slate-200/80 p-4 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-600">
            <span>Base Fare ({currentCab.name})</span>
            <span>${baseFare.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between text-xs text-slate-600">
            <span>Service & Reservation Fee</span>
            <span>${platformFee.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between text-xs text-slate-600">
            <span>Estimated Taxes (8%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="pt-2 border-t border-slate-200 flex items-baseline justify-between">
            <div>
              <span className="text-sm font-bold text-slate-900">Total Guaranteed Fare</span>
              <p className="text-[11px] text-slate-400">No surge pricing upon arrival</p>
            </div>
            <span className="text-2xl font-black text-slate-900">${totalPrice.toFixed(2)}</span>
          </div>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full relative flex items-center justify-center gap-2 rounded-xl bg-slate-950 py-3.5 px-6 text-sm font-bold text-white shadow-md hover:bg-slate-800 active:scale-[0.99] transition-all disabled:opacity-50"
        >
          {isSubmitting ? (
            <span>Checking slot availability...</span>
          ) : (
            <>
              <span>Confirm & Schedule Ride</span>
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
