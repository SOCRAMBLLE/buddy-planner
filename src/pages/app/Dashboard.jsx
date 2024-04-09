import { useLoaderData, redirect } from "react-router-dom";
import { queryPets } from "../../app/api/firebase";
import "./Dashboard.css";
import DashPetCard from "../../components/DashPetCard";
import PageMotion from "../../components/PageMotion";

export const Loader = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    return redirect("/auth");
  }
  const userID = user.id;
  try {
    const pets = await queryPets(userID);
    return pets;
  } catch (error) {
    throw new Error(error);
  }
};

const Dashboard = () => {
  const data = useLoaderData();

  return (
    <PageMotion>
      <main className="dashboard--container">
        <div className="dash--pet-container">
          {data.map((pet, index) => (
            <DashPetCard key={index} pet={pet.data} id={pet.id} />
          ))}
        </div>
      </main>
    </PageMotion>
  );
};

export default Dashboard;
