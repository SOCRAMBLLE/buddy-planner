import { Form, useLoaderData } from "react-router-dom";
import PageMotion from "../../components/PageMotion";
import "./PetFoodDetails.css";
import { getPet } from "../../app/api/firebase";
import { useEffect, useState } from "react";

export const Loader = async ({ params }) => {
  const petId = params.id;
  try {
    const petData = getPet(petId);
    return petData;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const PetFoodDetails = () => {
  const pet = useLoaderData();
  const [petData, setPetData] = useState(pet || null);
  const [foodGrams, setFoodGrams] = useState(pet.data.foodGrams || null);
  console.log(petData);
  useEffect(() => {
    setPetData(pet);
  }, [pet]);

  const handleDecrement = () => {
    setFoodGrams((prev) => Math.max(0, prev - 50));
  };
  const handleIncrement = () => {
    setFoodGrams((prev) => Math.max(0, prev + 50));
  };
  const handleGramsChange = (event) => {
    const value = Math.max(0, parseInt(event.target.value, 10) || 0);
    setFoodGrams(value);
  };

  return (
    <PageMotion>
      <div className="food-details--container">
        {petData.data.foodGrams ? (
          <p>
            <strong>{petData.data.name}</strong> eats{" "}
            <strong>{petData.data.foodGrams}g</strong> p/ day of food
          </p>
        ) : (
          <>
            <p>
              You still didn{"'"}t set the daily food quantity{" "}
              <strong>{petData.data.name}</strong> eats.
            </p>
            <Form className="pet-food--form">
              <div className="pet-foodGramsSet">
                <button onClick={handleDecrement}>-</button>
                <label>
                  <input
                    type="txt"
                    value={foodGrams}
                    name="foodGrams"
                    min="0"
                    onChange={handleGramsChange}
                    onInput="this.parentNode.dataset.value = this.value"
                    size="1"
                  />
                  g
                </label>
                <button onClick={handleIncrement}>+</button>
              </div>

              <button>submit</button>
            </Form>
          </>
        )}
      </div>
    </PageMotion>
  );
};

export default PetFoodDetails;
