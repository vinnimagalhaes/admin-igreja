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

const EVENTS_KEY = 'events';

export const saveEvents = (events: any[]) => {
  try {
    localStorage.setItem(EVENTS_KEY, JSON.stringify(events));
  } catch (error) {
    console.error('Erro ao salvar eventos:', error);
  }
};

export const loadEvents = () => {
  try {
    const events = localStorage.getItem(EVENTS_KEY);
    return events ? JSON.parse(events) : [];
  } catch (error) {
    console.error('Erro ao carregar eventos:', error);
    return [];
  }
};