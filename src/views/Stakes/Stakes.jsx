import React, { useEffect, useState } from "react";
import StarImg from "../../assets/images/Star.png";
import GoldStarImg from "../../assets/images/GoldStar.png";
import nftyLogo from "../../assets/images/coinLogo.png";
import ROICalculatorModal from "./ROICalculatorModal";
import ConnectWalletModal from "./ConnectWalletModal";
import StakeUnstakeModal from "./StakeUnstakeModal";
import APREarnedModal from "./APREarnedModal";
import { ProgressBar } from "react-bootstrap";
// import Loader from "../../components/Loader/Loader";
import { useWeb3React } from "@web3-react/core";
import { useDispatch, useSelector } from "react-redux";
import { stakerData , balance } from "../../store/actions/Stake/Stake";

const Stakes = () => {
  const [roiCalcModalOpen, setRoiCalcModalOpen] = useState(false);
  const [connectWalletModalOpen, setConnectWalletModalOpen] = useState(false);
  const [stakeUnstakeModalOpen, setStakeUnstakeModal] = useState(false);
  const [APREarnedModalOpen, setAPREarnedModalOpen] = useState(false);
  const [isStake, setIsStake] = useState(false);
  const { account } = useWeb3React();
  const dispatch = useDispatch();

  useEffect(() => {
    const JwtToken = "";
    if(JwtToken){
      dispatch(stakerData());
      dispatch(balance());
    }
  },[])
  
  const staker = useSelector((state) => state.stakerReducer);

  return (
    <React.Fragment>
      <div className="container stakes">
        <div className="special-nfty-reward">
          <div className="sp-header-text">Special NFT Reward</div>
          <div className="simple-text text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
            lacus nisi, viverra ac ultrices non, mattis viverra dolor.{" "}
          </div>
        </div>
        <div className="mt-2 data-container">
          {account && (
            <>
              <div className="w-100 text-center p-2">
                <img className="star-img mr-2 mb-1" src={StarImg} alt="" />
                <span className="f-14">Silver is your current rank</span>
                <span className="f-14">{account}</span>
              </div>
              <hr />
              <div className="row user-stats mt-1 mb-1">
                <div className="col-md-3">
                  <div className="p-3">
                    <div className="head-text text-center">
                      <img className="nfty-logo" src={nftyLogo} alt="" />
                      {staker?.APR}
                    </div>
                    <div className="simple-text text-center">APR Earned</div>
                  </div>
                </div>
                <div className="col-md-6 target-data-border">
                  <div className="w-100 text-center p-1">
                    <img
                      className="star-img mr-2 mb-1"
                      src={GoldStarImg}
                      alt=""
                    />
                    <span className="f-14">For Reaching Gold</span>
                  </div>
                  <div className="d-flex pt-2 target-data">
                    <div>
                      <div>
                        <span className="f-b mr-2">Streak</span>
                        <span className="f-12">7 or 8 Days</span>
                      </div>
                      <div className="progress-bar">
                        <ProgressBar variant="warning" now={7/8 * 100} />
                      </div>
                    </div>
                    <div className="f-b ml-3 mr-3 f-18 mt-2">+</div>
                    <div>
                      <div>
                        <span className="f-b mr-1"> Staked</span>
                        <img
                          className="star-img mr-2 mb-1"
                          src={nftyLogo}
                          alt=""
                        />
                        <span className="f-12">{staker?.StakedNFTYBalance} of 3000</span>
                      </div>
                      <div className="progress-bar">
                        <ProgressBar variant="warning" now={2418/3000 * 100} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="p-3">
                    <div className="head-text text-center">
                      <img className="nfty-logo" src={nftyLogo} alt="" />
                      {staker?.balance}
                    </div>
                    <div className="simple-text text-center f-12">
                      My Balance
                    </div>
                  </div>
                </div>
              </div>
              <hr />
            </>
          )}
          <div className="calculate-nfty">
            <div className="d-flex justify-content-space-between">
              <div>
                <div className="head-text">
                  <img className="nfty-logo" src={nftyLogo} alt="" />
                  Enter NFTY
                </div>
              </div>
              <div className="d-flex">
                <div className="head-text mr-3">~$300</div>
                <button
                  className="plus-minus-btn f-b mr-3"
                  onClick={() => {
                    setIsStake(true);
                    setStakeUnstakeModal(true);
                  }}
                >
                  +
                </button>
                <button
                  className="plus-minus-btn f-b"
                  onClick={() => {
                    setIsStake(false);
                    setStakeUnstakeModal(true);
                  }}
                >
                  -
                </button>
              </div>
            </div>
            <div className="d-flex justify-content-center">
              <div className="calculated-amount w-100">
                <input
                  className="form-control"
                  type="number"
                  placeholder="0.00"
                />
              </div>
            </div>
            {!account && (
              <div className="before-login-btn">
                <div className="d-flex justify-content-space-between mt-3">
                  <button
                    className="orange-btn w-100 mr-2"
                    onClick={() => setRoiCalcModalOpen(true)}
                  >
                    ROI Calculator
                  </button>
                  <button
                    className="yellow-btn w-100 ml-1"
                    onClick={() => setConnectWalletModalOpen(true)}
                  >
                    Connect Wallet
                  </button>
                </div>
              </div>
            )}
          </div>
          {account && (
            <div className="after-login-btn">
              <div>
                <button
                  className="orange-btn w-100"
                  onClick={() => setRoiCalcModalOpen(true)}
                >
                  ROI Calculator
                </button>
              </div>
              <div className="d-flex justify-content-space-between mt-3">
                <button
                  className="orange-btn w-100 mr-2"
                  onClick={() => setAPREarnedModalOpen(true)}
                >
                  Collect APR
                </button>
                <button className="yellow-btn w-100 ml-1"> Buy NFTY</button>
              </div>
            </div>
          )}
        </div>

        <div className="row d-flex pt-2 pb-2 stats mt-2 ">
          <div className="col-sm-4 pl-4">
            <div className="head-text margin-top">{staker?.APR}%</div>
            <div className="simple-text">APR</div>
            <hr />
          </div>
          <div className="col-sm-4 pl-4 mt-2">
            <div className="head-text">
              <img className="nfty-logo" src={nftyLogo} alt="" />
              {staker?.StakedNFTYBalance}
            </div>
            <div className="simple-text">Total Staked</div>
            <hr />
          </div>
          <div className="col-sm-4 pl-4 mt-2">
            <div className="head-text">${staker?.TotalRewards?.$numberDecimal}</div>
            <div className="simple-text">Total Rewards</div>
          </div>
        </div>
        <div className="d-flex pt-3 ">
          <span className="simple-text text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
            lacus nisi, viverra ac ultrices non, mattis viverra dolor.
            Pellentesque.
          </span>
        </div>
      </div>
      {roiCalcModalOpen && (
        <ROICalculatorModal modalOpenClose={setRoiCalcModalOpen} />
      )}
      {connectWalletModalOpen && (
        <ConnectWalletModal modalOpenClose={setConnectWalletModalOpen} />
      )}
      {stakeUnstakeModalOpen && (
        <StakeUnstakeModal
          isStakeModal={isStake}
          modalOpenClose={setStakeUnstakeModal}
        />
      )}
      {APREarnedModalOpen && (
        <APREarnedModal modalOpenClose={setAPREarnedModalOpen} />
      )}
    </React.Fragment>
  );
};

export default Stakes;
