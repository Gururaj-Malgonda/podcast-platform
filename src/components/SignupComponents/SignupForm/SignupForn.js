import React, { useState } from "react";
import Input from "../../common/Input/Input";
import Button from "../../common/Button/Button";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db, storage } from "../../../firebase";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../../slices/userSlice";
import { toast } from "react-toastify";

function SignupForm() {
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleSignup() {
    console.log("handling signup");
    setLoading(true);
    if (password === confirmPassword && password.length >= 8) {
      try {
        // creating new user
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        // Signed up
        const user = userCredential.user;
        console.log(user);
        toast.success("New user created");

        // creating new doc to store user data
        await setDoc(doc(db, "users", user.uid), {
          name: fullname,
          email: user.email,
          uid: user.uid,
          // profilePic: fileURL,
        });

        // call the redux action, and save the sada in redux
        dispatch(
          setUser({
            name: fullname,
            email: user.email,
            uid: user.uid,
            // profilePic: fileURL,
          })
        );
        setLoading(false);
        navigate("/profile");
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage, errorCode);
        toast.error(errorMessage);
        setLoading(false);
      }
    } else {
      if (
        fullname === "" &&
        email === "" &&
        password === "" &&
        confirmPassword === ""
      ) {
        toast.warn("All fields are mandatory");
      } else if (password !== confirmPassword) {
        toast.error("Password do not match!");
      } else if (password.length < 8) {
        toast.error("Password should contain atleast 8 digits");
      }
      setLoading(false);
    }
  }
  return (
    <>
      <Input
        type="text"
        state={fullname}
        setState={setFullName}
        placeholder="Enter Your Full Name"
        required={true}
      />
      <Input
        type="text"
        state={email}
        setState={setEmail}
        placeholder="Enter Your Email"
        required={true}
      />
      <Input
        type="password"
        state={password}
        setState={setPassword}
        placeholder="Password"
        required={true}
      />
      <Input
        type="password"
        state={confirmPassword}
        setState={setConfirmPassword}
        placeholder="Confirm Password"
        required={true}
      />
      <Button
        text={loading ? "Loading..." : "Signup"}
        disabled={loading}
        onclick={handleSignup}
      />
    </>
  );
}

export default SignupForm;
