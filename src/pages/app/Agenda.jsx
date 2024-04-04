import PetCalendar from "../../components/Calendar";
import PageMotion from "../../components/PageMotion";
import "./Agenda.css";

const Agenda = () => {
  return (
    <PageMotion>
      <main className="agenda-page--container">
        <PetCalendar />
      </main>
    </PageMotion>
  );
};

export default Agenda;
