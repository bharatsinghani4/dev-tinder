import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import axios from "axios";

import { addUser } from "../store/userSlice";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [showSignUpForm, setShowSignUpForm] = useState(false);

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
    setError(null);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
    setError(null);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError(null);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError(null);
  };

  const handleLogin = async (e) => {
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

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          emailId: email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      dispatch(addUser(response.data.data));
      navigate("/profile");
    } catch (error) {
      setError(error?.response?.data || "Something went wrong.");
    }
  };

  return (
    <div className="min-h-[calc(100vh_-_205px)] flex items-center justify-center">
      <div className="card card-border bg-base-200 w-96 border-base-300 border">
        <div className="card-body">
          <h2 className="card-title justify-center text-3xl">
            {showSignUpForm ? "Sign Up" : "Login"}
          </h2>
          <form
            className="fieldset bg-base-200 rounded-box w-full p-4"
            onSubmit={showSignUpForm ? handleSignUp : handleLogin}
          >
            {showSignUpForm && (
              <>
                <label className="label">First Name</label>
                <input
                  type="text"
                  className="input input-primary"
                  placeholder="First Name"
                  onChange={handleFirstNameChange}
                  value={firstName}
                />
                <label className="label">Last Name</label>
                <input
                  type="text"
                  className="input input-primary"
                  placeholder="Last Name"
                  onChange={handleLastNameChange}
                  value={lastName}
                />
              </>
            )}
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
            <p>
              {showSignUpForm ? (
                <>
                  {"Already a customer? "}{" "}
                  <a
                    className="link link-primary"
                    onClick={() => setShowSignUpForm(false)}
                  >
                    Login
                  </a>
                </>
              ) : (
                <>
                  {"Not registered with us? "}{" "}
                  <a
                    className="link link-primary"
                    onClick={() => setShowSignUpForm(true)}
                  >
                    Signup now
                  </a>
                </>
              )}
            </p>
            {error && (
              <p className="text-red-400 text-center font-semibold text-sm mt-4">
                {error}
              </p>
            )}
            <button
              className="btn  btn-primary mt-4"
              type="submit"
            >
              {showSignUpForm ? "Sign Up" : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
