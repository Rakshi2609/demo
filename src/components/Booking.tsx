"use client";

import { useState } from "react";
import { toast } from "sonner";
import { CalendarCheck, MessageCircle, Phone, CheckCircle2, Sparkles } from "lucide-react";
import { services, salon } from "@/data/salon";
import {
  whatsappLink,
  bookingWhatsappMessage,
  telLink,
  prettyPhone,
} from "@/lib/utils";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

const TIME_SLOTS = [
  "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM",
  "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM",
];

type Form = {
  name: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  message: string;
};

const EMPTY: Form = { name: "", phone: "", service: "", date: "", time: "", message: "" };

export default function Booking() {
  const [form, setForm] = useState<Form>(EMPTY);
  const [submitted, setSubmitted] = useState<Form | null>(null);

  const today = new Date().toISOString().split("T")[0];

  const set = (k: keyof Form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.service) {
      toast.error("Please add your name, phone number and a service.");
      return;
    }
    if (!/^[0-9+\s-]{7,15}$/.test(form.phone.trim())) {
      toast.error("Please enter a valid phone number.");
      return;
    }
    setSubmitted(form);
    toast.success("Appointment request ready — confirm on WhatsApp to lock it in.");
  };

  const waMessage = (f: Form) =>
    bookingWhatsappMessage({
      name: f.name,
      service: f.service,
      date: f.date,
      time: f.time,
      message: f.message,
    });

  return (
    <section id="booking" className="scroll-mt-20 bg-cream-2 py-20 md:py-28">
      <div className="container-x">
        <SectionHeading
          kicker="Book now"
          title="Reserve your spot"
          subtitle="Fill in a few details and confirm instantly on WhatsApp — the fastest way to book with us."
        />

        <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 lg:grid-cols-5">
          {/* Form / confirmation */}
          <Reveal className="lg:col-span-3">
            <div className="rounded-2xl border border-line bg-white p-6 shadow-sm md:p-8">
              {submitted ? (
                <Confirmation form={submitted} waMessage={waMessage(submitted)} onReset={() => { setSubmitted(null); setForm(EMPTY); }} />
              ) : (
                <form onSubmit={onSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <Field label="Your name" required>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => set("name", e.target.value)}
                        placeholder="e.g. Priya Sharma"
                        className={inputCls}
                        autoComplete="name"
                      />
                    </Field>
                    <Field label="Phone number" required>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => set("phone", e.target.value)}
                        placeholder="e.g. 98765 43210"
                        className={inputCls}
                        autoComplete="tel"
                      />
                    </Field>
                  </div>

                  <Field label="Service" required>
                    <select
                      value={form.service}
                      onChange={(e) => set("service", e.target.value)}
                      className={inputCls}
                    >
                      <option value="">Select a service</option>
                      {services.map((s) => (
                        <option key={s.id} value={s.name}>
                          {s.name} — {s.category}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <Field label="Preferred date">
                      <input
                        type="date"
                        min={today}
                        value={form.date}
                        onChange={(e) => set("date", e.target.value)}
                        className={inputCls}
                      />
                    </Field>
                    <Field label="Preferred time">
                      <select
                        value={form.time}
                        onChange={(e) => set("time", e.target.value)}
                        className={inputCls}
                      >
                        <option value="">Any time</option>
                        {TIME_SLOTS.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>

                  <Field label="Message (optional)">
                    <textarea
                      value={form.message}
                      onChange={(e) => set("message", e.target.value)}
                      rows={3}
                      placeholder="Anything we should know?"
                      className={`${inputCls} resize-none`}
                    />
                  </Field>

                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-cream transition-all hover:bg-gold"
                  >
                    <CalendarCheck className="h-5 w-5" />
                    Request Appointment
                  </button>
                  <p className="text-center text-xs text-muted">
                    We&apos;ll confirm your slot on WhatsApp or by phone.
                  </p>
                </form>
              )}
            </div>
          </Reveal>

          {/* Side rail: quick contact */}
          <Reveal delay={100} className="lg:col-span-2">
            <div className="flex h-full flex-col justify-between gap-6 rounded-2xl bg-ink p-6 text-cream md:p-8">
              <div>
                <Sparkles className="h-8 w-8 text-gold-soft" />
                <h3 className="mt-4 font-display text-2xl font-semibold">
                  Prefer to chat?
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-cream/70">
                  Message us on WhatsApp or call directly — we&apos;re happy to
                  suggest the right service and find a time that suits you.
                </p>
              </div>
              <div className="space-y-3">
                <a
                  href={whatsappLink(bookingWhatsappMessage())}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1eb457]"
                >
                  <MessageCircle className="h-5 w-5" fill="white" strokeWidth={0} />
                  Book on WhatsApp
                </a>
                <a
                  href={telLink()}
                  className="flex items-center justify-center gap-2 rounded-full border border-cream/25 px-5 py-3 text-sm font-semibold text-cream transition hover:bg-cream/10"
                >
                  <Phone className="h-4 w-4" />
                  {prettyPhone()}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const inputCls =
  "w-full rounded-xl border border-line bg-cream/40 px-4 py-3 text-sm text-ink placeholder:text-muted/70 outline-none transition focus:border-gold focus:bg-white";

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink-soft">
        {label} {required && <span className="text-gold">*</span>}
      </span>
      {children}
    </label>
  );
}

function Confirmation({
  form,
  waMessage,
  onReset,
}: {
  form: Form;
  waMessage: string;
  onReset: () => void;
}) {
  return (
    <div className="text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
        <CheckCircle2 className="h-9 w-9 text-green-600" />
      </div>
      <h3 className="mt-5 font-display text-2xl font-semibold text-ink">
        Almost done, {form.name.split(" ")[0]}!
      </h3>
      <p className="mx-auto mt-2 max-w-sm text-sm text-muted">
        Tap below to send your request on WhatsApp and we&apos;ll confirm your
        appointment right away.
      </p>

      <div className="mx-auto mt-6 max-w-sm rounded-xl bg-cream-2 p-4 text-left text-sm">
        <Row label="Service" value={form.service} />
        {form.date && <Row label="Date" value={form.date} />}
        {form.time && <Row label="Time" value={form.time} />}
        <Row label="Phone" value={form.phone} />
      </div>

      <a
        href={whatsappLink(waMessage)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#1eb457]"
      >
        <MessageCircle className="h-5 w-5" fill="white" strokeWidth={0} />
        Confirm on WhatsApp
      </a>
      <button
        type="button"
        onClick={onReset}
        className="mt-3 text-sm font-medium text-muted underline-offset-4 hover:text-ink hover:underline"
      >
        Make another booking
      </button>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-line py-1.5 last:border-0">
      <span className="text-muted">{label}</span>
      <span className="font-medium text-ink">{value}</span>
    </div>
  );
}
