import { Form, Link, useNavigate } from "react-router-dom";
import PageMotion from "../../components/PageMotion";
import PhotoUploader from "../../components/PhotoUploader";
import "./BuddyRegister.css";
import { FaDog, FaCat } from "react-icons/fa6";
import { GiRabbitHead } from "react-icons/gi";
import { IoChevronBack } from "react-icons/io5";
import ToggleButton from "../../components/ui/toggle-button";
import { useState } from "react";
import { fetchBreeds } from "../../app/api/breedData";
import { addPet } from "../../app/api/firebase";
import { UseAuth } from "../../app/auth/auth";
import { nanoid } from "nanoid";

const BuddyRegPage = () => {
  const { user } = UseAuth();
  const navigate = useNavigate();
  const nanoId = nanoid();
  const [selectedType, setSelectedType] = useState({
    cat: false,
    dog: false,
    rabbit: false,
  });
  const [breedData, setBreedData] = useState([]);
  const [formData, setFormData] = useState({
    type: "",
    name: "",
    breed: "i don't know",
    birthday: "",
    imageURL: "",
    userID: user.id,
    foodGrams: "",
  });
  const handleTypeSelect = async (pet) => {
    setSelectedType((prev) => ({
      cat: false,
      dog: false,
      rabbit: false,
      [pet]: !prev[pet],
    }));
    setFormData((prev) => ({
      ...prev,
      type: pet,
    }));
    const data = await fetchBreeds(pet);
    setBreedData(data);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhotoUpload = (photoUrl) => {
    setFormData((prev) => ({
      ...prev,
      imageURL: photoUrl,
    }));
  };

  async function SubmitForm(event) {
    event.preventDefault();
    const defaultPetPhotoURL =
      "https://firebasestorage.googleapis.com/v0/b/paw-planner-86b98.appspot.com/o/pets%2Fpaw.png?alt=media&token=62b25fdc-d86e-4b35-9804-113469e394ca";
    const completeFormData = {
      ...formData,
      imageURL: formData.imageURL || defaultPetPhotoURL,
    };
    try {
      await addPet(completeFormData, nanoId);
      return navigate("/profile");
    } catch (err) {
      return { error: err.message || "Unknown error when trying to login" };
    }
  }

  return (
    <PageMotion>
      <main className="petreg-page--container">
        <Link className="petreg-page--back-btn" to="/profile">
          <IoChevronBack /> Go back
        </Link>
        <Form onSubmit={SubmitForm} className="petreg-page--form">
          <div className="pet-type--container">
            <div className="pet-type--button">
              <ToggleButton
                isToggled={selectedType.cat}
                onClick={() => handleTypeSelect("cat")}
                type="checkbox"
                name="cat"
                value="cat"
              >
                <span>
                  <FaCat />
                </span>
                <h6>Cat</h6>
              </ToggleButton>
            </div>
            <div className="pet-type--button">
              <ToggleButton
                isToggled={selectedType.dog}
                onClick={() => handleTypeSelect("dog")}
                name="dog"
                value="dog"
              >
                <span>
                  <FaDog />
                </span>
                <h6>Dog</h6>
              </ToggleButton>
            </div>
            <div className="pet-type--button">
              <ToggleButton
                isToggled={selectedType.rabbit}
                onClick={() => handleTypeSelect("rabbit")}
                name="rabbit"
                value="rabbit"
              >
                <span>
                  <GiRabbitHead />
                </span>
                <h6>Rabbit</h6>
              </ToggleButton>
            </div>
          </div>
          {(selectedType.cat || selectedType.dog || selectedType.rabbit) && (
            <div className="pet-form--container">
              <label>
                Name <br />
                <input
                  type="text"
                  placeholder="Your buddy's name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  name="name"
                />
              </label>
              <label>
                Breed <br />
                <select
                  required
                  value={formData.breed}
                  onChange={handleChange}
                  name="breed"
                >
                  <option defaultValue value="i don't know">
                    I don&apos;t know
                  </option>
                  {breedData.map((breed, index) => (
                    <option key={index} value={breed}>
                      {breed}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Birthday <br />
                <input
                  type="date"
                  required
                  value={formData.birthday}
                  onChange={handleChange}
                  name="birthday"
                />
              </label>
              <label>
                Photo <br />
                <PhotoUploader onUpload={handlePhotoUpload} />
              </label>
              <button className="petreg-page--add-btn">
                Add {formData.name}
              </button>
            </div>
          )}
        </Form>
      </main>
    </PageMotion>
  );
};

export default BuddyRegPage;
