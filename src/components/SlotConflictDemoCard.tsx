'use client';

import React from 'react';
import { toast } from 'sonner';
import { AlertCircle, HelpCircle, CheckCircle, ArrowRight } from 'lucide-react';

interface SlotConflictDemoCardProps {
  bookedSlots: string[];
  selectedDate: string;
  onSelectBookedSlotForDemo: (slot: string) => void;
}

export function SlotConflictDemoCard({
  bookedSlots,
  selectedDate,
  onSelectBookedSlotForDemo,
}: SlotConflictDemoCardProps) {
  const handleDirectToastTrigger = () => {
    toast.error('This slot is not available', {
      description: `The 09:00 AM - 10:00 AM slot is currently booked on ${selectedDate}. Please select another time.`,
      duration: 5000,
    });
  };

  return (
    <div className="rounded-2xl border border-amber-200/80 bg-linear-to-br from-amber-50/70 via-orange-50/30 to-white p-5 shadow-xs">
      <div className="flex items-start gap-3">
        <div className="rounded-xl bg-amber-500/10 p-2.5 text-amber-700">
          <HelpCircle className="h-5 w-5" />
        </div>
        <div className="space-y-1.5 flex-1">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-slate-900">
              Demo Feature: Slot Conflict & Unavailable Toast
            </h4>
            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-900">
              Interactive Test
            </span>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            The app prevents double bookings. When a passenger selects an occupied time slot or submits a conflicting reservation, an immediate toast alert is triggered: <strong className="text-rose-700">"This slot is not available"</strong>.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleDirectToastTrigger}
              className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-800 transition"
            >
              <AlertCircle className="h-3.5 w-3.5 text-amber-400" />
              <span>Trigger "Slot Not Available" Toast</span>
            </button>

            {bookedSlots.length > 0 && (
              <span className="text-[11px] text-slate-500">
                Currently booked on {selectedDate}:{' '}
                <span className="font-semibold text-rose-600">{bookedSlots.join(', ')}</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
