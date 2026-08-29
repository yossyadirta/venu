import React, { useState, useEffect } from 'react';
import { DigitalTicket } from './DigitalTicket';
import { PaymentSuccessScreen } from './PaymentSuccessScreen';
import { Typography, Button } from 'loka';

interface CheckoutSuccessLayoutProps {
  event: any;
  tiers: any[];
  quantities: Record<string, number>;
  seats: string[];
  totalPrice: number;
  attendee: { name: string; email: string };
}

export const CheckoutSuccessLayout: React.FC<CheckoutSuccessLayoutProps> = ({
  event,
  tiers,
  quantities,
  seats,
  totalPrice,
  attendee,
}) => {
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [isRevealed]);

  if (!isRevealed) {
    return (
      <PaymentSuccessScreen
        event={event}
        tiers={tiers}
        quantities={quantities}
        totalPrice={totalPrice}
        attendee={attendee}
        onReveal={() => setIsRevealed(true)}
      />
    );
  }

  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col items-center justify-center font-['Inter',sans-serif] px-4 py-24 md:py-32 relative">
      <div className="w-full max-w-4xl relative animate-[fade-in-up_0.5s_ease-out] flex flex-col">
        <div className="bg-white rounded-t-3xl shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] border border-gray-100 border-b-0 overflow-hidden relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-gray-100 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <Typography variant="h2" className="text-gray-900 text-lg">
                    Email Sent
                  </Typography>
                </div>
                <Typography variant="body" className="text-gray-500 mb-6 leading-relaxed">
                  A PDF copy of your tickets has been sent to{' '}
                  <strong>{attendee?.email || 'your email'}</strong>.
                </Typography>
              </div>
            </div>

            <div className="p-8 md:p-12 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0110 0v4" />
                    </svg>
                  </div>
                  <Typography variant="h2" className="text-gray-900 text-lg">
                    Safely Stored
                  </Typography>
                </div>
                <Typography variant="body" className="text-gray-500 mb-6 leading-relaxed">
                  Your digital passes are stored in your account and can be accessed from any
                  device.
                </Typography>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                <Button
                  variant="primary"
                  className="flex-1 w-full flex items-center justify-center gap-2"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
                  </svg>
                  Download PDF
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="relative flex flex-col items-center z-20 rounded-b-3xl">
          <div className="absolute inset-0 bg-blue-50 rounded-b-3xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-blue-100 border-t-0 overflow-hidden pointer-events-none">
            <div
              className="absolute inset-0 opacity-[0.2] mix-blend-overlay"
              style={{
                backgroundImage:
                  "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')",
              }}
            />
            <div className="absolute top-0 w-full h-[400px] bg-white/60 blur-[100px]" />
          </div>

          <div className="relative w-full h-12 flex items-center z-10">
            <div className="absolute left-0 w-4 h-8 overflow-hidden">
              <div className="absolute left-[-16px] top-0 w-8 h-8 bg-gray-50 rounded-full border border-blue-100" />
            </div>

            <div className="flex-1 border-t-2 border-dashed border-blue-200 mx-4" />

            <div className="absolute right-0 w-4 h-8 overflow-hidden">
              <div className="absolute right-[-16px] top-0 w-8 h-8 bg-gray-50 rounded-full border border-blue-100" />
            </div>
          </div>

          <div className="p-4 md:p-12 pt-4 md:pt-6 w-full relative z-10 flex-1">
            <Typography
              variant="overline"
              className="text-blue-900 mb-6 text-center md:text-left px-4 md:px-0 block"
            >
              Your Digital Pass
            </Typography>

            <DigitalTicket event={event} seats={seats} attendee={attendee} />
            <div className="w-full flex justify-center mt-12 mb-16">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Button
                  variant="pill-outline"
                  onClick={() => (window.location.href = '/')}
                  className="px-8 bg-white border-blue-200 text-blue-900 hover:bg-blue-50"
                >
                  Back to Home
                </Button>
                <Button
                  variant="primary"
                  className="px-8 rounded-full flex items-center gap-2 bg-blue-600 hover:bg-blue-700 hover:shadow-[0_8px_20px_rgba(37,99,235,0.25)]"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Download PDF
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px) scale(0.98); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
      `,
        }}
      />
    </div>
  );
};
