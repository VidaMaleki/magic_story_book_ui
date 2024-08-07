import React from "react";
import "./StoryCard.css";
import { MdDeleteForever } from "react-icons/md";

interface StoryCardProps {
  id: number;
  title: string;
  image: string;
  onClick: () => void;
  onDelete: (id: number) => void;
}

const StoryCard: React.FC<StoryCardProps> = ({ id, title, image, onClick, onDelete }) => {
  console.log("Image URL:", image);
  return (
    <div
      className="story-card"
      onClick={onClick}
      key={id}
      style={{ backgroundImage: `url(${image})` }}
    >
      <MdDeleteForever onClick={(e) => { e.stopPropagation(); onDelete(id); }} className="story-card-delete" />
      <div className="story-card-content">
        <h3 className="story-card-title">{title}</h3>
      </div>
    </div>
  );
};

export default StoryCard;
