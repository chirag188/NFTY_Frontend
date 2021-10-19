/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-target-blank */
import React, { useEffect, useState } from "react";
import Logo from "../../assets/images/Logo.png";
import walletIcon from "../../assets/images/Wallet.png";
import polygonUp from "../../assets/images/Polygon-up.png";
import { Link, useLocation } from "react-router-dom";
import MenuDropdown from "./MenuDropdown";
import ProfileModal from "./ProfileModal";
import ConnectWalletModal from "../Stakes/ConnectWalletModal";
import profileImg from "../../assets/images/profile.png";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import downArrow from "../../assets/images/downArrow.png";
import { viewProfile } from "../../store/actions";
import axios from "axios";

const Layout = ({ children }) => {
  const isLogin = !!useSelector((state) => state.profile.authToken);
  const dispatch = useDispatch();
  const profilePic = useSelector((state) => state.profile.userData.profilePic);
  const location = useLocation();
  const [openProfileModal, setOpenProfileModal] = useState(false);
  const [connectWalletModalOpen, setConnectWalletModalOpen] = useState(false);
  const [marketData, setMarketData] = useState();
  const makeAPICall = () => {
    axios
      .get(`https://api.coingecko.com/api/v3/coins/nifty-token`)
      .then((res) => {
        const responce = res.data;
        setMarketData(responce);
      });
  };
  useEffect(() => {
    dispatch(viewProfile());
    makeAPICall();
  }, []);
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light">
        <Link className="navbar-brand" to="/stake" style={{ flex: "10%" }}>
          <img className="nfty-brand-logo" src={Logo} alt="" />
        </Link>
        <a
          href="https://www.coingecko.com/en/coins/nifty-token"
          target="_blank"
          style={{ textDecoration: "none", flex: "20%" }}
        >
          <div className="d-flex">
            <div className="mr-2 f-14" style={{ color: "#000000" }}>
              $
              {marketData?.tickers[0]?.converted_last?.usd
                ? marketData?.tickers[0]?.converted_last?.usd?.toFixed(4)
                : null}
            </div>
            <div
              className={
                marketData?.market_data?.price_change_percentage_24h < 0
                  ? "stake-data-percentage-down f-14"
                  : "stake-data-percentage f-14"
              }
            >
              {marketData?.market_data?.price_change_percentage_24h
                ? `${marketData?.market_data?.price_change_percentage_24h.toFixed(
                    2
                  )} %`
                : null}

              <span className="ml-2">
                {marketData?.market_data?.price_change_percentage_24h ? (
                  <img
                    className="pb-1 polygon-icon"
                    src={
                      marketData?.market_data?.price_change_percentage_24h > 0
                        ? polygonUp
                        : downArrow
                    }
                    alt="Raise"
                  />
                ) : null}
              </span>
            </div>
          </div>
        </a>
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
          {isLogin ? (
            <div
              className="mr-3 cursor-pointer"
              onClick={() => setOpenProfileModal(true)}
            >
              <img
                className="layout-profile-pic"
                src={profilePic ? profilePic : profileImg}
                alt=""
              />
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
