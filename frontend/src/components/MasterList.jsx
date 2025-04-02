import React from 'react';
import { Users, Ban, Check } from 'lucide-react';
import "../styles/MasterList.css";

const MasterList = ({
  date,
  time,
  title,
  subtitle,
  buttons = [], // Default to an empty array
  onButtonClick,
  participantCount,
  className,
  onParticipantClick,
}) => {
  // Check if there's any valid content to render
  const hasContent =
    date ||
    time ||
    title ||
    subtitle ||
    (buttons.length > 0) || // Ensure buttons are checked properly
    (participantCount !== undefined && participantCount !== null); 

  if (!hasContent) return null; // No rendering if there's no content

  const renderButton = (button) => {
    const { type, text, onClick } = button;
    const buttonText = text || type.charAt(0).toUpperCase() + type.slice(1);

    return (
      <button
        key={type}
        onClick={() => (onClick ? onClick() : onButtonClick?.(type))}
        className={`master-list-button master-list-button-${type}`}
      >
        {type === 'accept' && <Check size={16} className="button-icon" />}
        {type === 'reject' && <Ban size={16} className="button-icon" />}
        {buttonText}
      </button>
    );
  };

  return (
    <div className={`master-list-item animate-fadeIn ${className || ''}`}>
      <div className="master-list-item-content">
        {(date || time) && (
          <div className="master-list-date-time">
            {date && <p className="master-list-date">{date}</p>}
            {time && <p className="master-list-time">{time}</p>}
          </div>
        )}

        <div className="master-list-details">
          {title && <h3 className="master-list-title">{title}</h3>}
          {subtitle && <p className="master-list-subtitle">{subtitle}</p>}
        </div>
      </div>

      <div className="master-list-actions">
        {buttons.length > 0 && (
          <div className="master-list-buttons">{buttons.map(renderButton)}</div>
        )}

        {participantCount !== undefined && participantCount !== null && (
          <div
            className="master-list-participants"
            onClick={onParticipantClick}
            style={{ cursor: 'pointer' }}
          >
            <Users size={20} className="master-list-participants-icon" />
            <span className="master-list-participants-text">
              {participantCount} {participantCount === 1 ? 'person' : 'people'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MasterList;
