import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("bharat@gmail.com");
  const [error, setError] = useState(null);
  const [password, setPassword] = useState("Singhani@1304");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError(null);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError(null);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        BASE_URL + "/login",
        {
          emailId: email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      dispatch(addUser(response.data));
      navigate("/");
    } catch (error) {
      setError(error?.response?.data || "Something went wrong.");
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
            <p className="text-red-400 text-center font-semibold text-sm mt-4">
              {error}
            </p>
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
