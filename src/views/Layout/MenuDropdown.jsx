/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";

import hamburgerIcon from "../../assets/images/hamburger.png";
import profileImg from "../../assets/images/profile.png";
import nftyLogo from "../../assets/images/coinLogo.png";
import ConnectWalletModal from "../Stakes/ConnectWalletModal";
import { useDispatch, useSelector } from "react-redux";
import { useWeb3React } from "@web3-react/core";
import { resetData, viewProfile } from "../../store/actions";
import { tierArr } from "../../utils/tierArray";
import ProfileModal from "./ProfileModal";

const MenuDropdown = () => {
  const { account, deactivate } = useWeb3React();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(viewProfile({ deactivate }));
  }, [dispatch]);
  const [openProfileModal, setOpenProfileModal] = useState(false);
  const profile = useSelector((state) => state.profile.userData);
  const [connectWalletModalOpen, setConnectWalletModalOpen] = useState(false);
  const staker = useSelector((state) => state.stakerReducer);
  let userData = tierArr.find((data, i) => {
    if (data.rank === staker?.Tier) {
      return true;
    }
  });
  const Logout = () => {
    localStorage.clear();
    deactivate();
    localStorage.clear();
    dispatch(resetData());
    localStorage.setItem("shouldEagerConnect", false);
  };
  if (connectWalletModalOpen || openProfileModal) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "scroll";
  }
  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle
          id="dropdown-autoclose-true"
          className="cursor-pointer dropdown-btn"
        >
          <img className="hamburger-icon" src={hamburgerIcon} alt="" />
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <div className="dropdown-profile-section show">
            {account ? (
              <>
                <div className="profile">
                  <div>
                    <img
                      className="profile-pic mr-3"
                      src={profile.profilePic ? profile.profilePic : profileImg}
                      alt=""
                    />
                  </div>
                  <div className="profile-details">
                    <span className="profile-name">
                      {profile &&
                        (profile.name
                          ? profile.name.length > 20
                            ? `${profile.name.substring(0, 16)}...`
                            : profile.name
                          : `${profile.walletId.substring(
                              0,
                              6
                            )}...${profile.walletId.substring(
                              profile.walletId.length - 4,
                              profile.walletId.length
                            )}`)}
                    </span>
                    <span className="profile-rank">
                      {staker?.Tier === "0" ? (
                        "Stake to be in a rank"
                      ) : (
                        <>
                          <img
                            className="star-img mb-1"
                            src={userData && userData.badge}
                            alt=""
                          />{" "}
                          {userData && userData.name}
                        </>
                      )}
                    </span>
                  </div>
                </div>
                <div className="profile-stake">
                  <img className="nfty-logo" src={nftyLogo} alt="" />
                  <span className="stake-amount">{staker?.balance}</span>
                </div>
              </>
            ) : (
              <div className="d-flex justify-content-center profile-img">
                <img src={profileImg} alt="" />
              </div>
            )}
          </div>
          {account ? (
            <Dropdown.Item
              href=""
              className=" dropdown-item cursor-pointer mt-3"
              onClick={() => setOpenProfileModal(true)}
            >
              <span className="menu-name">Profile</span>
            </Dropdown.Item>
          ) : (
            <Dropdown.Item
              className=" dropdown-item cursor-pointer mt-3"
              onClick={() => setConnectWalletModalOpen(true)}
            >
              <span className="menu-name">Connect Wallet</span>
            </Dropdown.Item>
          )}
          <hr />
          <Dropdown.Item
            href="https://app.uniswap.org/#/swap?inputCurrency=eth&outputCurrency=0x3085154623f51b00dedfc6ceeb5197277a66b17b"
            className=" dropdown-item cursor-pointer"
            target="_blank"
          >
            <span className="menu-name">Buy NFTY</span>
          </Dropdown.Item>
          <hr />
          <Dropdown.Item
            href="https://www.nftytoken.io/about-us"
            className=" dropdown-item cursor-pointer"
            target="_blank"
          >
            <span className="menu-name">About Us</span>
          </Dropdown.Item>
          <hr />
          {/* <Dropdown.Item href="" className=" dropdown-item cursor-pointer">
            <span className="menu-name">API</span>
          </Dropdown.Item>
          <hr />
          <Dropdown.Item href="" className=" dropdown-item cursor-pointer">
            <span className="menu-name">Discord</span>
          </Dropdown.Item> */}
          <Dropdown.Item
            href="https://www.nftytoken.io/contact-us"
            className=" dropdown-item cursor-pointer"
            target="_blank"
          >
            <span className="menu-name">Help</span>
          </Dropdown.Item>
          {account && (
            <>
              <hr />
              <Dropdown.Item
                href=""
                onClick={Logout}
                className=" dropdown-item cursor-pointer"
              >
                <span className="menu-name">Logout</span>
              </Dropdown.Item>
            </>
          )}
        </Dropdown.Menu>
      </Dropdown>
      {connectWalletModalOpen && (
        <ConnectWalletModal modalOpenClose={setConnectWalletModalOpen} />
      )}
      {openProfileModal && (
        <ProfileModal modalOpenClose={setOpenProfileModal} />
      )}
    </div>
  );
};

export default MenuDropdown;
