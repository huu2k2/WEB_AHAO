import { lazy } from "react";
import LazyWrapper from "@components/LazyLoad";

const Page = lazy(() => import("./index"));
const Monitor = lazy(() => import("./Main/Monitor"));
const Report = lazy(() => import("./Main/Report"));
const History = lazy(() => import("./Main/History"));
const Device = lazy(() => import("./Main/Device"));
const Role = lazy(() => import("./Main/Role"));
const Account = lazy(() => import("./Main/Account"));

const RouterHome = {
  path: "/",
  element: (
    <LazyWrapper>
      <Page />
    </LazyWrapper>
  ),
  children: [
    { path: "monitor", element: <Monitor /> },
    { path: "report", element: <Report /> },
    { path: "history", element: <History /> },
    { path: "device", element: <Device /> },
    { path: "role", element: <Role /> },
    { path: "account", element: <Account /> },
  ],
};

export default RouterHome;
