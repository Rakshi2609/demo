'use client';

import React from 'react';
import { TIME_SLOTS } from '@/lib/constants';
import { Clock, Lock, CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react';

interface TimeSlotPickerProps {
  selectedSlot: string;
  bookedSlots: string[];
  onSelectSlot: (slotLabel: string) => void;
  onSlotConflictClick: (slotLabel: string) => void;
  selectedDate: string;
}

export function TimeSlotPicker({
  selectedSlot,
  bookedSlots,
  onSelectSlot,
  onSlotConflictClick,
  selectedDate,
}: TimeSlotPickerProps) {
  const periods = ['Morning', 'Afternoon', 'Evening', 'Night'] as const;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-amber-600" />
          <label className="text-sm font-semibold text-slate-800">
            3. Choose Scheduled Time Slot
          </label>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5 text-slate-600">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
            <span>Available</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-600">
            <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
            <span>Booked (Unavailable)</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-600">
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
            <span>Selected</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {periods.map((period) => {
          const slotsInPeriod = TIME_SLOTS.filter((s) => s.period === period);
          if (slotsInPeriod.length === 0) return null;

          return (
            <div key={period} className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                <span>{period}</span>
                <div className="h-px flex-1 bg-slate-100" />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                {slotsInPeriod.map((slot) => {
                  const isBooked = bookedSlots.includes(slot.label);
                  const isSelected = selectedSlot === slot.label;

                  if (isBooked) {
                    return (
                      <button
                        key={slot.id}
                        type="button"
                        onClick={() => onSlotConflictClick(slot.label)}
                        className="group relative flex items-center justify-between px-3 py-2.5 rounded-lg border border-rose-200/70 bg-rose-50/40 text-left transition-all hover:bg-rose-100/50 hover:border-rose-300 cursor-not-allowed"
                        title="This slot is already booked. Click to test availability alert."
                      >
                        <div className="flex items-center gap-1.5">
                          <Lock className="h-3.5 w-3.5 text-rose-500 shrink-0" />
                          <span className="text-xs font-medium text-slate-600 line-through decoration-rose-400/80">
                            {slot.label.split(' - ')[0]}
                          </span>
                        </div>
                        <span className="rounded bg-rose-100 px-1.5 py-0.5 text-[10px] font-semibold text-rose-700">
                          Booked
                        </span>
                      </button>
                    );
                  }

                  return (
                    <button
                      key={slot.id}
                      type="button"
                      onClick={() => onSelectSlot(slot.label)}
                      className={`relative flex items-center justify-between px-3 py-2.5 rounded-lg border text-left transition-all duration-150 ${
                        isSelected
                          ? 'border-amber-500 bg-amber-500 text-slate-950 font-semibold shadow-xs'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-amber-300 hover:bg-amber-50/20'
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <Clock
                          className={`h-3.5 w-3.5 ${
                            isSelected ? 'text-slate-950' : 'text-slate-400'
                          }`}
                        />
                        <span className="text-xs font-medium">
                          {slot.label.split(' - ')[0]}
                        </span>
                      </div>

                      {isSelected ? (
                        <CheckCircle2 className="h-3.5 w-3.5 text-slate-950" />
                      ) : slot.isPopular ? (
                        <span className="text-[10px] text-amber-600 flex items-center gap-0.5">
                          <Sparkles className="h-2.5 w-2.5" /> Peak
                        </span>
                      ) : (
                        <span className="text-[10px] text-emerald-600 font-medium">Open</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {bookedSlots.length > 0 && (
        <div className="flex items-center gap-2 rounded-lg bg-slate-50 border border-slate-200/80 p-2.5 text-xs text-slate-600">
          <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />
          <span>
            Highlighted red slots are already scheduled by other riders for{' '}
            <strong className="text-slate-800">{selectedDate}</strong>. Clicking a booked slot simulates the availability check toast.
          </span>
        </div>
      )}
    </div>
  );
}
