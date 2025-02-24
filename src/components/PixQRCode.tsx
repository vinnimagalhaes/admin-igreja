import { QRCodeSVG } from 'qrcode.react';
import './PixQRCode.css';

interface PixQRCodeProps {
  amount: number;
}

export function PixQRCode({ amount }: PixQRCodeProps) {
  return (
    <div className="pix-container">
      <p>Funcionalidade PIX em desenvolvimento</p>
      <p>Valor a pagar: R$ {amount.toFixed(2)}</p>
    </div>
  );
}