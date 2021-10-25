/* eslint-disable react/jsx-no-target-blank */
import React, { useEffect, useState } from "react";
import Modal from "../../components/Modal/Modal";
import Slider, {
  // createSliderWithTooltip,
  SliderTooltip,
} from "rc-slider";
import nftyLogo from "../../assets/images/coinLogo.png";
import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";
import "../../assets/slider-index.less";
import Web3Utils from "web3-utils";
import { useNFTYContract, useStakingContract } from "../../hooks";
import { useWeb3React } from "@web3-react/core";
import axios from "axios";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";

const options = {
  position: "top-center",
  autoClose: 1200,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
};

const StakeUnstakeModal = (props) => {
  const { isStakeModal, setStakeModal } = props;
  const { account } = useWeb3React();
  const NFTYContract = useNFTYContract();
  const StakingContract = useStakingContract();
  const [marketData, setMarketData] = useState();
  const staker = useSelector((state) => state.stakerReducer);
  const [loader, setLoader] = useState(false);

  const makeAPICall = () => {
    axios
      .get(`https://api.coingecko.com/api/v3/coins/nifty-token`)
      .then((res) => {
        const responce = res.data?.tickers[0]?.converted_last?.usd;
        setMarketData(responce);
      });
  };
  useEffect(() => {
    makeAPICall();
  }, []);

  const [stakeValue, setStakeValue] = useState(0);
  const [rollerValue, setRollerValue] = useState(0);
  const handleChange = (e) => {
    setRollerValue(e);
    const value =
      (e * (isStakeModal ? staker?.balance : staker?.StakedNFTYBalance)) / 100;
    setStakeValue(value);
  };
  const usdValue =
    (marketData && marketData) * (stakeValue === 0 ? 1 : stakeValue);
  const closeModal = () => {
    const { modalOpenClose } = props;
    modalOpenClose(false);
  };
  // const SliderWithTooltip = createSliderWithTooltip(Slider);

  const { Handle } = Slider;

  const handle = (props) => {
    const { value, dragging, index, ...restProps } = props;
    return (
      <SliderTooltip
        prefixCls="rc-slider-tooltip"
        overlay={`${value} %`}
        visible={dragging}
        placement="top"
        align={{
          offset: [0, -20],
        }}
        key={index}
      >
        <Handle value={value} {...restProps} />
      </SliderTooltip>
    );
  };

  const stakeTokens = () => {
    if (stakeValue < 1) {
      if (isStakeModal) {
        toast.clearWaitingQueue();
        toast.error(
          " Stake Value should be greater than or equal to 1",
          options
        );
      } else {
        toast.error(
          " Unstake Value should be greater than or equal to 1",
          options
        );
      }
    } else {
      if (!stakeValue) return;
      setLoader(true);
      if (isStakeModal) {
        NFTYContract.methods
          .approve(
            process.env.REACT_APP_STAKING_CONTRACT_ADDRESS,
            Web3Utils.toWei(stakeValue.toString())
          )
          .send({ from: account, gasLimit: 600000 })
          .then(() => {
            StakingContract.methods
              .stakeTokens(Web3Utils.toWei(stakeValue.toString()))
              .estimateGas({ from: account })
              .then((gasLimit) => {
                StakingContract.methods
                  .stakeTokens(Web3Utils.toWei(stakeValue.toString()))
                  .send({ from: account, gasLimit })
                  .then((result) => {
                    setLoader(false);
                    toast.success("Staked Successful", options);
                  })
                  .catch((error) => {
                    setLoader(false);
                    toast.error(
                      "Something Went Wrong please try again",
                      options
                    );
                  });
              })
              .catch((error) => {
                setLoader(false);
                toast.error("Something Went Wrong please try again", options);
              });
          })
          .catch((error) => {
            setLoader(false);
            toast.error("Something Went Wrong please try again", options);
          });
      } else {
        StakingContract.methods
          .unstakeTokens(Web3Utils.toWei(stakeValue.toString()))
          .estimateGas({ from: account })
          .then((gasLimit) => {
            StakingContract.methods
              .unstakeTokens(Web3Utils.toWei(stakeValue.toString()))
              .send({ from: account, gasLimit })
              .then((result) => {
                setLoader(false);
                toast.success("Unstaked Successful", options);
              })
              .catch((error) => {
                setLoader(false);
                toast.error("Something Went Wrong please try again", options);
              });
          })
          .catch((error) => {
            setLoader(false);
            toast.error("Something Went Wrong please try again", options);
          });
      }
    }
  };
  // const unStakeAllTokens = () => {
  //   StakingContract.methods
  //     .unstakeAll()
  //     .estimateGas({ from: account })
  //     .then((gasLimit) => {
  //       StakingContract.methods
  //         .unstakeAll()
  //         .send({ from: account, gasLimit })
  //         .then((result) => console.log(result))
  //         .catch((error) => console.log(error));
  //     })
  //     .catch((error) => console.log(error));
  // };
  console.log(stakeValue);
  const FooterComponent = () => (
    <div className="stake-unstake-modal-footer w-100">
      <div className="d-flex justify-content-space-between mt-3">
        {isStakeModal ? (
          <button className="yellow-btn w-100 f-14">
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
        ) : (
          <button
            className="yellow-btn w-100 f-14"
            onClick={() => {
              setStakeModal(true);
              setStakeValue(0);
              setRollerValue(0);
            }}
          >
            Stake
          </button>
        )}
        {isStakeModal ? (
          <button className="orange-btn w-100 ml-3 f-14" onClick={stakeTokens}>
            {loader ? <Spinner animation="border" role="status" /> : "Stake"}
          </button>
        ) : (
          <button className="orange-btn w-100 ml-3 f-14" onClick={stakeTokens}>
            {loader ? <Spinner animation="border" role="status" /> : "Unstake"}
          </button>
        )}
      </div>
    </div>
  );

  return (
    <Modal
      closeModal={closeModal}
      headerTitle={isStakeModal ? "Stake in Pool" : "Unstake"}
      FooterComponent={FooterComponent}
      footerModalClass="footer-bg"
      headerSubTitle={
        isStakeModal
          ? "There’s strength in numbers. The longer you stake and the more NFTY you stake determines your Social Rank. The higher Social Rank the higher the rewards. The more NFTY you stake the more NFT auctions you can advocate towards. Choose the amount of NFTY you want to stake and confirm"
          : "Unstaking your NFTY tokens will remove the amount of NFTY that are generating staking rewards. If all NFTY is unstaked your staking streak will be reset to zero."
      }
      isTooltip
    >
      <div className="stake-unstake-modal p-1">
        <div className="mt-4 pl-3">
          <div className="d-flex justify-content-space-between">
            <div>
              <div className="f-b">
                <img className="nfty-logo" src={nftyLogo} alt="" />
                Enter NFTY
              </div>
            </div>
            <div className="d-flex">
              <div className="f-b mr-3">
                ~$
                {usdValue && usdValue !== 0
                  ? usdValue.toFixed(2)
                  : marketData && marketData?.toFixed(2)}
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <div className="calculated-amount">
              <input
                className="form-control"
                type="number"
                placeholder="0.00"
                value={stakeValue || ""}
                onChange={(event) => {
                  if (event.target.value < 1) {
                    toast.error(
                      "Value should be greater than or equal to 1",
                      options
                    );
                  }
                  setStakeValue(event.target.value);
                  const value = Math.floor(
                    (event.target.value * 100) /
                      (isStakeModal
                        ? staker?.balance
                        : staker?.StakedNFTYBalance)
                  );
                  setRollerValue(value > 100 ? 100 : value);
                }}
              />
            </div>
          </div>
        </div>
        <hr />
        <div className="w-100 mt-1">
          <div className="text-center f-b ml-3">
            Staked Balance: ${staker?.StakedNFTYBalance}
          </div>
          <div className="text-center f-b ml-3 mt-2">
            Balance: ${staker?.balance}
          </div>
          <div className=" w-100">
            <div style={{ maxWidth: 400, margin: "16px 50px" }}>
              <div className="f-12">
                {isStakeModal ? "Stake" : "Unstake"} {rollerValue}%
              </div>
              <Slider
                min={0}
                max={100}
                defaultValue={0}
                handle={handle}
                handleStyle={{
                  height: "16px",
                  width: "16px",
                  marginTop: "0px",
                }}
                value={rollerValue}
                onChange={(e) => handleChange(e)}
                // onAfterChange={handleChange}
                trackStyle={{ height: "14px" }}
                railStyle={{ height: "14px" }}
              />
              <div
                className="row d-flex justify-content-space-between slider-percentage-text mt-3"
                style={{ color: "rgba(0, 0, 0, 0.4)" }}
              >
                <div className=" f-12">0%</div>
                <div className=" f-12">25%</div>
                <div className=" f-12">50%</div>
                <div className=" f-12">75%</div>
                <div className=" f-12">100%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default StakeUnstakeModal;
