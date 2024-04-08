import { useLoaderData } from "react-router-dom";
import { fetchEvents, queryPets } from "../../app/api/firebase";
import PetCalendar from "../../components/Calendar";
import PageMotion from "../../components/PageMotion";
import "./Agenda.css";

export const Loader = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userID = user.id;
  try {
    const pets = await queryPets(userID);
    const events = await fetchEvents(userID);
    const data = {
      pets: pets,
      events: events.events,
    };
    console.log(data);
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

const Agenda = () => {
  const data = useLoaderData();
  return (
    <PageMotion>
      <main className="agenda-page--container">
        <PetCalendar data={data} />
      </main>
    </PageMotion>
  );
};

export default Agenda;
