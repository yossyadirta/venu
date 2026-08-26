export interface Event {
  id: string;
  slug: string;
  title: string;
  description: string;
  date: string;
  venue_name: string;
  location: string;
  hero_image_url: string;
  gallery_urls: string[];
  status: 'available' | 'selling_fast' | 'sold_out';
  min_price: number;
}

export interface TicketTier {
  id: string;
  event_id: string;
  name: string;
  price: number;
  available_qty: number;
  perks: string[];
}

export interface Category {
  id: string;
  name: string;
  icon_svg: string;
  color: string;
  count: string;
  bg: string;
}

export interface Stat {
  id: string;
  value: number;
  suffix: string;
  label: string;
  format: boolean;
}

export interface Review {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  text: string;
  event: string;
}

export interface Venue {
  id: string;
  name: string;
  city: string;
  events_count: number;
  img: string;
}

export interface Partner {
  id: string;
  name: string;
  logo_svg: string;
}
