import React, { useState } from "react";
import nftyLogo from "../../assets/images/coinLogo.png";
import GoldStarImg from "../../assets/images/GoldStar.png";
import profilePic from "../../assets/images/dummyPic.png";
import ConnectWalletModal from "../Stakes/ConnectWalletModal";
var QRCode = require("qrcode.react");

const Rep = () => {
  const login = sessionStorage.getItem("token");
  const [connectWalletModalOpen, setConnectWalletModalOpen] = useState(false);

  return (
    <React.Fragment>
      <div className="container">
        <div className="rep-page">
          {login ? (
            <>
              <div className="rep-profile">
                <div className="rep-profile-details">
                  <img className="rep-profile-pic" src={profilePic} alt="" />
                  <div className="ml-3">
                    <div className="rep-header-text">Martha C. Terry</div>
                    <div className="mt-2 ">
                      <span className="rep-body-text">Member since</span>{" "}
                      <span className="f-b">12/09/2021</span>
                    </div>
                  </div>
                </div>
                <div className="rep-qr">
                  <QRCode value="Martha C. Terry" size={80} />
                </div>
              </div>
              <div className="mt-4">
                <div className="f-b"> Bio</div>
                <div className="rep-body-text mt-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Praesent lacus nisi, viverra ac ultrices non, mattis viverra
                  dolor. Lorem ipsum dolor sit amet, consectetur adipiscing
                  elit. Praesent lacus nisi, viverra ac ultrices non, mattis
                  viverra dolor.{" "}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="rep-text">
                <div className="rep-header-text">Rep</div>
                <div className="rep-body-text mt-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  iaculis convallis mauris, id finibus lectus tristique ut.
                  Donec lacinia magna id nibh vehicula faucibus. Mauris
                  venenatis leo tellus, pulvinar rhoncus enim luctus eu. Donec
                  condimentum sagittis dolor et mattis.
                </div>
              </div>
              <div className="text-center mt-3">
                <button
                  className="yellow-btn w-50"
                  onClick={() => setConnectWalletModalOpen(true)}
                >
                  Connect Wallet
                </button>
              </div>
            </>
          )}
        </div>
        {login && (
          <div className="row d-flex pt-2 pb-2 stats mt-3">
            <div className="col-sm-4 mt-2 pl-4">
              <div className="head-text">67 Days</div>
              <div className="rep-body-text f-12">Staking Streak</div>
              <hr className="stats-rep-hr" />
            </div>
            <div className="col-sm-4 pl-4 mt-2">
              <div className="head-text">
                <img
                  className="rep-page-nfty-logo mr-1"
                  src={nftyLogo}
                  alt=""
                />
                12,456
              </div>
              <div className="rep-body-text">Total Staked</div>
              <hr className="stats-rep-hr" />
            </div>
            <div className="col-sm-4 pl-4 mt-2">
              <div className="head-text">
                <img className="rep-gold-star-img" src={GoldStarImg} alt="" />{" "}
                Gold
              </div>
              <div className="rep-body-text">Social Rank</div>
            </div>
          </div>
        )}
      </div>
      {connectWalletModalOpen && (
        <ConnectWalletModal modalOpenClose={setConnectWalletModalOpen} />
      )}
    </React.Fragment>
  );
};

export default Rep;
