import PropTypes from "prop-types";

const PetCard = ({ pet }) => {
  return (
    <div>
      <h2>{pet.name}</h2>
      <img src={pet.image} alt={pet.name} />
      <p>{pet.breed}</p>
    </div>
  );
};
PetCard.propTypes = {
  pet: PropTypes.object,
};

export default PetCard;
