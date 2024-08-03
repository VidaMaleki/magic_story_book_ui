import "./Card.css";

interface CardProps {
  image: string;
  name: string;
  description: string;
  selected: boolean;
  height?: string;
  onClick: () => void;
}

const Card: React.FC<CardProps> = (props) => {
  const { image, name, description, height, selected, onClick } = props;

  return (
    <div 
      className={`card ${selected ? "selected" : ""}`} 
      style={{ height: height }} 
      onClick={onClick}
    >
      <img src={image} alt={name} />
      <div className="card-info">
        <h3>{name}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Card;
