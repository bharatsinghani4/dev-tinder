import axios from "axios";
import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("bharat@gmail.com");
  const [password, setPassword] = useState("Singhani@1304");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    console.log({ email, password });
    try {
      const response = await axios.post(
        "http://localhost:7777/login",
        {
          emailId: email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-[calc(100vh_-_242px)] flex items-center justify-center">
      <div className="card card-border bg-base-200 w-96 border-base-300 border">
        <div className="card-body">
          <h2 className="card-title justify-center text-3xl">Login</h2>
          <form
            className="fieldset bg-base-200 rounded-box w-full p-4"
            onSubmit={handleFormSubmit}
          >
            <label className="label">Email</label>
            <input
              type="email"
              className="input input-primary"
              placeholder="Email"
              onChange={handleEmailChange}
              value={email}
            />
            <label className="label">Password</label>
            <input
              type="password"
              className="input input-primary"
              placeholder="Password"
              onChange={handlePasswordChange}
              value={password}
            />
            <button
              className="btn  btn-primary mt-4"
              type="submit"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
