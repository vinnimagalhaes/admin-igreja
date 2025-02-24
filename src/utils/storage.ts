export interface Product {
  id: number;
  name: string;
  price: number;
  maxQuantity: number;
  category: 'food' | 'drink' | 'ticket' | 'other';
  description?: string;
  image?: string;
}

export interface Event {
  id: number;
  name: string;
  date: string;
  description: string;
  location: string;
  image: string;
  products: Product[];
}

const EVENTS_KEY = 'church_admin_events';

export const saveEvents = (events: Event[]) => {
  localStorage.setItem(EVENTS_KEY, JSON.stringify(events));
};

export const loadEvents = (): Event[] => {
  const events = localStorage.getItem(EVENTS_KEY);
  return events ? JSON.parse(events) : [];
};