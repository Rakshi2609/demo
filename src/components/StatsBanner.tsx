'use client';

import React from 'react';
import { Car, Clock, ShieldCheck, Zap } from 'lucide-react';

interface StatsBannerProps {
  totalBookings: number;
  availableSlotsCount: number;
}

export function StatsBanner({ totalBookings, availableSlotsCount }: StatsBannerProps) {
  const stats = [
    {
      label: 'Scheduled Rides',
      value: totalBookings.toString(),
      subtext: 'Synchronized in database',
      icon: Car,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
    },
    {
      label: 'Open Time Slots',
      value: availableSlotsCount.toString(),
      subtext: 'Available for immediate booking',
      icon: Clock,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
    },
    {
      label: 'On-Time Guarantee',
      value: '99.4%',
      subtext: 'Driver punctuality score',
      icon: ShieldCheck,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      label: 'Slot Verification',
      value: 'Instant',
      subtext: 'Real-time conflict detection',
      icon: Zap,
      color: 'text-purple-600',
      bg: 'bg-purple-50',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <div
            key={i}
            className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">{stat.label}</span>
              <div className={`p-1.5 rounded-lg ${stat.bg} ${stat.color}`}>
                <Icon className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-2">
              <span className="text-2xl font-black text-slate-900 tracking-tight">
                {stat.value}
              </span>
              <p className="text-[11px] text-slate-400 mt-0.5">{stat.subtext}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
