import { NavLink, redirect, useLoaderData, Outlet } from "react-router-dom";
import PageMotion from "../../components/PageMotion";
import "./Food.css";
import { queryPets } from "../../app/api/firebase";
import { useState } from "react";

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

const FoodPage = () => {
  const data = useLoaderData();
  const [petData] = useState(data || null);
  return (
    <PageMotion>
      <nav className="food-page--nav">
        {petData.map((pet, index) => (
          <NavLink
            to={pet.id}
            // end
            className={({ isActive }) => (isActive ? "active" : "")}
            key={index}
          >
            <div className="food-page--nav-item">
              <img src={pet.data.imageURL} />
              <p>{pet.data.name}</p>
            </div>
          </NavLink>
        ))}
      </nav>
      <Outlet />
    </PageMotion>
  );
};

export default FoodPage;
