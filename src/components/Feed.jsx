import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import axios from "axios";

import { BASE_URL } from "../utils/constants";
import { addFeed } from "../store/feedSlice";

import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  const user = useSelector((store) => store.user);

  const fetchFeed = async () => {
    try {
      const response = await axios.get(BASE_URL + "/user/feed", {
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
    <div className="min-h-[calc(100vh_-_205px)] flex items-center justify-center">
      {feed.length ? (
        <UserCard
          key={feed[0]._id}
          userInfo={feed[0]}
        />
      ) : (
        <div className="hero bg-base-200 w-[75%] h-full mx-auto my-10">
          <div className="hero-content text-center py-20">
            <div className="max-w-lg">
              <h1 className="text-5xl font-bold">
                Hello, {user?.firstName} !!
              </h1>
              <p className="py-6">
                Nothing in the feed today. Wait for it. Good things take time
                😉. Meanwhile you can chat with your connections or look for new
                or pending requests to get started.
              </p>
              <div className="flex gap-10 justify-center">
                <Link
                  to={"/connections"}
                  className="btn btn-primary text-lg mt-6"
                >
                  Connections
                </Link>
                <Link
                  to={"/requests"}
                  className="btn btn-warning text-lg mt-6"
                >
                  Requests
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Feed;
