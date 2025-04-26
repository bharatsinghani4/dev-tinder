import React from "react";

const Request = ({ userInfo, requestId, handleReviewRequest }) => {
  const { about, age, firstName, lastName, photoUrl, skills, gender } =
    userInfo;

  return (
    <div className="card card-side bg-base-300 shadow-xl w-[50%]">
      <figure className="flex-[1_0_40%]">
        <img
          src={photoUrl}
          alt="User photo"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p className="capitalize">{age + ", " + gender}</p>}
        <p>{about}</p>
        {!!skills.length && <p>Skills: {skills.join(", ")}</p>}
        <div className="card-actions justify-between flex w-full mt-2">
          <button className="btn btn-soft btn-error flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 10.5858L9.17157 7.75736L7.75736 9.17157L10.5858 12L7.75736 14.8284L9.17157 16.2426L12 13.4142L14.8284 16.2426L16.2426 14.8284L13.4142 12L16.2426 9.17157L14.8284 7.75736L12 10.5858Z"></path>
            </svg>{" "}
            <span
              className="leading-none"
              onClick={() => handleReviewRequest("rejected", requestId)}
            >
              Reject
            </span>
          </button>
          <button className="btn btn-soft btn-success flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM17.4571 9.45711L11 15.9142L6.79289 11.7071L8.20711 10.2929L11 13.0858L16.0429 8.04289L17.4571 9.45711Z"></path>
            </svg>{" "}
            <span
              className="leading-none"
              onClick={() => handleReviewRequest("accepted", requestId)}
            >
              Approve
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Request;
