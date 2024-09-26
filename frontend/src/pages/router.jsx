import { createBrowserRouter } from "react-router-dom";
import RouterPage404 from "./Page_404/router";
import RouterHome from "./Home/router";
import RouterPageLogin from "./Login/router";
import Page_Login from "./Login";

export const routers = createBrowserRouter([
  { path: "/", element: <Page_Login /> },
  RouterPage404,
  RouterPageLogin,
  RouterHome,
]);
