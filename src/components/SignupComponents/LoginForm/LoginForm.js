import React, { useState } from "react";
import Input from "../../common/Input/Input";
import Button from "../../common/Button/Button";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db, storage } from "../../../firebase";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../../slices/userSlice";
import { toast } from "react-toastify";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleLogin() {
    console.log("handling login");
    setLoading(true);
    if (email !== "" && password !== "") {
      try {
        // Signing In using email nd password
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        // Signed In
        const user = userCredential.user;
        toast.success("User loggen in successfully!");

        // creating new doc to store user data
        const userDoc = await getDoc(doc(db, "users", user.uid));
        const userData = userDoc.data();
        console.log("userData", userData);

        // call the redux action, and save the sada in redux
        dispatch(
          setUser({
            name: userData.name,
            email: user.email,
            uid: user.uid,
            // profilePic: fileURL,
          })
        );

        navigate("/profile");
        setLoading(false);
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        // console.log(errorMessage, errorCode);
        toast.error(errorCode, errorMessage);
        setLoading(false);
      }
    } else {
      toast.warn("All fields are mandatory");
      setLoading(false);
    }
  }
  return (
    <>
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
      <Button
        text={loading ? "Loading..." : "Login"}
        disabled={loading}
        onclick={handleLogin}
      />
    </>
  );
}

export default LoginForm;
