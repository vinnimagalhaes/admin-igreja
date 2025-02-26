import './ContentCard.css';

interface ContentCardProps {
  title: string;
  description: string;
  date: string;
  image?: string;
  status?: string;
  onClick?: () => void;
}

export function ContentCard({ title, description, date, image, status, onClick }: ContentCardProps) {
  return (
    <div className="content-card" onClick={onClick}>
      {image && (
        <div className="card-image">
          <img src={image} alt={title} />
        </div>
      )}
      <div className="card-content">
        <div className="card-header">
          <h3>{title}</h3>
          {status && <span className="card-status">{status}</span>}
        </div>
        <p className="card-description">{description}</p>
        <div className="card-footer">
          <span className="card-date">{date}</span>
        </div>
      </div>
    </div>
  );
} 