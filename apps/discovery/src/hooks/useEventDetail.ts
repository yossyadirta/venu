import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { dbClient } from 'api-client';

export const useEventDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const { data: event, isLoading } = useQuery({
    queryKey: ['event', slug],
    queryFn: () => dbClient.events.getBySlug(slug as string),
    enabled: !!slug,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const handleGetTickets = async () => {
    if (!event) return;
    const session = await dbClient.auth.getSession();
    if (session) {
      navigate(`/tickets/${event.slug}`);
    } else {
      window.location.href = `/auth?redirectTo=/tickets/${event.slug}`;
    }
  };

  return {
    navigate,
    event,
    isLoading,
    handleGetTickets,
  };
};
