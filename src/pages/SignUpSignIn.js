import React, { useState } from "react";
import Header from "../components/common/Header/Header";
import SignupForn from "../components/SignupForn";
import LoginForm from "../components/LoginForm";

function SignUpSignIn() {
  const [flag, setFlag] = useState(false);

  return (
    <div>
      <Header />
      <div className="input-wrapper">
        {!flag ? <h1>Signup</h1> : <h1>Login</h1>}
        {!flag ? <SignupForn /> : <LoginForm />}
        {!flag ? (
          <p onClick={() => setFlag(!flag)}>
            Already have an Account? Click here to Login.
          </p>
        ) : (
          <p onClick={() => setFlag(!flag)}>
            Don't have an Account? Click here to Signup.
          </p>
        )}
      </div>
    </div>
  );
}

export default SignUpSignIn;
