import React from "react";
export const guestRoutes = [
  {
    path: "/stake",
    exact: true,
    name: "Stakes",
    component: React.lazy(() => import("../../views/Stakes/Stakes")),
  },
  {
    path: "/advocate",
    exact: true,
    name: "Advocate",
    component: React.lazy(() => import("../../views/Advocate/Advocate")),
  },
  {
    path: "/vote",
    exact: true,
    name: "Vote",
    component: React.lazy(() => import("../../views/Vote/Vote")),
  },
  {
    path: "/rep",
    exact: true,
    name: "Rep",
    component: React.lazy(() => import("../../views/Rep/Rep")),
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
  {
    path: "/stake",
    exact: true,
    name: "Stakes",
    component: React.lazy(() => import("../../views/Stakes/Stakes")),
  },
  {
    path: "/advocate",
    exact: true,
    name: "Advocate",
    component: React.lazy(() => import("../../views/Advocate/Advocate")),
  },
  {
    path: "/vote",
    exact: true,
    name: "Vote",
    component: React.lazy(() => import("../../views/Vote/Vote")),
  },
  {
    path: "/rep",
    exact: true,
    name: "Rep",
    component: React.lazy(() => import("../../views/Rep/Rep")),
  },

  // Main route's default dashboard
  {
    redirectRoute: true,
    name: "dashboardRedirect",
    path: "/",
  },
];
