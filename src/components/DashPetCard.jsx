import { useLocation, Link } from "react-router-dom";
import "./DashPetCard.css";
import PropTypes from "prop-types";
import pawIcon from "../assets/brand/paw.png";
import { PiDotOutlineFill } from "react-icons/pi";

const DashPetCard = ({ pet, id }) => {
  const { pathname } = useLocation();

  let petImage = pawIcon;

  const petAge = (birthday) => {
    const today = new Date();
    const birthDate = new Date(birthday);
    let age = today.getFullYear() - birthDate.getFullYear();
    let month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month == 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <Link
      className="pet-card--link"
      to={`/profile/pet?id=${id}&back=${pathname}`}
    >
      <div className="dash-pet">
        <img
          className="dash-pet--petPhoto"
          src={pet.imageURL ? pet.imageURL : petImage}
          alt={pet.name}
        />
        <div className="dash-pet--details">
          <h3>{pet.name}</h3>
          <p>
            {pet.breed === "i don't know" ? (
              ""
            ) : (
              <>
                {pet.breed} <PiDotOutlineFill />
              </>
            )}{" "}
            {petAge(pet.birthday)} years old
          </p>
        </div>
      </div>
    </Link>
  );
};
DashPetCard.propTypes = {
  pet: PropTypes.object,
  id: PropTypes.string,
};

export default DashPetCard;
