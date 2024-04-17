import { useLocation, Link } from "react-router-dom";
import "./DashPetCard.css";
import PropTypes from "prop-types";
import pawIcon from "../assets/brand/paw.png";
import { PiDotOutlineFill } from "react-icons/pi";
import buddyBowlEmpty from "../assets/misc/buddy-bowl.png";
import buddyBowlFull from "../assets/misc/buddy-bowl-full.png";
import buddyBowlHalf from "../assets/misc/buddy-bowl-half.png";

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

  const getTodaysFoodIntake = () => {
    const today = new Date().toISOString().slice(0, 10);
    const todaysEntries = pet.foodIntake.filter(
      (entry) => entry.date.slice(0, 10) === today
    );
    return todaysEntries.reduce((total, entry) => total + entry.grams, 0);
  };

  const todaysIntake = getTodaysFoodIntake();
  const dailyGoal = pet.foodGrams;

  let bowlImage;
  let statusMessage;

  if (todaysIntake === 0) {
    bowlImage = buddyBowlEmpty;
    statusMessage = "No food recorded yet for today.";
  } else if (todaysIntake < dailyGoal) {
    bowlImage = buddyBowlHalf;
    statusMessage = `${pet.name} has eaten ${todaysIntake}g of ${dailyGoal}g today.`;
  } else {
    bowlImage = buddyBowlFull;
    statusMessage = `${pet.name} already have eaten the daily dose today ✅`;
  }

  return (
    <div className="dash-pet">
      <Link
        className="dash-pet--link"
        to={`/profile/pet?id=${id}&back=${pathname}`}
      >
        <div className="dash-pet--header">
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
      <div className="dash-pet--infos">
        <Link to={`food/${pet.id}/history`}>
          <img src={bowlImage} />
          <p>{statusMessage}</p>
        </Link>
      </div>
    </div>
  );
};
DashPetCard.propTypes = {
  pet: PropTypes.object,
  id: PropTypes.string,
};

export default DashPetCard;
