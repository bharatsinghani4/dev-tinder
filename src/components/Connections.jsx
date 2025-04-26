import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import axios from "axios";

import { BASE_URL } from "../utils/constants";
import { addConnections } from "../store/connectionsSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const connections = useSelector((store) => store.connections);

  const fetchConnections = async () => {
    try {
      const response = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });

      dispatch(addConnections(response.data.data));
    } catch (error) {
      console.log(error);
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
          <div className="flex flex-wrap gap-10">
            {connections.map((connection) => (
              <div
                key={connection._id}
                className="card card-side bg-base-300 shadow-xl w-[50%]"
              >
                <figure className="flex-[1_0_33%]">
                  <img
                    src={connection.photoUrl}
                    alt="User photo"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">
                    {connection.firstName + " " + connection.lastName}
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
