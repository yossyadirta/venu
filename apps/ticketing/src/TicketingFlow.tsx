import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { dbClient } from 'api-client';
import { Skeleton } from 'loka';
import { WaitingRoom } from './WaitingRoom';
import { TicketSelection } from './TicketSelection';
import { SeatSelection } from './SeatSelection';

const styles = {
  container: 'flex min-h-screen bg-[#fafafa]',
  leftPane: 'w-[40%] bg-[#0a0a0a] p-[60px] flex flex-col justify-end',
  rightPane: 'w-[60%] py-20 px-[8%]',
  header: 'flex justify-between mb-10',
  skeletonCard:
    'bg-white rounded-3xl py-8 px-8 flex justify-between items-center border border-[#f0f0f0]',
  notFound: 'p-[100px] text-center',
};

export const TicketingFlow = () => {
  const { slug } = useParams<{ slug: string }>();
  const [queuePassed, setQueuePassed] = useState(false);
  const [selectionPassed, setSelectionPassed] = useState(false);

  const { data: event, isLoading } = useQuery({
    queryKey: ['event', slug],
    queryFn: () => dbClient.events.getBySlug(slug as string),
    enabled: !!slug,
  });

  useEffect(() => {
    if (slug) {
      sessionStorage.removeItem(`venu_step_${slug}`);
      sessionStorage.removeItem(`venu_attendee_${slug}`);
      sessionStorage.removeItem(`venu_timer_${slug}`);
    }
  }, [slug]);

  if (isLoading) {
    return (
      <div className="h-screen w-full bg-[#050505] flex items-center justify-center pt-[100px]">
        <div className="text-[10px] lg:text-[12px] tracking-[0.4em] text-white/40 font-bold uppercase flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
          ESTABLISHING CONNECTION
        </div>
      </div>
    );
  }

  if (!event) {
    return <div className={styles.notFound}>Event not found</div>;
  }

  if (!queuePassed) {
    return <WaitingRoom event={event} onComplete={() => setQueuePassed(true)} />;
  }

  if (!selectionPassed) {
    return <TicketSelection event={event} onComplete={() => setSelectionPassed(true)} />;
  }

  return <SeatSelection event={event} />;
};
