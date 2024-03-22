import React from "react";
import Header from "../components/common/Header/Header";
import { useSelector } from "react-redux";
import Button from "../components/common/Button/Button";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";

function Profile() {
  const user = useSelector((state) => state.user.user);

  if (!user) {
    return <p>Loading...</p>;
  }

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        toast.success("User logout successful!");
      })
      .catch((error) => {
        // An error happened.
        toast.error(error.message);
      });
  };

  return (
    <div>
      <Header />
      <h1 style={{ textAlign: "center" }}>Inside Profile</h1>
      <h1 style={{ textAlign: "center" }}>{user.name}</h1>
      <h1 style={{ textAlign: "center" }}>{user.uid}</h1>
      <h1 style={{ textAlign: "center" }}>{user.email}</h1>
      <Button text={"Logout"} onclick={handleLogout} />
    </div>
  );
}

export default Profile;
