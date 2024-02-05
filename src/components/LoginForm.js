import React, { useState } from "react";
import Input from "./common/Input/Input";
import Button from "./common/Button/Button";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function handleLogin() {
    console.log("handling login");
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
        type="text"
        state={password}
        setState={setPassword}
        placeholder="Password"
        required={true}
      />
      <Button text="Login" onclick={handleLogin} />
      
    </>
  );
}

export default LoginForm;
