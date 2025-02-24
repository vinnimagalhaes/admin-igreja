// import { QRCodeSVG } from 'qrcode.react';
import { QRCodeSVG } from 'qrcode.react';
import './PixQRCode.css';

interface PixQRCodeProps {
  amount: number;
  orderId: string;
}

export function PixQRCode({ amount, orderId }: PixQRCodeProps) {
  // Simulando um código PIX (em produção, você usaria uma biblioteca real)
  const pixCode = `00020126580014BR.GOV.BCB.PIX0136123e4567-e89b-12d3-a456-426655440000520400005303986540${amount.toFixed(2)}5802BR5913Igreja Example6009SAO PAULO62070503***63040B6D`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(pixCode);
    alert('Código PIX copiado!');
  };

  return (
    <div className="pix-qrcode">
      <div className="qrcode-container">
        <QRCodeSVG
          value={pixCode}
          size={200}
          level="H"
          includeMargin
        />
      </div>
      <div className="pix-info">
        <p className="pix-amount">R$ {amount.toFixed(2)}</p>
        <button 
          className="copy-button"
          onClick={handleCopyCode}
        >
          Copiar Código PIX
        </button>
      </div>
    </div>
  );
}