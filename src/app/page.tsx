'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { Booking, RideType } from '@/lib/types';
import { TIME_SLOTS } from '@/lib/constants';
import { Navbar } from '@/components/Navbar';
import { StatsBanner } from '@/components/StatsBanner';
import { SlotConflictDemoCard } from '@/components/SlotConflictDemoCard';
import { BookingForm } from '@/components/BookingForm';
import { BookingList } from '@/components/BookingList';
import {
  Car,
  Clock,
  ShieldCheck,
  Zap,
  MapPin,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from 'lucide-react';

export default function Home() {
  const todayStr = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(todayStr);
  const [selectedRideType, setSelectedRideType] = useState<RideType>('economy');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [mode, setMode] = useState<'mongodb' | 'in-memory'>('in-memory');
  const [isLoading, setIsLoading] = useState(true);
  const [isResetting, setIsResetting] = useState(false);

  // Fetch bookings and availability for the selected date
  const fetchBookingsData = useCallback(async (isBackground = false) => {
    try {
      if (!isBackground) setIsLoading(true);
      const res = await fetch(`/api/bookings?date=${selectedDate}`);
      const data = await res.json();

      if (data.success) {
        setBookings(data.bookings || []);
        setBookedSlots(data.bookedSlots || []);
        setMode(data.mode || 'in-memory');
      }
    } catch (error) {
      console.error('Failed to load bookings:', error);
      if (!isBackground) {
        toast.error('Network Error', {
          description: 'Failed to synchronize bookings from database.',
        });
      }
    } finally {
      if (!isBackground) setIsLoading(false);
    }
  }, [selectedDate]);

  // Initial fetch and auto-polling every 2.5s for real-time multi-user synchronization
  useEffect(() => {
    fetchBookingsData();
    const interval = setInterval(() => {
      fetchBookingsData(true);
    }, 2500);

    return () => clearInterval(interval);
  }, [fetchBookingsData]);

  // Reset/Seed demo data
  const handleResetData = async () => {
    try {
      setIsResetting(true);
      const res = await fetch('/api/seed', { method: 'POST' });
      const data = await res.json();

      if (data.success) {
        toast.success('Demo Slots Reset', {
          description: data.message || 'Standard test bookings re-seeded.',
        });
        await fetchBookingsData();
      } else {
        toast.error('Reset Failed', { description: data.error });
      }
    } catch (error) {
      console.error('Reset failed:', error);
      toast.error('Could not reset demo data');
    } finally {
      setIsResetting(false);
    }
  };

  const availableSlotsCount = TIME_SLOTS.length - bookedSlots.length;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Header Navbar */}
      <Navbar mode={mode} onResetData={handleResetData} isResetting={isResetting} />

      {/* Main Content */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/80 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-100/70 px-3 py-1 text-xs font-semibold text-amber-900 mb-3 border border-amber-200/60">
              <Sparkles className="h-3.5 w-3.5 text-amber-700" />
              <span>Smart Chauffeur & Cab Scheduler</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Book Your Cab in Advance
            </h1>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mt-1.5 leading-relaxed">
              Pick your departure date, time window, and ride category. Automated slot conflict checking prevents overlapping reservations and notifies riders immediately.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 bg-white border border-slate-200 p-3 rounded-xl shadow-2xs self-start md:self-auto">
            <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0" />
            <div>
              <span className="font-semibold text-slate-800 block">Verified Availability</span>
              <span>All slots refreshed in real-time</span>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <StatsBanner
          totalBookings={bookings.length}
          availableSlotsCount={Math.max(0, availableSlotsCount)}
        />

        {/* Slot Conflict Toast Demo Helper Banner */}
        <SlotConflictDemoCard
          bookedSlots={bookedSlots}
          selectedDate={selectedDate}
          onSelectBookedSlotForDemo={(slot) => {
            toast.error('This slot is not available', {
              description: `The slot ${slot} is booked.`,
            });
          }}
        />

        {/* Two-Column Booking & Reservation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Booking Form */}
          <div className="lg:col-span-7">
            <BookingForm
              bookedSlots={bookedSlots}
              selectedDate={selectedDate}
              onChangeDate={setSelectedDate}
              selectedRideType={selectedRideType}
              onChangeRideType={setSelectedRideType}
              onBookingCreated={fetchBookingsData}
            />
          </div>

          {/* Right Column: Live Bookings & Fleet Status */}
          <div className="lg:col-span-5 space-y-6">
            <BookingList
              bookings={bookings}
              isLoading={isLoading}
              onBookingDeleted={fetchBookingsData}
            />

            {/* Live Fleet Status Card */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs space-y-3.5">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Car className="h-4 w-4 text-amber-600" />
                Fleet Coverage & Operations
              </h4>

              <div className="space-y-2.5 text-xs text-slate-600">
                <div className="flex items-center justify-between py-1 border-b border-slate-100">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    City Central & Downtown
                  </span>
                  <span className="font-semibold text-slate-900">12 Cabs Active</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-slate-100">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    Airport Terminals (JFK / LGA)
                  </span>
                  <span className="font-semibold text-slate-900">8 Cabs Active</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-slate-100">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    Silicon Tech Park Sector
                  </span>
                  <span className="font-semibold text-slate-900">6 Cabs Active</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-blue-500" />
                    Green EV Fast Charging
                  </span>
                  <span className="font-semibold text-slate-900">4 Vehicles Ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Minimal Light Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">CabGlide</span>
            <span>• Next.js + MongoDB Cab Scheduling Platform</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Light UI Theme</span>
            <span>• Real-time Toast Conflict Alerts</span>
            <span>• Mongoose Schema</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
