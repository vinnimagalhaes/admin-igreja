// import { QRCodeSVG } from 'qrcode.react';
import './PixQRCode.css';

interface PixQRCodeProps {
  amount: number;
}

export function PixQRCode({ amount }: PixQRCodeProps) {
  return (
    <div className="pix-qrcode">
      <div className="pix-info">
        <p className="pix-amount">R$ {amount.toFixed(2)}</p>
        <p>Funcionalidade PIX em desenvolvimento</p>
      </div>
    </div>
  );
}