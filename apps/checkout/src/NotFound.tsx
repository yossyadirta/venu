import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Button } from 'loka';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-neutral-0 flex flex-col items-center justify-center relative overflow-hidden font-sans px-6">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-gradient-to-tr from-primary-subtle to-primary/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-[600px]">
        <div className="text-[clamp(120px,25vw,250px)] font-black leading-[0.75] tracking-[-0.06em] text-primary select-none mb-6">
          404
        </div>

        <Typography variant="h1" className="mb-4">
          Page not found.
        </Typography>

        <Typography variant="bodyLg" muted className="mb-10 max-w-[420px]">
          The page you're looking for doesn't exist or has been moved. Let's get you back to the events.
        </Typography>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Button variant="primary" size="lg" onClick={() => navigate('/')}>
            Back to Home
          </Button>
          <Button variant="pill-outline" size="lg" onClick={() => navigate('/explore')}>
            Explore Events
          </Button>
        </div>
      </div>
    </div>
  );
};
