import { useLoaderData } from "react-router-dom";
import { queryPets } from "../../app/api/firebase";
import PetCalendar from "../../components/Calendar";
import PageMotion from "../../components/PageMotion";
import "./Agenda.css";

export const Loader = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userID = user.id;
  try {
    const pets = await queryPets(userID);
    return pets;
  } catch (error) {
    throw new Error(error);
  }
};

const Agenda = () => {
  const petsData = useLoaderData();
  return (
    <PageMotion>
      <main className="agenda-page--container">
        <PetCalendar petsData={petsData} />
      </main>
    </PageMotion>
  );
};

export default Agenda;
