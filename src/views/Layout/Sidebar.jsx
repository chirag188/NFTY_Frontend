import React from "react";
import goldStar from "../../assets/images/GoldStar.png";
import profile from "../../assets/images/profile.png";
import nftyLogo from "../../assets/images/coinLogo.png";
import aboutUs from "../../assets/images/aboutus.png";
import apiIcon from "../../assets/images/Api.png";
import discordIcon from "../../assets/images/discord.png";
const Sidebar = (props) => {
  const { open, setOpen } = props;
  return (
    <React.Fragment>
      <div id="mySidenav" className={open ? "show-sidebar sidenav" : "sidenav"}>
        <span
          className="closebtn cursor-pointer mt-2"
          onClick={() => setOpen(false)}
        >
          &times;
        </span>
        <span className="gold-text">
          <img className="mr-1 pb-1" src={goldStar} alt="" />
          Gold
        </span>
        <div className="text-center">
          <div className="profile">
            <img className="profile-details mr-3" src={profile} alt="" />
            <span>Martha C. Terry</span>
          </div>
          <div className="profile-stake">
            <span className="stake-text">Total Staked</span>
            <span className="stake-amount">206.75</span>
            <img src={nftyLogo} alt="" />
          </div>
        </div>
        <hr />
        <a className="f-18 cursor-pointer">
          <img className="menu-icon" src={profile} alt="" />
          <span className="menu-name">Profile</span>
        </a>
        <a className="f-18 cursor-pointer">
          <img className="menu-icon" src={nftyLogo} alt="" />
          <span className="menu-name">Buy NFTY</span>
        </a>
        <a className="f-18 cursor-pointer">
          <img className="menu-icon" src={aboutUs} alt="" />
          <span className="menu-name">About Us</span>
        </a>
        <a className="f-18 cursor-pointer">
          <img className="menu-icon" src={apiIcon} alt="" />
          <span className="menu-name">API</span>
        </a>
        <a className="f-18 cursor-pointer">
          <img className="menu-icon" src={discordIcon} alt="" />
          <span className="menu-name">Discord</span>
        </a>
        <div className="nav-tab">
          <hr />
          <a className="nav-link f-18">Stake</a>

          <a className="nav-link f-18">Advocate</a>

          <a className="nav-link f-18">Vote</a>

          <a className="nav-link f-18">Rep</a>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Sidebar;
