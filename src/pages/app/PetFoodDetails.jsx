import { Form, useLoaderData } from "react-router-dom";
import PageMotion from "../../components/PageMotion";
import "./PetFoodDetails.css";
import { editPet, getPet } from "../../app/api/firebase";
import { useEffect, useState } from "react";
import { GrRevert } from "react-icons/gr";
import { FaSave, FaPlus, FaMinus } from "react-icons/fa";

export const Loader = async ({ params }) => {
  const petId = params.id;
  try {
    const petData = await getPet(petId);
    return petData;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const PetFoodDetails = () => {
  const pet = useLoaderData();
  const [petData, setPetData] = useState(pet || null);
  const [foodQnty, setFoodQnty] = useState(pet.data.foodGrams || 0);
  const [editQnty, setEditQnty] = useState(false);
  useEffect(() => {
    setPetData(pet || null);
  }, [pet]);

  const handleDecrement = () => {
    setFoodQnty((prev) => Math.max(0, prev - 50));
  };
  const handleIncrement = () => {
    setFoodQnty((prev) => Math.max(0, prev + 50));
  };
  const handleGramsChange = (event) => {
    const value = Math.max(0, parseInt(event.target.value, 10) || 0);
    setFoodQnty(value);
  };
  const handleGramsSubmit = async () => {
    const updatedData = { ...petData.data, foodGrams: foodQnty };
    try {
      const response = await editPet(petData.id, updatedData);
      setEditQnty(false);
      return response;
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
  };

  return (
    <PageMotion>
      <div className="food-details--container">
        {petData.data.foodGrams ? (
          <>
            <p>
              <strong>{petData.data.name}</strong> eats{" "}
              <strong>{petData.data.foodGrams}g</strong> of food p/ day{" "}
            </p>
            {editQnty ? (
              <Form className="pet-food--form">
                <label>
                  How many grams of food <strong>{petData.data.name}</strong>{" "}
                  eats per day?
                </label>
                <div className="pet-foodGramsSet">
                  <button onClick={handleDecrement}>
                    <FaMinus />
                  </button>
                  <label>
                    <input
                      type="txt"
                      value={foodQnty}
                      name="foodGrams"
                      onChange={handleGramsChange}
                      onInput="this.parentNode.dataset.value = this.value"
                      size="1"
                    />
                    g
                  </label>
                  <button onClick={handleIncrement}>
                    <FaPlus />
                  </button>
                </div>
                <div className="pet-foodGramsSet-actions">
                  <button onClick={() => setEditQnty(false)}>
                    <GrRevert />
                  </button>
                  <button onClick={handleGramsSubmit}>
                    <FaSave />
                  </button>
                </div>
              </Form>
            ) : (
              <button
                className="editDaily-btn"
                onClick={() => setEditQnty(true)}
              >
                Edit Daily Quantity
              </button>
            )}
          </>
        ) : (
          <>
            <p>
              You still didn{"'"}t set the daily food quantity{" "}
              <strong>{petData.data.name}</strong> eats.
            </p>
            <Form className="pet-food--form">
              <label>
                How many grams of food <strong>{petData.data.name}</strong> eats
                per day?
              </label>
              <div className="pet-foodGramsSet">
                <button onClick={handleDecrement}>
                  <FaMinus />
                </button>
                <label>
                  <input
                    type="txt"
                    value={foodQnty}
                    name="foodGrams"
                    onChange={handleGramsChange}
                    onInput="this.parentNode.dataset.value = this.value"
                    size="1"
                  />
                  g
                </label>
                <button onClick={handleIncrement}>
                  <FaPlus />
                </button>
              </div>
              <div className="pet-foodGramsSet-actions oneButton">
                <button className="" onClick={handleGramsSubmit}>
                  <FaSave />
                </button>
              </div>
            </Form>
          </>
        )}
      </div>
    </PageMotion>
  );
};

export default PetFoodDetails;
