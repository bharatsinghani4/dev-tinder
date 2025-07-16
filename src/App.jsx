import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router";

import { appStore } from "./store/appStore";

import Body from "./components/Body";
import Feed from "./components/Feed";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Requests from "./components/Requests";
import Connections from "./components/Connections";
import Premium from "./components/Premium";

const App = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Body />,
      children: [
        {
          path: "",
          element: <Feed />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
        {
          path: "requests",
          element: <Requests />,
        },
        {
          path: "connections",
          element: <Connections />,
        },
        {
          path: "premium",
          element: <Premium />,
        },
      ],
    },
  ]);

  return (
    <Provider store={appStore}>
      <RouterProvider router={appRouter} />
    </Provider>
  );
};

export default App;




