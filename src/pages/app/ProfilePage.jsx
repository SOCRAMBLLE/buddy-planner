import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { UseAuth } from "../../app/auth/auth";
import PageMotion from "../../components/PageMotion";
import "./ProfilePage.css";
import PetCard from "../../components/petCard";
import { deleteUserAccount, queryPets } from "../../app/api/firebase";
import userIcon from "../../assets/profile/user.png";
import { useState } from "react";
// import { getAuth, updateProfile } from "firebase/auth";

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

const ProfilePage = () => {
  const pets = useLoaderData();
  const auth = UseAuth();
  const user = auth.user;
  const navigate = useNavigate();
  const [deleteUserAlert, setDeleteUserAlert] = useState(false);
  function handleLogout() {
    auth.signout(() => {
      navigate("/auth");
    });
  }

  const handleDeleteAccount = async () => {
    try {
      await deleteUserAccount(user);
      handleLogout();
      console.log("delete success");
    } catch (err) {
      throw new Error(err);
    }
  };

  return (
    <PageMotion>
      <main className="profile-page--container">
        <button className="profile-page-logout-btn" onClick={handleLogout}>
          Logout
        </button>
        <h1>{user.name}</h1>
        <img
          // onClick={triggerFileInput}
          className="profile-page--user-img"
          src={user.photoUrl ? user.photoUrl : userIcon}
        />
        <p>
          <strong>email:</strong> {user.email}
        </p>
        <section className="profile-page--pets-container">
          {pets.length > 0 ? (
            <>
              <h3>Your buddy&apos;s</h3>
              <div className="profile-page--pets">
                {pets.map((pet, index) => (
                  <PetCard key={index} id={pet.id} pet={pet.data} />
                ))}
              </div>
              <Link to="register-pet" className="profile-page--addpet-btn">
                <button>Add one more buddy</button>
              </Link>
            </>
          ) : (
            <Link to="register-pet" className="profile-page--addpet-btn">
              <button>Add your first buddy</button>
            </Link>
          )}
        </section>
        <button
          onClick={() => setDeleteUserAlert(true)}
          className="profile--delete-btn"
        >
          Delete Account
        </button>
        {deleteUserAlert && (
          <div className="editpet--delete-alert">
            <h2>Are you sure?</h2>
            <pre>All your data will be deleted.</pre>
            <div>
              <button
                className="editpet--cancel-btn"
                onClick={() => setDeleteUserAlert(false)}
              >
                Cancel
              </button>
              <button
                className="editpet--delete-btn"
                onClick={handleDeleteAccount}
              >
                Delete Account
              </button>
            </div>
          </div>
        )}
      </main>
    </PageMotion>
  );
};

export default ProfilePage;
