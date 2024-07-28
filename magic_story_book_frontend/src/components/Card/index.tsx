// import React from "react";
import "./Card.css";

interface CardProps {
  image: string;
  name: string;
  description: string;
  height?: string;
}

const Card = (props: CardProps) => {
  const {image, name, description, height } = props;

  return (
    <div className="card" key={name} style={{height: height}}>
      <img src={`${import.meta.env.VITE_PUBLIC_URL}/images/${image}`} alt={name} />
      <div className="card-info">
        <h3>{name}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Card;
