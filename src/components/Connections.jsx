import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import axios from "axios";

import { BASE_URL } from "../utils/constants";
import { addConnections } from "../store/connectionsSlice";
import { removeUser } from "../store/userSlice";
import Chat from "./Chat";

const Connections = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const connections = useSelector((store) => store.connections);

  const fetchConnections = async () => {
    try {
      const response = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });

      dispatch(addConnections(response.data.data));
    } catch (error) {
      console.error(error);

      if (error.status === 401) {
        dispatch(removeUser());
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  return (
    <div
      className={
        "min-h-[calc(100vh_-_205px)] h-full p-10" +
        (!connections?.length ? " flex items-center" : "")
      }
    >
      {connections?.length ? (
        <>
          <h1 className="text-3xl font-bold text-center mb-10">Connections</h1>
          <div className="flex flex-wrap gap-10 justify-center">
            {connections.map((connection) => (
              <div
                key={connection._id}
                className="card card-side bg-base-300 shadow-xl w-[50%] flex items-center gap-2"
              >
                <div className="p-2">
                  <figure className="w-[80px] h-[80px] rounded-full">
                    <img
                      src={connection.photoURL}
                      alt="User photo"
                    />
                  </figure>
                </div>
                <div className="card-body p-2 flex-[1_0]">
                  <h2 className="card-title">
                    {connection.firstName + " " + connection.lastName}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke={
                        connection.isPremium &&
                        (connection.membership === "silver"
                          ? "var(--color-gray-400)"
                          : "var(--color-amber-400)")
                      }
                      className="size-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                      />
                    </svg>
                  </h2>
                  {connection.age && connection.gender && (
                    <p className="capitalize">
                      {connection.age + ", " + connection.gender}
                    </p>
                  )}
                  <p>{connection.about}</p>
                  {!!connection.skills.length && (
                    <p>Skills: {connection.skills.join(", ")}</p>
                  )}
                </div>
                <div className="flex-[0_1_auto] pr-4">
                  <Link
                    to={`/chat/${connection._id}`}
                    className="btn btn-soft btn-success"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="size-5"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                      />
                    </svg>
                    <span className="text-lg">Chat</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="hero bg-base-200 w-[75%] h-full mx-auto my-10">
          <div className="hero-content text-center py-20">
            <div className="max-w-lg">
              <h1 className="text-5xl font-bold">
                Hello, {user?.firstName} !!
              </h1>
              <p className="py-6">
                Unfortunately, you don't have any connections at this moment.
                Not to worry, you can go to your feed and start sending some
                requests to add people to your connections.
              </p>
              <Link
                to={"/"}
                className="btn btn-primary text-lg mt-6"
              >
                Feed
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Connections;
