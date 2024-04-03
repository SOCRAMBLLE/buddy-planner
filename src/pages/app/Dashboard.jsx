import { useLoaderData } from "react-router-dom";
import { queryPets } from "../../app/api/firebase";
import "./Dashboard.css";
import PetCard from "../../components/petCard";

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

const Dashboard = () => {
  const data = useLoaderData();
  console.log(data);

  return (
    <main className="dashboard--container">
      {data.map((pet, index) => (
        <PetCard key={index} pet={pet.data} id={pet.id} />
      ))}
    </main>
  );
};

export default Dashboard;
