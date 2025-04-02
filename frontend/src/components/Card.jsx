import React from "react";
import { Edit, Copy, Trash2 } from "lucide-react";
import "../styles/Card.css";

const getBarColor = (color) => {
  // Check if the color is white or a close shade
  if (color.toLowerCase() === "#ffffff" || color.toLowerCase() === "white") {
    return "#e9ecef"; // Light gray shade if white
  }
  return color;
};

const Card = ({
  title,
  date,
  timeStart,
  timeEnd,
  description,
  color,
  onEdit,
  onDelete,
  onToggle,
  onCopy,
}) => {
  const handleCopy = () => {
    if (onCopy) onCopy(`${title}\n${date}\n${timeStart} - ${timeEnd}\n${description}`);
  };

  return (
    <div className="card">
      <div
        className="card__color-bar"
        style={{ backgroundColor: getBarColor(color) }}
      />
      <div className="card__content">
        <div className="card__header">
          <h3 className="card__title">{title}</h3>
          <button className="card__icon-btn" onClick={onEdit} aria-label="Edit">
            <Edit size={18} className="card__icon" />
          </button>
        </div>
        <div className="card__date">{date}</div>
        <div className="card__time">{timeStart} – {timeEnd}</div>
        <div className="card__description">{description}</div>
        <div className="card__footer">
          <button
            className={`card__toggle ${onToggle ? "active" : ""}`}
            onClick={() => onToggle(onToggle)}
            aria-label="Toggle"
            aria-pressed={onToggle}
          >
            <div className="card__toggle-thumb"></div>
          </button>
          <button className="card__icon-btn" onClick={handleCopy} aria-label="Copy">
            <Copy size={18} className="card__icon" />
          </button>
          <button className="card__icon-btn" onClick={onDelete} aria-label="Delete">
            <Trash2 size={18} className="card__icon" />
          </button>
        </div>
      </div>
    </div>
  );
};


Card.defaultProps = {
  title: "Appointment",
  date: "Friday, 28 Feb",
  timeStart: "2:35 PM",
  timeEnd: "3:00 PM",
  description: "1hr Group meeting",
  color: "#676767",
  onEdit: () => {},
  onDelete: () => {},
  onToggle: () => {},
  onCopy: () => {},
  isActive: false,
};

export default Card;
