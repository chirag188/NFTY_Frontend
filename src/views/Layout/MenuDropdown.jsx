import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";

import hamburgerIcon from "../../assets/images/hamburger.png";
import StarImg from "../../assets/images/Star.png";
import profile from "../../assets/images/dummyPic.png";
import nftyLogo from "../../assets/images/coinLogo.png";
import profileImg from "../../assets/images/profile.png";
import ConnectWalletModal from "../Stakes/ConnectWalletModal";

const MenuDropdown = () => {
  const login = sessionStorage.getItem("token");
  const [connectWalletModalOpen, setConnectWalletModalOpen] = useState(false);
  const Logout = () => {
    sessionStorage.clear();
    window.location.reload();
  };
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
            {login ? (
              <>
                <div className="profile">
                  <div>
                    <img className="profile-pic mr-3" src={profile} alt="" />
                  </div>
                  <div className="profile-details">
                    <span className="profile-name">Martha C. Terry</span>
                    <span className="profile-rank">
                      <img className="star-img mb-1" src={StarImg} alt="" />{" "}
                      Silver
                    </span>
                  </div>
                </div>
                <div className="profile-stake">
                  <img className="nfty-logo" src={nftyLogo} alt="" />
                  <span className="stake-amount">206.75</span>
                </div>
              </>
            ) : (
              <div className="d-flex justify-content-center profile-img">
                <img src={profileImg} alt="" />
              </div>
            )}
          </div>
          {login ? (
            <Dropdown.Item
              href=""
              className=" dropdown-item cursor-pointer mt-3"
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
          <Dropdown.Item href="" className=" dropdown-item cursor-pointer">
            <span className="menu-name">Buy NFTY</span>
          </Dropdown.Item>
          <hr />
          <Dropdown.Item href="" className=" dropdown-item cursor-pointer">
            <span className="menu-name">About Us</span>
          </Dropdown.Item>
          <hr />
          <Dropdown.Item href="" className=" dropdown-item cursor-pointer">
            <span className="menu-name">API</span>
          </Dropdown.Item>
          <hr />
          <Dropdown.Item href="" className=" dropdown-item cursor-pointer">
            <span className="menu-name">Discord</span>
          </Dropdown.Item>
          {login && (
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
          <div className="nav-tab">
            <hr style={{ border: "1px solid" }} />
            <Dropdown.Item href="/stake" className="dropdown-item f-18">
              Stake
            </Dropdown.Item>

            <hr />
            <Dropdown.Item href="/advocate" className="dropdown-item f-18">
              Advocate
            </Dropdown.Item>

            <hr />
            <Dropdown.Item href="/vote" className="dropdown-item f-18">
              Vote
            </Dropdown.Item>

            <hr />
            <Dropdown.Item href="" className="dropdown-item f-18">
              Rep
            </Dropdown.Item>
          </div>
        </Dropdown.Menu>
      </Dropdown>
      {connectWalletModalOpen && (
        <ConnectWalletModal modalOpenClose={setConnectWalletModalOpen} />
      )}
    </div>
  );
};

export default MenuDropdown;
