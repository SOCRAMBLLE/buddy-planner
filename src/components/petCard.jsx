import PropTypes from "prop-types";
import "./petCard.css";
import dogIcon from "../assets/profile/dog.png";
import catIcon from "../assets/profile/cat.png";
import rabbitIcon from "../assets/profile/rabbit.png";
import { Link } from "react-router-dom";

const PetCard = ({ pet, id }) => {
  let petImage;
  if (pet.type === "dog") {
    petImage = dogIcon;
  } else if (pet.type === "cat") {
    petImage = catIcon;
  } else if (pet.type === "rabbit") {
    petImage = rabbitIcon;
  }
  console.log("petCard", pet);

  return (
    <Link className="pet-card--link" to={`pet?id=${id}`}>
      <div className="pet-card--container">
        <h2>{pet.name}</h2>
        <img src={pet.imageURL ? pet.imageURL : petImage} alt={pet.name} />
      </div>
    </Link>
  );
};
PetCard.propTypes = {
  pet: PropTypes.object,
  id: PropTypes.string,
};

export default PetCard;
