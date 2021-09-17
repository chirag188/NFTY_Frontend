import React from "react";
export const guestRoutes = [
  {
    path: "/stake",
    exact: true,
    name: "Stakes",
    component: React.lazy(() => import("../../views/Stakes/Stakes")),
  },

  // Main route's default dashboard
  {
    redirectRoute: true,
    name: "dashboardRedirect",
    path: "/stake",
  },
];
export const userRoutes = [
  {
    path: "/",
    exact: true,
    name: "Dashboard",
    component: React.lazy(() => import("../../components/DummyNFT/DummyNFT")),
  },

  // Main route's default dashboard
  {
    redirectRoute: true,
    name: "dashboardRedirect",
    path: "/",
  },
];
