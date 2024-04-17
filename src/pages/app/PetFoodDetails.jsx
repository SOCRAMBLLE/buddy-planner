import { Form, useLoaderData, useNavigate } from "react-router-dom";
import PageMotion from "../../components/PageMotion";
import "./PetFoodDetails.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { editPet, getPet } from "../../app/api/firebase";
import { useEffect, useState } from "react";
import { GrRevert } from "react-icons/gr";
import { FaSave, FaPlus, FaMinus } from "react-icons/fa";
import buddyBowlEmpty from "../../assets/misc/buddy-bowl.png";
import buddyBowlFull from "../../assets/misc/buddy-bowl-full.png";
import buddyBowlHalf from "../../assets/misc/buddy-bowl-half.png";

export const Loader = async ({ params }) => {
  const petId = params.petid;
  try {
    const petData = await getPet(petId);
    return petData;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const PetFoodDetails = () => {
  const navigate = useNavigate();
  const pet = useLoaderData();
  const [petData, setPetData] = useState(pet || null);
  const [foodQnty, setFoodQnty] = useState(pet.data.foodGrams || 0);
  const [editQnty, setEditQnty] = useState(false);
  const [addFoodEntry, setAddFoodEntry] = useState(false);
  const [foodEntry, setFoodEntry] = useState(pet.data.foodGrams || 0);
  const [entryDate, setEntryDate] = useState(new Date());

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
        <DatePicker
          selected={entryDate}
          onChange={(date) => setEntryDate(date)}
        />
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
              size="3"
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
          <button
            className="food-page-button"
            onClick={() => handleDailyEntry()}
          >
            <FaSave />
          </button>
        </div>
      </Form>
    );
  }

  const handleDailyChange = (event) => {
    const value = Math.max(0, parseInt(event.target.value, 10) || 0);
    setFoodEntry(value);
  };

  const handleDailyEntry = async () => {
    const newEntry = {
      date: entryDate.toISOString(),
      grams: foodEntry,
    };
    const updatedData = {
      ...petData.data,
      foodIntake: [...(pet.data.foodIntake || []), newEntry],
    };
    try {
      const response = await editPet(petData.id, updatedData);
      setAddFoodEntry(false);
      return response;
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
  };

  const getTodaysFoodIntake = () => {
    const today = new Date().toISOString().slice(0, 10);
    const todaysEntries = petData.data.foodIntake.filter(
      (entry) => entry.date.slice(0, 10) === today
    );
    return todaysEntries.reduce((total, entry) => total + entry.grams, 0);
  };

  const todaysIntake = getTodaysFoodIntake();
  const dailyGoal = petData.data.foodGrams;

  let bowlImage;
  let statusMessage;

  if (todaysIntake === 0) {
    bowlImage = buddyBowlEmpty;
    statusMessage = "No food recorded yet for today.";
  } else if (todaysIntake < dailyGoal) {
    bowlImage = buddyBowlHalf;
    statusMessage = `${petData.data.name} has eaten ${todaysIntake}g of ${dailyGoal}g today.`;
  } else {
    bowlImage = buddyBowlFull;
    statusMessage = `${petData.data.name} already have eaten the daily dose today ✅`;
  }

  return (
    <PageMotion>
      <div className="food-details--container">
        {petData.data.foodGrams ? (
          <>
            <div className="food-details--daily-counter">
              {addFoodEntry ? (
                foodEntryModal()
              ) : (
                <div className="food--actions">
                  <button
                    className="food-page-button add-food-entry-btn"
                    onClick={() => setAddFoodEntry(true)}
                  >
                    Add Food Entry
                  </button>
                  <button
                    className="food-page-button food-history-btn"
                    onClick={() => navigate("history")}
                  >
                    Food history
                  </button>
                </div>
              )}
              <span className="food-details--daily-info">
                <img src={bowlImage} />
                <p>{statusMessage}</p>
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
