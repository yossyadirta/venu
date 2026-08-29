import { Event, TicketTier } from './types';
import { supabase } from './supabase';

const BROKEN_IMG_URL =
  'https://images.unsplash.com/photo-1556761175-5973dc0f32d7?q=80&w=3000&auto=format&fit=crop';
const FIXED_IMG_URL =
  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=800&fit=crop&q=80';

const sanitizeEvent = (e: any): Event => {
  if (e && e.hero_image_url === BROKEN_IMG_URL) {
    return { ...e, hero_image_url: FIXED_IMG_URL };
  }
  return e;
};

export const dbClient = {
  events: {
    getTrending: async (): Promise<Event[]> => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: true })
        .limit(20);

      if (error) throw error;
      return data.map(sanitizeEvent);
    },
    getBySlug: async (slug: string): Promise<Event | null> => {
      const { data, error } = await supabase.from('events').select('*').eq('slug', slug).single();

      if (error) {
        if (error.code === 'PGRST116') return null;
        throw error;
      }

      return sanitizeEvent(data);
    },
    search: async (
      query?: string,
      category?: string,
      location?: string,
      searchDate?: string
    ): Promise<Event[]> => {
      let q = supabase.from('events').select('*');

      if (query) {
        q = q.or(
          `title.ilike.%${query}%,description.ilike.%${query}%,location.ilike.%${query}%,venue_name.ilike.%${query}%`
        );
      }

      if (category && category !== 'All') {
        q = q.or(`title.ilike.%${category}%,description.ilike.%${category}%`);
      }

      if (location && location !== 'All Locations') {
        q = q.ilike('location', `%${location}%`);
      }

      if (searchDate && searchDate !== 'anytime') {
        if (searchDate === 'this_weekend') {
          const today = new Date();
          const dayOfWeek = today.getDay();
          const daysUntilFriday = dayOfWeek <= 5 ? 5 - dayOfWeek : 6;

          const friday = new Date(today);
          friday.setDate(today.getDate() + daysUntilFriday);
          friday.setHours(0, 0, 0, 0);

          const sunday = new Date(friday);
          sunday.setDate(friday.getDate() + 2);
          sunday.setHours(23, 59, 59, 999);

          q = q.gte('date', friday.toISOString()).lte('date', sunday.toISOString());
        } else if (searchDate === 'this_month') {
          const today = new Date();
          const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
          const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
          lastDay.setHours(23, 59, 59, 999);

          q = q.gte('date', firstDay.toISOString()).lte('date', lastDay.toISOString());
        } else {
          q = q
            .gte('date', `${searchDate}T00:00:00.000Z`)
            .lte('date', `${searchDate}T23:59:59.999Z`);
        }
      }

      const { data, error } = await q.order('date', { ascending: true });
      if (error) throw error;
      return data.map(sanitizeEvent);
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
  bookings: {
    create: async (bookingData: Omit<import('./types').Booking, 'id' | 'created_at'>) => {
      const { data, error } = await supabase.from('bookings').insert(bookingData).select().single();

      if (error) throw error;
      return data;
    },
    getUserBookings: async () => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('bookings')
        .select(
          `
          *,
          event:events(*)
        `
        )
        .eq('user_id', userData.user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return data.map((b) => ({
        ...b,
        event: sanitizeEvent(b.event),
      }));
    },
  },
  auth: {
    getUser: async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) throw error;
      return data.user;
    },
    getSession: async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) throw error;
      return data.session;
    },
    signInWithOtp: async (email: string, redirectTo?: string) => {
      const { data, error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: redirectTo,
        },
      });
      if (error) throw error;
      return data;
    },
    signInWithPassword: async (email: string, password: string) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      return data;
    },
    signUp: async (email: string, password: string, name: string) => {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      });
      if (error) throw error;
      return data;
    },
    signOut: async () => {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    },
    resetPassword: async (email: string, redirectTo?: string) => {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: redirectTo || `${window.location.origin}/auth?reset=true`,
      });
      if (error) throw error;
      return data;
    },
    updatePassword: async (password: string) => {
      const { data, error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      return data;
    },
  },
};
