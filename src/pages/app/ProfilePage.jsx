import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { UseAuth } from "../../app/auth/auth";
import PageMotion from "../../components/PageMotion";
import "./ProfilePage.css";
import PetCard from "../../components/petCard";
import { queryPets } from "../../app/api/firebase";
import userIcon from "../../assets/profile/user.png";
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
  function handleLogout() {
    auth.signout(() => {
      navigate("/auth");
    });
  }

  // const triggerFileInput = () => {
  //   document.getElementById("fileInput").click();
  // };

  // const handleChangeProfilePhoto = async (event) => {
  //   const file = event.target.files[0];
  //   if (!file) return;

  //   try {
  //     const authentication = getAuth();
  //     const getuser = authentication.currentUser;
  //     console.log(getuser);
  //     const profilePhotoURL = await uploadUserPhoto(file);
  //     await updateProfile(getuser, { photoURL: profilePhotoURL });
  //     navigate("/profile");
  //   } catch (error) {
  //     console.error("Erro ao fazer upload da imagem:", error);
  //   }
  // };

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
        {/* <input
          id="fileInput"
          type="file"
          onChange={handleChangeProfilePhoto}
          style={{ display: "none" }}
        /> */}
        <p>
          <strong>email:</strong> {user.email}
        </p>
        <section className="profile-page--pets-container">
          {pets ? (
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
      </main>
    </PageMotion>
  );
};

export default ProfilePage;
