import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import axios from "axios";

import { BASE_URL } from "../utils/constants";
import { removeUser, updateUser } from "../store/userSlice";

import UserCard from "./UserCard";

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [about, setAbout] = useState(user?.about || "");
  const [age, setAge] = useState(user?.age || "");
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [photoUrl, setPhotoUrl] = useState(user?.photoURL || "");
  const [skills, setSkills] = useState(user?.skills?.join(",") || "");
  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const updatedUser = {
      about,
      age,
      photoURL: photoUrl,
      gender: gender.toLowerCase(),
      skills: !skills ? "" : skills.trim().split(","),
    };

    try {
      const response = await axios.patch(
        BASE_URL + "/profile/edit",
        updatedUser,
        { withCredentials: true }
      );

      dispatch(updateUser(response?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (error) {
      setError(error?.response?.data);
      console.error(error);

      if (error.status === 401) {
        dispatch(removeUser());
        navigate("/login");
      }
    }
  };

  return (
    <div className="min-h-[calc(100vh_-_205px)] h-full flex justify-center p-10 gap-10">
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
      <div className="card card-border bg-base-200 w-[50%] border-base-300 border">
        <div className="card-body">
          <h2 className="card-title justify-center text-3xl">Edit Profile</h2>
          <form
            className="fieldset bg-base-200 rounded-box w-full p-4"
            onSubmit={handleFormSubmit}
          >
            {/* <fieldset className="fieldset">
              <legend className="fieldset-legend">Email</legend>
              <input
                type="text"
                className="input input-primary w-full"
                placeholder="Email"
                value={user?.emailId}
                disabled
              />
            </fieldset> */}
            <div className="flex gap-10">
              <fieldset className="fieldset w-full">
                <legend className="fieldset-legend">First Name</legend>
                <input
                  type="text"
                  className="input input-primary w-full"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset w-full">
                <legend className="fieldset-legend">Last Name</legend>
                <input
                  type="text"
                  className="input input-primary w-full"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </fieldset>
            </div>
            <div className="flex gap-10">
              <fieldset className="fieldset w-full">
                <legend className="fieldset-legend">Age</legend>
                <input
                  type="text"
                  className="input input-primary w-full"
                  placeholder="Age(in years)"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset w-full">
                <legend className="fieldset-legend">Gender</legend>
                <input
                  type="text"
                  className="input input-primary w-full"
                  placeholder="Gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                />
              </fieldset>
            </div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Photo URL</legend>
              <input
                type="text"
                className="input input-primary w-full"
                placeholder="Photo URL"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">About</legend>
              <textarea
                type="text"
                className="input input-primary w-full py-2 overflow-hidden h-auto resize-y whitespace-pre-wrap break-words"
                placeholder="About"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Skills</legend>
              <input
                type="text"
                className="input input-primary w-full"
                placeholder="Skills: eg- Singing, Dancing, etc"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
              />
            </fieldset>
            {error && (
              <p className="text-red-400 text-center font-semibold text-sm mt-4 overflow-hidden max-h-20 h-auto whitespace-pre-wrap break-words">
                {error}
              </p>
            )}
            <button
              className="btn btn-soft btn-primary mt-4 w-max justify-self-center"
              type="submit"
            >
              Save Profile
            </button>
          </form>
        </div>
      </div>
      <UserCard
        userInfo={{
          about,
          age,
          firstName,
          lastName,
          photoURL: photoUrl,
          skills,
          gender,
          isPremium: user?.isPremium,
          membership: user?.membership,
        }}
        isEditProfile={true}
      />
    </div>
  );
};

export default EditProfile;
