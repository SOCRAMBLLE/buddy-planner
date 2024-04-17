import { Form, useLoaderData } from "react-router-dom";
import PageMotion from "../../components/PageMotion";
import "./PetFoodDetails.css";
import { editPet, getPet } from "../../app/api/firebase";
import { useEffect, useState } from "react";
import { GrRevert } from "react-icons/gr";
import { FaSave, FaPlus, FaMinus } from "react-icons/fa";
import buddyBowlEmpty from "../../assets/misc/buddy-bowl.png";
import buddyBowlFull from "../../assets/misc/buddy-bowl-full.png";
import buddyBowlHalf from "../../assets/misc/buddy-bowl-half.png";

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
  const [addFoodEntry, setAddFoodEntry] = useState(false);
  const [foodEntry, setFoodEntry] = useState(pet.data.foodGrams || 0);
  useEffect(() => {
    setPetData(pet || null);
  }, [pet]);

  const handleDecrement = (entry) => {
    if (entry === "foodQnty") {
      setFoodQnty((prev) => Math.max(0, prev - 50));
    } else if (entry === "foodEntry") {
      setFoodEntry((prev) => Math.max(0, prev - 50));
    }
  };
  const handleIncrement = (entry) => {
    if (entry === "foodQnty") {
      setFoodQnty((prev) => Math.max(0, prev + 50));
    } else if (entry === "foodEntry") {
      setFoodEntry((prev) => Math.max(0, prev + 50));
    }
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

  function foodEntryModal() {
    return (
      <Form className="pet-food--form">
        <label>
          How many grams of food <strong>{petData.data.name}</strong> have
          eaten?
        </label>
        <div className="pet-foodGramsSet">
          <button
            className="food-page-button"
            onClick={() => handleDecrement("foodEntry")}
          >
            <FaMinus />
          </button>
          <label>
            <input
              type="txt"
              value={foodEntry}
              name="foodGrams"
              onChange={handleDailyChange}
              onInput="this.parentNode.dataset.value = this.value"
              size="1"
            />
            g
          </label>
          <button
            className="food-page-button"
            onClick={() => handleIncrement("foodEntry")}
          >
            <FaPlus />
          </button>
        </div>
        <div className="pet-foodGramsSet-actions">
          <button
            className="food-page-button"
            onClick={() => setAddFoodEntry(false)}
          >
            <GrRevert />
          </button>
          <button className="food-page-button" onClick={handleDailyEntry}>
            <FaSave />
          </button>
        </div>
      </Form>
    );
  }

  const handleDailyEntry = async () => {};
  const handleDailyChange = (event) => {
    const value = Math.max(0, parseInt(event.target.value, 10) || 0);
    setFoodEntry(value);
  };

  return (
    <PageMotion>
      <div className="food-details--container">
        {petData.data.foodGrams ? (
          <>
            <div className="food-details--daily-counter">
              {addFoodEntry ? (
                foodEntryModal()
              ) : (
                <>
                  <button
                    className="food-page-button add-food-entry-btn {"
                    onClick={() => setAddFoodEntry(true)}
                  >
                    Add Food Entry
                  </button>
                </>
              )}
              <span>
                <img src={buddyBowlEmpty} />
              </span>
              <span>
                <img src={buddyBowlHalf} />
              </span>
              <span>
                <img src={buddyBowlFull} />
                <pre>
                  {petData.data.name} already have eaten the daily dose today ✅
                </pre>
              </span>
            </div>

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
                  <button
                    className="food-page-button"
                    onClick={() => handleDecrement("foodQnty")}
                  >
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
                  <button
                    className="food-page-button"
                    onClick={() => handleIncrement("foodQnty")}
                  >
                    <FaPlus />
                  </button>
                </div>
                <div className="pet-foodGramsSet-actions">
                  <button
                    className="food-page-button"
                    onClick={() => setEditQnty(false)}
                  >
                    <GrRevert />
                  </button>
                  <button
                    className="food-page-button"
                    onClick={handleGramsSubmit}
                  >
                    <FaSave />
                  </button>
                </div>
              </Form>
            ) : (
              <button
                className="food-page-button editDaily-btn"
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
                <button
                  className="food-page-button"
                  onClick={() => handleDecrement("foodQnty")}
                >
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
                <button
                  className="food-page-button"
                  onClick={() => handleIncrement("foodQnty")}
                >
                  <FaPlus />
                </button>
              </div>
              <div className="pet-foodGramsSet-actions oneButton">
                <button
                  className="food-page-button"
                  onClick={handleGramsSubmit}
                >
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
