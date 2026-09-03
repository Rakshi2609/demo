# CabGlide — Minimalist Cab Scheduling Application 🚖

A modern, light-themed cab scheduling and reservation platform built with **Next.js (App Router)**, **MongoDB / Mongoose**, **Tailwind CSS**, and **Sonner**.

![Theme](https://img.shields.io/badge/Theme-Minimalist%20Light-amber500)
![Framework](https://img.shields.io/badge/Next.js-16.3-black)
![Database](https://img.shields.io/badge/Database-MongoDB%20%2F%20Mongoose-emerald600)
![Alerts](https://img.shields.io/badge/Alerts-Sonner%20Toast-rose500)

---

## ✨ Features

- 🚕 **Multi-Tier Cab Fleet Selection**:
  - **Glide Compact (Economy)**: Everyday affordable city rides.
  - **Glide Comfort**: Premium sedans with top-rated drivers.
  - **Executive SUV (Premium)**: Luxury black-car fleet for groups & extra luggage.
  - **Green Zero-EV**: 100% electric Tesla & Ioniq zero-emission fleet.

- ⏰ **Interactive Slot Scheduler**:
  - Pick pickup date & browse 1-hour time slots across Morning, Afternoon, Evening, and Night.
  - Real-time slot status indicators (**Available**, **Selected**, **Booked**).

- 🔔 **Real-Time Slot Conflict & "This slot is not available" Toast**:
  - If a user tries to book or select an already occupied time slot, the system immediately triggers a polished Toast Notification:
    > **❌ "This slot is not available"**  
    > *The slot for this vehicle on the selected date is already reserved. Please choose another time.*
  - Dedicated interactive demo buttons to test the alert instantly.

- 🍃 **MongoDB & In-Memory Fallback Engine**:
  - Full **Mongoose Schema** with compound indexes (`date`, `timeSlot`, `rideType`, `status`) to avoid race conditions.
  - Zero-config fallback to an in-memory database if `MONGODB_URI` is not supplied, allowing instant demo execution anywhere.

- 🎨 **Minimalist Light UI Theme**:
  - Clean slate backgrounds (`#f8fafc`), crisp typography, subtle borders, accessible contrast, and responsive layout.

- 📋 **Live Reservations Dashboard**:
  - View all scheduled rides with passenger information, routes, fares, and one-click cancellation.

---

## 🚀 Quick Start

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/Rakshi2609/demo.git
cd demo
npm install
```

### 2. Configure MongoDB (Optional)
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Add your MongoDB connection string in `.env.local`:
```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/cab_booking?retryWrites=true&w=majority
```
*(If omitted, the app automatically runs in In-Memory Demo Mode with pre-seeded occupied slots).*

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/bookings` | Fetch all bookings & booked slots for a date/vehicle |
| `POST` | `/api/bookings` | Schedule a new cab (returns `409 Conflict` if slot unavailable) |
| `DELETE` | `/api/bookings/[id]` | Cancel an existing reservation |
| `POST` | `/api/seed` | Reset and re-seed demo bookings |

---

## 🧪 Testing the "Slot Unavailable" Toast

1. In the booking form, select **Today** and **Glide Compact**.
2. Click on the booked **09:00 AM - 10:00 AM** slot or click the **"Test 'Slot Unavailable' Toast"** button.
3. Observe the immediate toast alert: `❌ This slot is not available`.

---

## 📄 License
MIT
# demo
