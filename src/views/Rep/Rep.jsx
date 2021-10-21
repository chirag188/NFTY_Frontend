import { useWeb3React } from "@web3-react/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import nftyLogo from "../../assets/images/coinLogo.png";
import GoldStarImg from "../../assets/images/GoldStar.png";
import profileImg from "../../assets/images/profile.png";
import { viewProfile } from "../../store/actions";
import ConnectWalletModal from "../Stakes/ConnectWalletModal";
var QRCode = require("qrcode.react");

const Rep = () => {
  const { account } = useWeb3React();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(viewProfile());
  }, [dispatch]);
  const profile = useSelector((state) => state.profile.userData);

  const [connectWalletModalOpen, setConnectWalletModalOpen] = useState(false);
  const createdAt =
    profile && profile.createdAt.substring(0, 10).split("-").reverse();
  return (
    <React.Fragment>
      <div className="container">
        <div className="rep-page">
          {account ? (
            <>
              <div className="rep-profile">
                <div className="rep-profile-details">
                  <img
                    className="rep-profile-pic"
                    src={profile.profilePic ? profile.profilePic : profileImg}
                    alt=""
                  />
                  <div className="ml-3">
                    <div className="rep-header-text">
                      {profile &&
                        (profile.name
                          ? profile.name
                          : `${profile.walletId.substring(0, 12)}...`)}
                    </div>
                    <div className="mt-2 ">
                      <span className="rep-body-text">Member since</span>{" "}
                      <span className="f-b">
                        {createdAt[0]}/{createdAt[1]}/{createdAt[2]}
                      </span>
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
                  {profile && (profile.bio ? profile.bio : "No data available")}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="rep-text">
                <div className="rep-header-text">Reputation is Everything</div>
                <div className="rep-body-text mt-2">
                  For an artist reputation is everything, but it’s hard to build
                  one in the NFT space. For an individual, it means their hard
                  work does not go unrecognized. For the auction house, it means
                  a more efficient ecosystem.
                  <br />
                  By mimicking the real world network effect our mechanism
                  incentivizes participants to find hidden gems. NFTY’s
                  reputation layer is akin to the “wisdom of the crowd.” It
                  helps indicate to all possible buyers the “trendiness” of any
                  specific auctions. Connect your wallet today to start building
                  your personal reputation.
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
        {account && (
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
