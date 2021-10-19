import React, { useEffect, useRef, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import MetaMaskOnboarding from "@metamask/onboarding";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { guestRoutes } from "./routes";

import "./App.css";
import Loader from "./components/Loader/Loader";
import Layout from "./views/Layout/Layout";
import { useEagerConnect, useInactiveListener } from "./hooks";

const App = () => {
  const [activatingConnector, setActivatingConnector] = useState();
  const { account, connector, active } = useWeb3React();
  const onboarding = useRef();

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector);

  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  // For Metamask OnBoarding
  useEffect(() => {
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding();
    }
  }, []);

  useEffect(() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      if (account && account.length > 0) {
        onboarding.current.stopOnboarding();
      } else {
        localStorage.clear();
      }
    }
  }, [account]);

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
    </Layout>
  );

  if (active) {
    localStorage.setItem("shouldEagerConnect", true);
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
