import { useEffect, useState } from "react";
import axios from "axios";

import { BASE_URL } from "../utils/constants";

const Premium = () => {
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
        <div className="card bg-base-300 rounded-box grid grow place-items-center p-5">
          <h2 className="text-2xl font-bold text-center mb-10">
            Silver Plan - $10/month
          </h2>
          <ul className="menu bg-base-200 rounded-box w-75 mb-10">
            <li>
              <p>Chat with other devs</p>
            </li>
            <li>
              <p>Send 100 connection requests per day</p>
            </li>
            <li>
              <a>Get silver tick</a>
            </li>
          </ul>
          <button
            className="btn btn-soft btn-primary"
            onClick={() => handleBuyMemberShip("silver")}
          >
            Upgrade to Silver
          </button>
        </div>
        <div className="divider divider-horizontal">OR</div>
        <div className="card bg-base-300 rounded-box grid grow place-items-center p-5">
          <h2 className="text-2xl font-bold text-center mb-10">
            Gold Plan - $25/month
          </h2>
          <ul className="menu bg-base-200 rounded-box w-75 mb-10">
            <li>
              <p>Superlike other dev</p>
            </li>
            <li>
              <p>Send infinite connection requests per day</p>
            </li>
            <li>
              <a>Get gold tick</a>
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
    <p>You're already a premium user</p>
  );
};

export default Premium;
