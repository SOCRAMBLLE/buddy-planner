import PropTypes from "prop-types";
import "./petCard.css";
import dogIcon from "../assets/profile/dog.png";
import catIcon from "../assets/profile/cat.png";
import rabbitIcon from "../assets/profile/rabbit.png";

const PetCard = ({ pet }) => {
  let petImage;
  if (pet.type === "dog") {
    petImage = dogIcon;
  } else if (pet.type === "cat") {
    petImage = catIcon;
  } else if (pet.type === "rabbit") {
    petImage = rabbitIcon;
  }

  return (
    <div className="pet-card--container">
      <h2>{pet.name}</h2>
      <img src={pet.image ? pet.image : petImage} alt={pet.name} />
      <p>{pet.breed}</p>
    </div>
  );
};
PetCard.propTypes = {
  pet: PropTypes.object,
};

export default PetCard;
