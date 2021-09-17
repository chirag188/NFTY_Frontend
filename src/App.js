import React from "react";
import { useWeb3React } from "@web3-react/core";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { guestRoutes } from "./routes";

import "./App.css";
import Loader from "./components/Loader/Loader";
import Layout from "./views/Layout/Layout";

const App = () => {
  const { active } = useWeb3React();
  const pathname = window.location.pathname.split("/")[1];
  const redirectHandler = () => {
    const guestRoute = guestRoutes
      .filter((item) => item.redirectRoute === undefined)
      .map((item) => item.path);
    return !guestRoute.includes(`/${pathname}`) ? (
      <Redirect to="/stake" />
    ) : null;
  };
  let mainContent = (
    <Layout>
      {guestRoutes.map(
        (route) =>
          route.redirectRoute === undefined && (
            <Route
              key={route.name}
              path={route.path}
              exact={route.exact}
              name={route.name}
            >
              <route.component />
            </Route>
          )
      )}
      {redirectHandler()}
      {/* <Route
        exact
        path="/"
        component={React.lazy(() => import("./views/Login/Login"))}
      />
      {localStorage.getItem("userData") === null && <Redirect to="/" />} */}
    </Layout>
  );

  if (active) {
    mainContent = (
      <>
        <Route
          path="/"
          component={React.lazy(() =>
            import("./views/MainContainer/MainContainer")
          )}
        />
      </>
    );
  }

  return (
    <React.Suspense fallback={<Loader />}>
      <BrowserRouter>
        <Switch>{mainContent}</Switch>
      </BrowserRouter>
    </React.Suspense>
  );
};

export default App;
