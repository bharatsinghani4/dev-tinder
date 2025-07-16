import { useEffect, useState } from "react";
import axios from "axios";

import { BASE_URL } from "../utils/constants";
import { useSelector } from "react-redux";
import { Link } from "react-router";

const Premium = () => {
  const user = useSelector((store) => store.user);
  const [isUserPremium, setIsUserPremium] = useState(false);

  const verifyPremiumUser = async () => {
    try {
      const response = await axios.get(BASE_URL + "/premium/verify", {
        withCredentials: true,
      });

      if (response.data.isPremium) {
        setIsUserPremium(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleBuyMemberShip = async (membership) => {
    try {
      const order = await axios.post(
        BASE_URL + "/payment/create",
        {
          membership,
        },
        { withCredentials: true }
      );

      const options = {
        key: order.data.key_id, // Replace with your Razorpay key_id
        amount: order.data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: order.data.currency,
        name: "Dev Tinder",
        description: "Connect to other developers",
        order_id: order.data.id, // This is the order_id created in the backend
        // callback_url: "http://localhost:3000/payment-success", // Your success URL
        prefill: {
          name: order.data.notes.firstName + " " + order.data.notes.lastName,
          email: order.data.notes.emailId,
          contact: "9999999999",
        },
        theme: {
          color: "#F37254",
        },
        handler: verifyPremiumUser,
      };

      const razorpay = new window.Razorpay(options);

      razorpay.open();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    verifyPremiumUser();
  }, []);

  return !isUserPremium ? (
    <div className="p-10 min-h-[calc(100vh_-_205px)]">
      <h1 className="text-3xl font-bold text-center mb-10">
        Premium Memberships
      </h1>
      <div className="flex w-full">
        <div className="card bg-base-200 rounded-box grid grow place-items-center p-5">
          <h2 className="text-2xl font-bold text-center mb-10">
            Silver Plan - &#8377;400/month
          </h2>
          <ul className="menu bg-base-300 rounded-box w-75 mb-10">
            <li>
              <p>Chat with other devs</p>
            </li>
            <li>
              <p>Send 100 connection requests per day</p>
            </li>
            <li>
              <a>
                Get silver tick{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="var(--color-gray-400)"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                  />
                </svg>
              </a>
            </li>
          </ul>
          <button
            className="btn btn-soft btn-default"
            onClick={() => handleBuyMemberShip("silver")}
          >
            Upgrade to Silver
          </button>
        </div>
        <div className="divider divider-horizontal">OR</div>
        <div className="card bg-base-200 rounded-box grid grow place-items-center p-5">
          <h2 className="text-2xl font-bold text-center mb-10">
            Gold Plan - &#8377;800/month
          </h2>
          <ul className="menu bg-base-300 rounded-box w-75 mb-10">
            <li>
              <p>Superlike other devs</p>
            </li>
            <li>
              <p>Send infinite connection requests per day</p>
            </li>
            <li>
              <a>
                Get gold tick{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="var(--color-amber-400)"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                  />
                </svg>
              </a>
            </li>
          </ul>
          <button
            className="btn btn-soft btn-warning"
            onClick={() => handleBuyMemberShip("gold")}
          >
            Upgrade to Gold
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex justify-center min-h-[calc(100vh_-_205px)]">
      <div className="hero w-[75%]">
        <div className="hero-content bg-base-200 flex-col lg:flex-row p-8">
          <img
            src={user.photoURL}
            className="h-[280px] w-[200px] rounded-lg shadow-2xl object-cover"
          />
          <div>
            <h1 className="text-5xl font-bold mb-10 flex items-center">
              {user.firstName + " " + user.lastName}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke={
                  user.membership === "silver"
                    ? "var(--color-gray-400)"
                    : "var(--color-amber-400)"
                }
                className="size-12 ml-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                />
              </svg>
            </h1>
            <h1 className="text-2xl font-bold">
              Congratulations on becoming a{" "}
              {user.membership === "silver" ? "Silver" : "Gold"} member!
            </h1>
            <p className="py-6">
              Now you can chat with other devs and send 100 connection requests
              per day. Wish you all the best for your dev hunt!
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
    </div>
  );
};

export default Premium;
