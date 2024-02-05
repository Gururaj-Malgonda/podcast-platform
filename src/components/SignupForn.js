import React, { useState } from "react";
import Input from "./common/Input/Input";
import Button from "./common/Button/Button";

function SignupForn() {
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function handleSignup() {
    console.log("handling signup");
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
        type="text"
        state={password}
        setState={setPassword}
        placeholder="Password"
        required={true}
      />
      <Input
        type="text"
        state={confirmPassword}
        setState={setConfirmPassword}
        placeholder="Confirm Password"
        required={true}
      />
      <Button text="Signup" onclick={handleSignup} />
      
    </>
  );
}

export default SignupForn;
