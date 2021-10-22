import React, { useEffect, useState } from "react";
import StarImg from "../../assets/images/Star.png";
import GoldStarImg from "../../assets/images/GoldStar.png";
import nftyLogo from "../../assets/images/coinLogo.png";
import ROICalculatorModal from "./ROICalculatorModal";
import ConnectWalletModal from "./ConnectWalletModal";
import StakeUnstakeModal from "./StakeUnstakeModal";
import APREarnedModal from "./APREarnedModal";
import { ProgressBar } from "react-bootstrap";
import axios from "axios";
import { useWeb3React } from "@web3-react/core";
import { useDispatch, useSelector } from "react-redux";
import { stakerData, balance } from "../../store/actions/Stake/Stake";
import { tierArr } from "../../utils/tierArray";
import { toast } from "react-toastify";

const options = {
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
};
const Stakes = () => {
  const [roiCalcModalOpen, setRoiCalcModalOpen] = useState(false);
  const [connectWalletModalOpen, setConnectWalletModalOpen] = useState(false);
  const [stakeUnstakeModalOpen, setStakeUnstakeModal] = useState(false);
  const [APREarnedModalOpen, setAPREarnedModalOpen] = useState(false);
  const [marketData, setMarketData] = useState();
  const [isStake, setIsStake] = useState(false);
  const { account } = useWeb3React();
  const dispatch = useDispatch();

  const makeAPICall = () => {
    axios
      .get(`https://api.coingecko.com/api/v3/coins/nifty-token`)
      .then((res) => {
        const responce = res.data?.tickers[0]?.converted_last?.usd;
        setMarketData(responce);
      });
  };
  useEffect(() => {
    const JwtToken = localStorage.getItem("JwtToken");
    if (JwtToken) {
      dispatch(stakerData());
      dispatch(balance());
    }
    makeAPICall();
  }, []);

  const staker = useSelector((state) => state.stakerReducer);
  const [nftyToken, setNftyToken] = useState();
  const usdValue = account
    ? (marketData && marketData) * staker?.StakedNFTYBalance
    : (marketData && marketData) * nftyToken;
  let userData = tierArr.find((data, i) => {
    if (data.rank === staker?.Tier) {
      return true;
    }
  });
  let nextTierData = tierArr.find((data, i) => {
    if (Number(data.rank) === Number(staker?.Tier) + 1) {
      return true;
    }
  });
  if (staker?.Tier === "6") {
    nextTierData = userData;
  }
  if (staker?.StakedNFTYBalance === 0) {
    nextTierData = userData;
  }

  const streakDays = Math.floor(Number(staker?.StakePeriodInSecs) / 86400);

  return (
    <React.Fragment>
      <div className="container stakes">
        <div className="special-nfty-reward">
          <div className="sp-header-text">NFTY Special Reward</div>
          <div className="simple-text text-center">
            Early NFTY stakers receive airdrops. These founder NFTs will only be
            minted once. Stake today to lay your claim on this once in a
            lifetime opportunity.
          </div>
        </div>
        <div className="mt-2 data-container">
          {account && (
            <>
              <div className="w-100 text-center p-2">
                <img className="star-img mr-2 mb-1" src={StarImg} alt="" />
                <span className="f-14">
                  {staker?.Tier === "0"
                    ? "Stake to be in a rank"
                    : `${userData && userData.name} is your current rank`}{" "}
                </span>
              </div>
              <hr />
              <div className="row user-stats mt-1 mb-1">
                <div className="col-md-3">
                  <div className="p-3">
                    <div className="head-text text-center">
                      <img className="nfty-logo" src={nftyLogo} alt="" />
                      {staker?.APR}
                    </div>
                    <div className="simple-text text-center">Reward Earned</div>
                  </div>
                </div>
                <div className="col-md-6 target-data-border">
                  <div className="w-100 text-center p-1">
                    <img
                      className="star-img mr-2 mb-1"
                      src={GoldStarImg}
                      alt=""
                    />
                    <span className="f-14">
                      Progress Towards {nextTierData && nextTierData.name}
                    </span>
                  </div>
                  <div className="d-flex pt-2 target-data">
                    <div>
                      <div>
                        <span className="f-b mr-2">Streak</span>
                        <span className="f-12">
                          {staker?.Tier === "0"
                            ? "Any"
                            : `${streakDays && streakDays} of 
                          ${nextTierData && nextTierData.timeStaked} Days`}
                        </span>
                      </div>
                      <div
                        className="progress-bar"
                        style={{ marginTop: "1.7px", height: "13px" }}
                      >
                        <ProgressBar
                          variant="warning"
                          now={
                            ((streakDays && streakDays) /
                              (nextTierData && nextTierData.timeStaked)) *
                            100
                          }
                        />
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
                        <span className="f-12">
                          {staker?.StakedNFTYBalance} of{" "}
                          {nextTierData && nextTierData.nftyStaked}
                        </span>
                      </div>
                      <div className="progress-bar">
                        <ProgressBar
                          variant="warning"
                          now={
                            (staker?.StakedNFTYBalance /
                              (nextTierData && nextTierData.nftyStaked)) *
                            100
                          }
                        />
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
                  {account ? "Staked NFTY" : "Enter NFTY"}
                </div>
              </div>
              <div className="d-flex">
                <div className="head-text mr-3">
                  ~$
                  {usdValue && usdValue !== 0 ? usdValue.toFixed(2) : 0}
                </div>
                <button
                  className="plus-minus-btn f-b mr-3"
                  onClick={() => {
                    if (account) {
                      setIsStake(true);
                      setStakeUnstakeModal(true);
                    } else {
                      setConnectWalletModalOpen(true);
                    }
                  }}
                >
                  +
                </button>
                <button
                  className="plus-minus-btn f-b"
                  onClick={() => {
                    if (account) {
                      setIsStake(false);
                      setStakeUnstakeModal(true);
                    } else {
                      setConnectWalletModalOpen(true);
                    }
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
                  value={account ? staker?.StakedNFTYBalance : nftyToken}
                  onChange={(e) => {
                    if (!account) {
                      if (e.target.value < 1) {
                        toast.error(
                          "Value should be greater than or equal to 1",
                          options
                        );
                      } else {
                        setNftyToken(e.target.value);
                      }
                    }
                  }}
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
                  Collect Reward
                </button>
                <button className="yellow-btn w-100 ml-1">
                  <a
                    className="nav-link f-b"
                    // eslint-disable-next-line max-len
                    href="https://app.uniswap.org/#/swap?inputCurrency=eth&outputCurrency=0x3085154623f51b00dedfc6ceeb5197277a66b17b"
                    target="_blank"
                    style={{ color: "#000000" }}
                  >
                    Buy NFTY
                  </a>
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="row d-flex pt-2 pb-2 stats mt-2 ">
          <div className="col-sm-4 pl-4">
            <div className="head-text margin-top">{staker?.APR}%</div>
            <div className="simple-text">Reward</div>
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
            <div className="head-text">
              $
              {staker?.TotalRewards?.$numberDecimal
                ? (
                    staker?.TotalRewards?.$numberDecimal / 1000000000000000000
                  ).toFixed(4)
                : 0}
            </div>
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
          setStakeModal={setIsStake}
        />
      )}
      {APREarnedModalOpen && (
        <APREarnedModal
          modalOpenClose={setAPREarnedModalOpen}
          usdAmount={marketData}
        />
      )}
    </React.Fragment>
  );
};

export default Stakes;
