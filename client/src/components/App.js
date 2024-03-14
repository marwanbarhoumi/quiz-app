import "../styles/App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
/** import Component */

import Main from "./Main";
import Quiz from "./Quiz";
import Result from "./Result";
import { ChekUserExist } from "../helper/helper";

/** react routes */
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
  },
  {
    path: "/quiz",
    element: (
      <ChekUserExist>
        <Quiz />
      </ChekUserExist>
    ),
  },
  {
    path: "/result",
    element: (
      <ChekUserExist>
        <Result />
      </ChekUserExist>
    ),
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
