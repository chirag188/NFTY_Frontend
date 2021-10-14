import React, { useState } from "react";
import Logo from "../../assets/images/Logo.png";
import walletIcon from "../../assets/images/Wallet.png";
import polygonUp from "../../assets/images/Polygon-up.png";
import { Link, useLocation } from "react-router-dom";
import MenuDropdown from "./MenuDropdown";
import profilePic from "../../assets/images/dummyPic.png";
import ProfileModal from "./ProfileModal";
import ConnectWalletModal from "../Stakes/ConnectWalletModal";
import { useWeb3React } from "@web3-react/core";

const Layout = ({ children }) => {
  const { account } = useWeb3React();
  const location = useLocation();
  const [openProfileModal, setOpenProfileModal] = useState(false);
  const [connectWalletModalOpen, setConnectWalletModalOpen] = useState(false);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light">
        <Link className="navbar-brand" to="/stake" style={{ flex: "10%" }}>
          <img className="nfty-brand-logo" src={Logo} alt="" />
        </Link>
        <div className="d-flex" style={{ flex: "20%" }}>
          <div className="mr-2 f-14">$112.31</div>
          <div className="f-14 stake-data-percentage">
            +3.51%
            <span className="ml-2">
              <img className="pb-1 polygon-icon" src={polygonUp} alt="Raise" />
            </span>
          </div>
        </div>
        <div
          className="collapse navbar-collapse"
          id="navbarSupportedContent"
          style={{ flex: "50%" }}
        >
          <ul className="nav">
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
        <div className="d-flex navbar-btns">
          {account ? (
            <div
              className="mr-3 cursor-pointer"
              onClick={() => setOpenProfileModal(true)}
            >
              <img className="layout-profile-pic" src={profilePic} alt="" />
            </div>
          ) : (
            <div
              className="mr-3 cursor-pointer"
              onClick={() => setConnectWalletModalOpen(true)}
            >
              <img src={walletIcon} alt="wallet" />
            </div>
          )}
          <MenuDropdown />
        </div>
      </nav>
      {children}
      {openProfileModal && (
        <ProfileModal modalOpenClose={setOpenProfileModal} />
      )}
      {connectWalletModalOpen && (
        <ConnectWalletModal modalOpenClose={setConnectWalletModalOpen} />
      )}
    </>
  );
};

export default Layout;
