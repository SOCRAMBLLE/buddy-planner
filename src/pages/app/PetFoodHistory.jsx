import { Link, useLoaderData, useNavigate, useParams } from "react-router-dom";
import PageMotion from "../../components/PageMotion";
import "./PetFoodHistory.css";
import { editPet, getPet } from "../../app/api/firebase";
import { FaTrash } from "react-icons/fa";
import { useState } from "react";

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

const PetFoodHistory = () => {
  const navigate = useNavigate();
  let { petid } = useParams();
  const petData = useLoaderData();
  const [deleteEntryIndex, setDeleteEntryIndex] = useState(null);
  const petFoodHistory = petData.data.foodIntake;

  const handleDeleteEntry = async (index) => {
    const updatedFoodHistory = petFoodHistory.filter((_, idx) => idx !== index);
    try {
      const updatedData = { ...petData.data, foodIntake: updatedFoodHistory };
      const response = await editPet(petData.id, updatedData);
      navigate(0);
      return response;
    } catch (err) {
      throw new Error(err);
    }
  };

  return (
    <PageMotion>
      <Link className="go-back--btn" to={`../${petid}`}>{`<< Go back`}</Link>
      <div className="food-history--container">
        <h4>{petData.data.name} Food history</h4>
        {petFoodHistory.map((entry, index) => {
          const entryDate = entry.date.slice(0, 10);
          const foodEntry = entry.grams;
          return (
            <div key={index} className="food-history--entry">
              <div
                className={`foodEntry--delete-alert ${
                  deleteEntryIndex !== null ? "active" : ""
                }`}
              >
                {deleteEntryIndex !== null && (
                  <>
                    <h2>Are you sure?</h2>
                    <p>
                      Delete entry:
                      <pre>
                        {petFoodHistory[deleteEntryIndex].date.slice(0, 10)}
                      </pre>
                      <pre>{petFoodHistory[deleteEntryIndex].grams} grams</pre>
                    </p>
                    <div>
                      <button
                        className="editpet--cancel-btn"
                        onClick={() => setDeleteEntryIndex(null)}
                      >
                        Cancel
                      </button>
                      <button
                        className="editpet--delete-btn"
                        onClick={() => handleDeleteEntry(deleteEntryIndex)}
                      >
                        Delete Entry
                      </button>
                    </div>
                  </>
                )}
              </div>
              <div>
                <pre>{entryDate}: </pre>
                <pre>{foodEntry} grams</pre>
              </div>
              <button
                className="entry-del-btn"
                onClick={() => setDeleteEntryIndex(index)}
              >
                <FaTrash />
              </button>
            </div>
          );
        })}
      </div>
    </PageMotion>
  );
};

export default PetFoodHistory;
