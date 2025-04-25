import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { BASE_URL } from "../utils/constants";
import { addFeed } from "../store/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const fetchFeed = async () => {
    if (feed.length) return;

    try {
      const response = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });

      if (response.data.data.length) {
        dispatch(addFeed(response.data.data));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  return (
    <div className="min-h-[calc(100vh_-_242px)] flex items-center justify-center">
      {!!feed.length &&
        feed.map((data) => (
          <UserCard
            key={data._id}
            userInfo={data}
          />
        ))}
    </div>
  );
};

export default Feed;
