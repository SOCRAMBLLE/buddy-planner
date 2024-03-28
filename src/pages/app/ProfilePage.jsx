import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { UseAuth } from "../../app/auth/auth";
import PageMotion from "../../components/PageMotion";
import "./ProfilePage.css";
import PetCard from "../../components/petCard";
import { queryPets } from "../../app/api/firebase";

export const Loader = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  const userID = user.id;
  try {
    const pets = await queryPets(userID);
    console.log("profilepage action:", pets);
    return pets;
  } catch (error) {
    throw new Error(error);
  }
};

const ProfilePage = () => {
  const pets = useLoaderData();
  console.log("profilepage component:", pets);
  const auth = UseAuth();
  const user = auth.user;
  const navigate = useNavigate();
  function handleLogout() {
    auth.signout(() => {
      navigate("/auth");
    });
  }
  return (
    <PageMotion>
      <main className="profile-page--container">
        <button className="profile-page-logout-btn" onClick={handleLogout}>
          Logout
        </button>
        <h1>Hello {user.name}!</h1>
        <img src={user.photoUrl} />
        <p>
          <strong>email:</strong> {user.email}
        </p>
        <section className="profile-page--pets-container">
          {pets ? (
            <>
              <h3>Your buddy&apos;s</h3>
              <div className="profile-page--pets">
                {pets.map((pet, index) => (
                  <PetCard key={index} pet={pet} />
                ))}
              </div>
              <Link to="register-pet">
                <button>Add one more buddy</button>
              </Link>
            </>
          ) : (
            <Link to="register-pet">
              <button>Add your first buddy</button>
            </Link>
          )}
        </section>
      </main>
    </PageMotion>
  );
};

export default ProfilePage;
