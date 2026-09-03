'use client';

import React from 'react';
import { CarTaxiFront, Database, RefreshCw, Sparkles, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  mode: 'mongodb' | 'in-memory';
  onResetData: () => void;
  isResetting: boolean;
}

export function Navbar({ mode, onResetData, isResetting }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500 text-slate-950 shadow-sm shadow-amber-500/20">
            <CarTaxiFront className="h-6 w-6 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold tracking-tight text-slate-900">CabGlide</span>
              <span className="rounded-md bg-amber-100 px-1.5 py-0.5 text-[10px] font-semibold tracking-wide text-amber-900 uppercase">
                Scheduler
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block">
              Precision Cab & Chauffeur Slot Booking
            </p>
          </div>
        </div>

        {/* Status & Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mode Badge */}
          <div
            className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium border ${
              mode === 'mongodb'
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : 'bg-blue-50 text-blue-700 border-blue-200'
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${
                mode === 'mongodb' ? 'bg-emerald-500 animate-pulse' : 'bg-blue-500'
              }`}
            />
            <Database className="h-3.5 w-3.5 hidden sm:inline" />
            <span>{mode === 'mongodb' ? 'MongoDB Connected' : 'Demo Memory Mode'}</span>
          </div>

          {/* Reset Demo Data Button */}
          <button
            onClick={onResetData}
            disabled={isResetting}
            title="Reset demo bookings and pre-occupied slots"
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-900 disabled:opacity-50"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isResetting ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Reset Demo Slots</span>
          </button>

          {/* Quality Guarantee Pill */}
          <div className="hidden lg:flex items-center gap-1.5 text-xs text-slate-500 bg-slate-100/80 px-2.5 py-1 rounded-md">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
            <span>Guaranteed Pickups</span>
          </div>
        </div>
      </div>
    </header>
  );
}
