import React, { useContext } from "react";
import UserContext from "../context/UserContext";

const Profile = () => {
  const { user, setUser } = useContext(UserContext);

  if (!user) return <div>please login</div>;

  return (
    <div>
      <div>Welcome {user.username}</div>
      <button onClick={() => setUser(null)}>Logout</button>
    </div>
  );
};

export default Profile;
