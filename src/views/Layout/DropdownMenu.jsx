import React from "react";
import StarImg from "../../assets/images/Star.png";
import profile from "../../assets/images/profile.png";
import nftyLogo from "../../assets/images/coinLogo.png";
import { Link } from "react-router-dom";
const DropdownMenu = () => {
  return (
    <React.Fragment>
      <div className="dropdown-menu dropdown-menu-right show">
        <div className="dropdown-profile-section">
          <div className="profile">
            <div>
              <img className="profile-pic mr-3" src={profile} alt="" />
            </div>
            <div className="profile-details">
              <span className="profile-name">Martha C. Terry</span>
              <span className="profile-rank">
                <img className="star-img mb-1" src={StarImg} alt="" /> Silver
              </span>
            </div>
          </div>
          <div className="profile-stake ">
            <img className="nfty-logo" src={nftyLogo} alt="" />
            <span className="stake-amount">206.75</span>
          </div>
        </div>
        <Link to="" className=" dropdown-item cursor-pointer mt-4">
          <span className="menu-name">Profile</span>
        </Link>
        <hr />
        <Link to="" className=" dropdown-item cursor-pointer">
          <span className="menu-name">Buy NFTY</span>
        </Link>
        <hr />
        <Link to="" className=" dropdown-item cursor-pointer">
          <span className="menu-name">About Us</span>
        </Link>
        <hr />
        <Link to="" className=" dropdown-item cursor-pointer">
          <span className="menu-name">API</span>
        </Link>
        <hr />
        <Link to="" className=" dropdown-item cursor-pointer">
          <span className="menu-name">Discord</span>
        </Link>
        <div className="nav-tab">
          <hr style={{ border: "1px solid" }} />
          <Link to="" className="dropdown-item f-18">
            Stake
          </Link>

          <hr />
          <Link to="" className="dropdown-item f-18">
            Advocate
          </Link>

          <hr />
          <Link to="" className="dropdown-item f-18">
            Vote
          </Link>

          <hr />
          <Link to="" className="dropdown-item f-18">
            Rep
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
};

export default DropdownMenu;
