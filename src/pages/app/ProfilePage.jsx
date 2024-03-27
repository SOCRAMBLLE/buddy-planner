import { useNavigate } from "react-router-dom";
import { UseAuth } from "../../app/auth/auth";
import PageMotion from "../../components/PageMotion";
import "./ProfilePage.css";

const ProfilePage = () => {
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
        <h1>Hello {user.name}!</h1>
        <img src={user.photoUrl} />
        <p>
          <strong>email:</strong> {user.email}
        </p>
        <button className="profile-page-logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </main>
    </PageMotion>
  );
};

export default ProfilePage;
