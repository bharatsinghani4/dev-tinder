import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";

import Body from "./components/Body";
import Feed from "./components/Feed";
import Login from "./components/Login";
import Profile from "./components/Profile";

const App = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Body />,
      children: [
        {
          path: "feed",
          element: <Feed />,
        },
        {
          path: "",
          element: <Login />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
      ],
    },
  ]);

  return <RouterProvider router={appRouter} />;
};

export default App;


