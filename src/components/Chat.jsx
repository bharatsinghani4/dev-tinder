import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import axios from "axios";

import { createSocketConnection } from "../utils/socket";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../store/userSlice";

const Chat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const fetchChatMessages = async () => {
    try {
      const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
        withCredentials: true,
      });
      const chatMessages = chat?.data?.data?.messages?.map((msg) => {
        return {
          firstName: msg?.senderId?.firstName,
          lastName: msg?.senderId?.lastName,
          text: msg?.text,
        };
      });

      setMessages(chatMessages);
    } catch (error) {
      console.error(error);

      if (error.status === 401) {
        dispatch(removeUser());
        navigate("/login");
      }
    }
  };

  const handleChatMessageInput = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();

    const socket = createSocketConnection();

    socket.emit("sendMessage", {
      firstName: user?.firstName,
      loggedInUserId: userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };

  useEffect(() => {
    if (!userId) return;

    const socket = createSocketConnection();

    // As soon as the page loads, join the chat
    socket.emit("joinChat", {
      firstName: user?.firstName,
      loggedInUserId: userId,
      targetUserId,
    });

    socket.on("messageRecieved", ({ firstName, text }) => {
      setMessages((messages) => [...messages, { firstName, text }]);
    });

    return () => {
      // Disconnect the socket as soon as the component is unmounted.
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  useEffect(() => {
    fetchChatMessages();
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="h-[calc(100vh_-_205px)] p-10 relative max-w-[1300px] mx-auto my-0 overflow-hidden">
      <div
        className="overflow-y-scroll h-[calc(100%_-_80px)] no-scrollbar"
        ref={messagesEndRef}
      >
        {messages?.length !== 0 &&
          messages?.map((message, index) => {
            return message.firstName !== user?.firstName ? (
              <div
                className="chat chat-start"
                key={index}
              >
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS chat bubble component"
                      src={
                        message.photoURL ||
                        "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png"
                      }
                    />
                  </div>
                </div>
                <div className="chat-header">
                  {message.firstName + " " + message.lastName}
                  <time className="text-xs opacity-50">12:45</time>
                </div>
                <div className="chat-bubble">{message.text}</div>
                <div className="chat-footer opacity-50">Delivered</div>
              </div>
            ) : (
              <div
                className="chat chat-end"
                key={index}
              >
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS chat bubble component"
                      src={
                        user?.photoURL ||
                        "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png"
                      }
                    />
                  </div>
                </div>
                <div className="chat-header">
                  {message.firstName + " " + message.lastName}
                  <time className="text-xs opacity-50">12:46</time>
                </div>
                <div className="chat-bubble">{message.text}</div>
                <div className="chat-footer opacity-50">Seen at 12:46</div>
              </div>
            );
          })}
      </div>
      <form
        className="flex justify-between my-10"
        onSubmit={handleSendMessage}
      >
        <input
          id="chat-message"
          type="text"
          placeholder="Type your message here"
          className="input input-ghost w-[calc(100%_-_70px)] rounded-full overflow-hidden px-6 border-green-300"
          name="chat-message"
          value={newMessage}
          onChange={handleChatMessageInput}
        />
        <button
          className="btn btn-soft btn-success rounded-full"
          disabled={!newMessage}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
            />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default Chat;
