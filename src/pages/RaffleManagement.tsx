import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/shared.css';
import './RaffleManagement.css';

interface RaffleNumber {
  number: string;
  status: 'available' | 'reserved' | 'sold';
  buyerName?: string;
  buyerPhone?: string;
  paymentStatus?: 'pending' | 'confirmed';
}

interface Raffle {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  drawDate: string;
  numbers: RaffleNumber[];
  prizeDescription: string;
  prizeImage: string;
}

export default function RaffleManagement() {
  const { id } = useParams();
  const [raffle, setRaffle] = useState<Raffle | null>(null);
  // ... resto do código continua igual ...
}
