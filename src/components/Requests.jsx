import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import axios from "axios";

import { BASE_URL } from "../utils/constants";
import { addRequests, removeRequest } from "../store/requestsSlice";

import Request from "./Request";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
  const user = useSelector((store) => store.user);

  const fetchRequests = async () => {
    try {
      const response = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });

      console.log(response);
      dispatch(addRequests(response.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );

      dispatch(removeRequest(_id));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;

  return (
    <div
      className={
        "min-h-[calc(100vh_-_205px)] h-full p-10" +
        (!requests?.length ? " flex items-center" : "")
      }
    >
      {requests?.length ? (
        <>
          <h1 className="text-3xl font-bold text-center mb-10">Requests</h1>
          <div className="flex flex-wrap gap-10">
            {requests.map((request) => (
              <Request
                key={request._id}
                requestId={request._id}
                userInfo={request.fromUserId}
                handleReviewRequest={reviewRequest}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="hero bg-base-200 w-[75%] h-full mx-auto my-10">
          <div className="hero-content text-center py-20">
            <div className="max-w-md">
              <h1 className="text-5xl font-bold">Hello {user?.firstName}</h1>
              <p className="py-6">
                Unfortunately, you don't have any requests at this moment. Not
                to worry, you can go to your feed and start sending some
                requests so that their mutual connections can find and send you
                a request.
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

export default Requests;
