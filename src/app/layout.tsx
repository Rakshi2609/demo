import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CabGlide — Minimalist Cab Scheduling Application',
  description: 'Precision cab booking and slot scheduling system with real-time availability check',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full bg-slate-50">
      <body className={`${inter.className} min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased`}>
        {children}
        <Toaster
          position="top-right"
          theme="light"
          richColors
          closeButton
          toastOptions={{
            duration: 4000,
            className: 'text-sm font-medium shadow-lg border border-slate-200',
          }}
        />
      </body>
    </html>
  );
}
