/* eslint-disable array-callback-return */
import { useWeb3React } from "@web3-react/core";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import nftyLogo from "../../assets/images/coinLogo.png";
import profileImg from "../../assets/images/profile.png";
import { viewProfile, stakerData, balance } from "../../store/actions";
import { tierArr } from "../../utils/tierArray";
import ConnectWalletModal from "../Stakes/ConnectWalletModal";

const Rep = () => {
  const { account, deactivate } = useWeb3React();
  const dispatch = useDispatch();

  useEffect(() => {
    const JwtToken = localStorage.getItem("JwtToken");
    if (JwtToken) {
      dispatch(stakerData({ deactivate }));
      dispatch(balance());
    }
    dispatch(viewProfile());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
  const profile = useSelector((state) => state.profile.userData);
  const staker = useSelector((state) => state.stakerReducer);
  const userData = tierArr.find((data, i) => {
    if (data.rank === staker?.Tier) {
      return true;
    }
  });
  const [connectWalletModalOpen, setConnectWalletModalOpen] = useState(false);
  if (connectWalletModalOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "scroll";
  }

  const streakDays = Math.floor(Number(staker?.StakePeriodInSecs) / 86400);
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
                  <div className="ml-3 align-self-center">
                    <div className="rep-header-text">
                      {profile &&
                        (profile.name
                          ? profile.name.length > 30
                            ? `${profile.name.substring(0, 30)}...`
                            : profile.name
                          : `${profile.walletId.substring(
                              0,
                              6
                            )}...${profile.walletId.substring(
                              profile.walletId.length - 4,
                              profile.walletId.length
                            )}`)}
                    </div>
                    <div className="">
                      <span className="rep-body-text">Member since</span>{" "}
                      <span className="f-b">
                        {moment(profile && profile.createdAt).format("LL")}
                      </span>
                    </div>
                  </div>
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
              <div className="head-text">
                {" "}
                {staker?.Tier === "0" ? "0" : streakDays && streakDays} Days
              </div>
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
                {Number(staker?.StakedNFTYBalance).toFixed(2)}
              </div>
              <div className="rep-body-text">Total Staked</div>
              <hr className="stats-rep-hr" />
            </div>
            <div className="col-sm-4 pl-4 mt-2">
              <div className="head-text">
                {/* <img className="rep-gold-star-img" src={GoldStarImg} alt="" />{" "} */}
                {staker?.Tier === "0" ? (
                  "Stake to be in a rank"
                ) : (
                  <>
                    <img
                      className="rep-gold-star-img"
                      src={userData && userData.badge}
                      alt=""
                    />{" "}
                    {userData && userData.name}
                  </>
                )}
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
