import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { BASE_URL } from "../utils/constants";
import { removeUser } from "../store/userSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });

      dispatch(removeUser());
      navigate("/login");
    } catch (error) {
      console.errr(error);
    }
  };

  return (
    <div className="navbar bg-base-200 shadow-sm">
      <div className="flex-1">
        <Link
          to={"/"}
          className="btn btn-ghost text-xl"
        >
          DevTinder
          <img
            src="https://img.daisyui.com/images/daisyui/mark-rotating.svg"
            className="h-8 w-8"
          />
        </Link>
      </div>
      {user && (
        <div className="flex gap-2 pr-6 items-center">
          <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
              <li>
                <Link to={"/"}>Feed</Link>
              </li>
              <li>
                <Link to={"/connections"}>Connections</Link>
              </li>
              <li>
                <Link to={"/requests"}>Requests</Link>
              </li>
            </ul>
          </div>
          <p className="badge badge-soft badge-success leading-none">
            Welcome, {user.firstName}
          </p>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="User photo"
                  src={user.photoUrl}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-300 rounded-box z-1 mt-3 w-30 p-2 shadow"
            >
              <li>
                <Link
                  to={"/profile"}
                  className="justify-between"
                >
                  Profile
                </Link>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
