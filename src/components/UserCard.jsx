import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import axios from "axios";

import { BASE_URL } from "../utils/constants";
import { removeUserFromFeed } from "../store/feedSlice";
import { removeUser } from "../store/userSlice";

const UserCard = ({ userInfo, isEditProfile = false }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    _id,
    about,
    age,
    firstName,
    lastName,
    photoURL,
    skills,
    gender,
    isPremium,
    membership,
  } = userInfo;

  const handleSendRequest = async (status, _id) => {
    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );

      dispatch(removeUserFromFeed(_id));
    } catch (error) {
      console.error(error);

      if (error.status === 401) {
        dispatch(removeUser());
        navigate("/login");
      }
    }
  };

  return (
    <div className="card bg-base-300 w-80 shadow-xl h-max">
      <figure className="w-full max-h-75 h-full">
        <img
          className="h-full max-w-full object-contain"
          src={photoURL}
          alt="User photo"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title text-2xl">
          {firstName + " " + lastName}
          {isPremium && (
            <>
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke={
                  membership === "silver"
                    ? "var(--color-gray-400)"
                    : "var(--color-amber-400)"
                }
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                />
              </svg>
            </>
          )}
        </h2>
        {age && gender && <p className="capitalize">{age + ", " + gender}</p>}
        <p className="my-2">{about}</p>
        {!!skills.length && <p>Skills: {skills}</p>}
        {!isEditProfile && (
          <div className="card-actions justify-around flex w-full mt-2">
            <button
              className="btn btn-soft btn-error flex items-center"
              onClick={() => handleSendRequest("ignored", _id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 10.5858L9.17157 7.75736L7.75736 9.17157L10.5858 12L7.75736 14.8284L9.17157 16.2426L12 13.4142L14.8284 16.2426L16.2426 14.8284L13.4142 12L16.2426 9.17157L14.8284 7.75736L12 10.5858Z"></path>
              </svg>{" "}
              <span className="leading-none">Ignore</span>
            </button>
            <button
              className="btn btn-soft btn-success flex items-center"
              onClick={() => handleSendRequest("interested", _id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM17.4571 9.45711L11 15.9142L6.79289 11.7071L8.20711 10.2929L11 13.0858L16.0429 8.04289L17.4571 9.45711Z"></path>
              </svg>{" "}
              <span className="leading-none">Interested</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
