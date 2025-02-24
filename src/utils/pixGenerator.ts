import { Pix } from 'node-pix';

interface PixData {
  amount: number;
  merchantName: string;
  merchantCity: string;
  txid: string;
  description: string;
}

export function generatePixCode({
  amount,
  merchantName,
  merchantCity,
  txid,
  description
}: PixData): string {
  const pix = Pix({
    version: '01',
    key: '123e4567-e89b-12d3-a456-426655440000', // Sua chave PIX
    name: merchantName,
    city: merchantCity,
    txid: txid,
    amount: amount,
    description: description
  });

  return pix.getBRCode();
}