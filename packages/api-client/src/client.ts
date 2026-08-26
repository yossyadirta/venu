import { Event, TicketTier } from './types';
import { supabase } from './supabase';

export const dbClient = {
  events: {
    getTrending: async (): Promise<Event[]> => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: true })
        .limit(20);

      if (error) throw error;
      return data as Event[];
    },
    getBySlug: async (slug: string): Promise<Event | null> => {
      const { data, error } = await supabase.from('events').select('*').eq('slug', slug).single();

      if (error) {
        if (error.code === 'PGRST116') return null;
        throw error;
      }
      return data as Event;
    },
  },
  tickets: {
    getTiersByEventId: async (eventId: string): Promise<TicketTier[]> => {
      const { data, error } = await supabase
        .from('ticket_tiers')
        .select('*')
        .eq('event_id', eventId)
        .order('price', { ascending: true });

      if (error) throw error;
      return data as TicketTier[];
    },
  },
};
