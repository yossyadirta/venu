import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { dbClient } from 'api-client';
import { DigitalTicket } from './components/DigitalTicket';
import { Typography, Button } from 'loka';

export const StandaloneTicket = () => {
  const { id } = useParams<{ id: string; slug: string }>();
  const navigate = useNavigate();
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const data = await dbClient.bookings.getUserBookings();
        const found = data.find((b: any) => b.id === id);
        if (found) {
          setBooking(found);
        } else {
          setError('Ticket not found or you do not have permission to view it.');
        }
      } catch (err) {
        setError('Failed to load ticket.');
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchTicket();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex flex-col items-center justify-center p-6 text-center">
        <Typography variant="h3" className="mb-4 text-neutral-900">
          {error || 'Ticket Not Found'}
        </Typography>
        <Button variant="outline" onClick={() => window.history.back()}>
          Go Back
        </Button>
      </div>
    );
  }

  const seats: string[] = [];

  if (booking.tickets) {
    Object.entries(booking.tickets).forEach(([tierId, qty]: [string, any]) => {
      for (let i = 0; i < qty; i++) {
        seats.push(`GA-${i + 1}`);
      }
    });
  }

  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col items-center justify-center font-['Inter',sans-serif] px-4 py-24 md:py-32 relative">
      <div className="w-full max-w-4xl mb-8 flex justify-between items-center z-20">
        <Button
          variant="ghost"
          onClick={() => navigate('/my-tickets')}
          className="text-gray-500 hover:text-gray-900 hover:bg-white px-4 py-2 flex items-center gap-2 rounded-full transition-all shadow-sm border border-gray-200 bg-white/50"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to My Tickets
        </Button>
      </div>

      <div className="w-full max-w-4xl relative animate-[fade-in-up_0.5s_ease-out] flex flex-col">
        <div className="bg-white rounded-t-3xl shadow-[0_20px_40px_rgba(0,0,0,0.4)] border border-gray-100 border-b-0 overflow-hidden relative z-10">
          <div className="p-8 md:p-12 flex flex-col items-center justify-center text-center">
            <Typography variant="h2" className="text-gray-900 text-2xl md:text-3xl mb-2">
              Ticket Pass
            </Typography>
            <Typography variant="body" className="text-gray-500 max-w-md mx-auto">
              Present this pass at the venue entrance.
            </Typography>
          </div>
        </div>

        <div className="relative flex flex-col items-center z-20 rounded-b-3xl">
          <div className="absolute inset-0 bg-blue-50 rounded-b-3xl shadow-[0_20px_40px_rgba(0,0,0,0.3)] border border-blue-100 border-t-0 overflow-hidden pointer-events-none">
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

            <div className="flex-1 border-t-2 border-dashed border-blue-200 opacity-60 mx-6" />

            <div className="absolute right-0 w-4 h-8 overflow-hidden">
              <div className="absolute right-[-16px] top-0 w-8 h-8 bg-gray-50 rounded-full border border-blue-100" />
            </div>
          </div>

          <div className="p-8 md:p-12 pt-4 w-full relative z-10">
            <DigitalTicket
              event={booking.event}
              seats={seats.length > 0 ? seats : ['GA-1']}
              attendee={{ name: booking.attendee_name, email: booking.attendee_email }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
