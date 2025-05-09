import ArrowIcon from '../../../../assets/svgs/arrow-right-alt.svg';
import '../../../../assets/styles/top-news.css';

interface NewsCardProps {
  title: string;
  text: string;
  date: string;
  category: string;
  image?: string;
  onClick: () => void;
}

function TopNewsCard({
  title,
  text,
  date,
  category,
  image,
  onClick,
}: NewsCardProps) {
  return (
    <div className="top-news-card" onClick={onClick}>
      <div
        className="top-news-image"
        style={{ backgroundImage: image ? `url(${image})` : undefined }}
      ></div>
      <div className="top-news-content">
        <span className="top-news-icon">important</span>
        <div className="top-news-header">
          <h3 className="top-news-title">{title}</h3>
          <p className="top-news-category">{category}</p>
        </div>
        <p className="top-news-text">{text.slice(0, 170)}...</p>
        <div className="top-news-footer">
          <span className="top-news-date">{date}</span>
          <ArrowIcon className="top-news-arrow-icon" />
        </div>
      </div>
    </div>
  );
}

export default TopNewsCard;
