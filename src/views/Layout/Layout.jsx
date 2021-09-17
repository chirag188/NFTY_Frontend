import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Logo from "../../assets/images/Logo.png";
import walletIcon from "../../assets/images/Wallet.png";
import hamburgerIcon from "../../assets/images/hamburger.png";
import polygonUp from "../../assets/images/Polygon-up.png";
import { Link, useLocation } from "react-router-dom";

const Layout = ({ children }) => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-light">
        <Link className="navbar-brand" to="/stake" style={{ flex: "10%" }}>
          <img src={Logo} alt="" />
        </Link>
        <div className="d-flex" style={{ flex: "20%" }}>
          <div className="mr-2 f-18">$112.31</div>
          <div className="f-18 stake-data-percentage">
            +3.51%
            <span className="ml-2">
              <img className="pb-1" src={polygonUp} alt="Raise" />
            </span>
          </div>
        </div>
        <div
          className="collapse navbar-collapse"
          id="navbarSupportedContent"
          style={{ flex: "50%" }}
        >
          <ul className="nav f-18">
            <li className="nav-item">
              <Link className="nav-link" to="/stake">
                Stake
              </Link>
              {location.pathname === "/stake" ? (
                <hr className="active" />
              ) : null}
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/advocate">
                Advocate
              </Link>
              {location.pathname === "/advocate" ? (
                <hr className="active" />
              ) : null}
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/vote">
                Vote
              </Link>
              {location.pathname === "/vote" ? <hr className="active" /> : null}
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/rep">
                Rep
              </Link>
              {location.pathname === "/rep" ? <hr className="active" /> : null}
            </li>
          </ul>
        </div>
        <div className="d-flex">
          <div className="mr-3 cursor-pointer">
            <img src={walletIcon} alt="wallet" />
          </div>
          <span className="cursor-pointer" onClick={() => setOpen(true)}>
            <img src={hamburgerIcon} alt="" />
          </span>
        </div>
        <Sidebar open={open} setOpen={setOpen} />
      </nav>
      {children}
    </React.Fragment>
  );
};

export default Layout;
