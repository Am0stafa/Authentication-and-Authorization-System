import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import ReactLoading from "react-loading";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return(<ReactLoading type={"spinningBubbles"} color="#f00" /> )
  }
    console.log(user)
  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    )
  );
};

export default Profile;