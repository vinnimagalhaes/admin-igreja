export interface Product {
  id: string | number;
  name: string;
  price: number;
  imageUrl?: string;
  description?: string;
  type?: string;
  maxQuantity?: number;
}

export interface Event {
  id: string | number;
  title: string;
  date: string;
  location: string;
  description: string;
  imageUrl: string;
  products: Product[];
} 