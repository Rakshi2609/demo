'use client';

import React from 'react';
import { CAB_OPTIONS } from '@/lib/constants';
import { RideType } from '@/lib/types';
import { Car, Sparkles, Crown, Leaf, Users, Check } from 'lucide-react';

interface VehicleSelectorProps {
  selectedType: RideType;
  onSelect: (type: RideType) => void;
}

export function VehicleSelector({ selectedType, onSelect }: VehicleSelectorProps) {
  const getIcon = (id: RideType) => {
    switch (id) {
      case 'economy':
        return <Car className="h-5 w-5" />;
      case 'comfort':
        return <Sparkles className="h-5 w-5" />;
      case 'premium':
        return <Crown className="h-5 w-5" />;
      case 'ev':
        return <Leaf className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-slate-800">1. Select Vehicle Fleet</label>
        <span className="text-xs text-slate-500">Fixed upfront pricing</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {CAB_OPTIONS.map((cab) => {
          const isSelected = selectedType === cab.id;
          return (
            <button
              key={cab.id}
              type="button"
              onClick={() => onSelect(cab.id)}
              className={`relative flex flex-col text-left p-4 rounded-xl border transition-all duration-200 ${
                isSelected
                  ? 'border-amber-500 bg-amber-50/40 ring-2 ring-amber-400/30 shadow-sm'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/60'
              }`}
            >
              {isSelected && (
                <span className="absolute top-3 right-3 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-slate-950 shadow-xs">
                  <Check className="h-3 w-3 stroke-[3]" />
                </span>
              )}

              <div className="flex items-center gap-2 mb-2">
                <div
                  className={`p-2 rounded-lg ${
                    isSelected ? 'bg-amber-100 text-amber-900' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {getIcon(cab.id)}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">{cab.name}</h4>
                  <div className="flex items-center gap-1 text-[11px] text-slate-500">
                    <Users className="h-3 w-3" />
                    <span>Up to {cab.capacity} guests</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-500 line-clamp-1 mb-3">{cab.tagline}</p>

              <div className="mt-auto pt-2 border-t border-slate-100 flex items-baseline justify-between">
                <span className="text-xs text-slate-400 font-medium">Est. Base Fare</span>
                <span className="text-base font-bold text-slate-900">
                  ${cab.baseFare.toFixed(2)}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
