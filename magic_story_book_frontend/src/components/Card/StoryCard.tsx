import React, { useState } from "react";
import "./StoryCard.css";
import { MdDeleteForever } from "react-icons/md";
import { capitalizeFirstLetter } from "../../utiles/helper";

interface StoryCardProps {
  id: number;
  title: string;
  image: string;
  onClick: () => void;
  onDelete?: (id: number) => void;
}

const StoryCard: React.FC<StoryCardProps> = ({
  id,
  title,
  image,
  onClick,
  onDelete,
}) => {
  const [bgImage, setBgImage] = useState(image);

  const handleError = () => {
    setBgImage("/images/default2.webp");
  };

  console.log("Image URL:", image);
  const capitalizedTitle = capitalizeFirstLetter(title);
  return (
    <div
      className="story-card"
      onClick={onClick}
      key={id}
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {onDelete && (
        <MdDeleteForever
          onClick={(e) => {
            e.stopPropagation();
            onDelete(id);
          }}
          className="story-card-delete"
        />
      )}

      <div className="story-card-content">
        <h3 className="story-card-title">{capitalizedTitle}</h3>
      </div>
      <img
        src={image}
        alt={title}
        onError={handleError}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default StoryCard;
