import PropTypes from "prop-types";
import "./components.css";

const PetCheck = ({ petPhoto, petName, isToggled, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`pet-check--button ${isToggled ? "on" : "off"}`}
    >
      <img className="pet-check--photo" src={petPhoto} />
      <h5 className="pet-check--name">{petName}</h5>
    </button>
  );
};

PetCheck.propTypes = {
  petPhoto: PropTypes.string,
  petName: PropTypes.string,
  isToggled: PropTypes.bool,
  onClick: PropTypes.func,
};

export default PetCheck;
