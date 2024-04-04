import PropTypes from "prop-types";
import "./petCard.css";
import pawIcon from "../assets/brand/paw.png";
import { Link, useLocation } from "react-router-dom";

const PetCard = ({ pet, id }) => {
  const { pathname } = useLocation();

  let petImage = pawIcon;

  return (
    <Link
      className="pet-card--link"
      to={`/profile/pet?id=${id}&back=${pathname}`}
    >
      <div className="pet-card--container">
        <h2>{pet.name}</h2>
        <img
          className="pet-card--petPhoto"
          src={pet.imageURL ? pet.imageURL : petImage}
          alt={pet.name}
        />
      </div>
    </Link>
  );
};
PetCard.propTypes = {
  pet: PropTypes.object,
  id: PropTypes.string,
};

export default PetCard;
