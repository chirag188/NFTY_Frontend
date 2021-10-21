import React, { useEffect, useState } from "react";
import Modal from "../../components/Modal/Modal";
import Slider, { createSliderWithTooltip, SliderTooltip } from "rc-slider";
import nftyLogo from "../../assets/images/coinLogo.png";
import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";
import "../../assets/slider-index.less";
import Web3Utils from "web3-utils";
import { useNFTYContract, useStakingContract } from "../../hooks";
import { useWeb3React } from "@web3-react/core";
import axios from "axios";
import { useSelector } from "react-redux";

const StakeUnstakeModal = (props) => {
  const { isStakeModal, setStakeModal } = props;
  const { account } = useWeb3React();
  const NFTYContract = useNFTYContract();
  const StakingContract = useStakingContract();
  const [marketData, setMarketData] = useState();
  const staker = useSelector((state) => state.stakerReducer);

  const makeAPICall = () => {
    const ress = axios
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
    const value = (e * staker?.StakedNFTYBalance) / 100;
    setStakeValue(value);
  };
  const usdValue =
    (marketData && marketData) * (stakeValue === 0 ? 1 : stakeValue);
  const closeModal = () => {
    const { modalOpenClose } = props;
    modalOpenClose(false);
  };
  const SliderWithTooltip = createSliderWithTooltip(Slider);

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
    if (!stakeValue) return;
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
                .then((result) => console.log(result))
                .catch((error) => console.log(error));
            })
            .catch((error) => console.log(error));
        })
        .catch((error) => console.log(error));
    } else {
      StakingContract.methods
        .unstakeTokens(Web3Utils.toWei(stakeValue.toString()))
        .estimateGas({ from: account })
        .then((gasLimit) => {
          StakingContract.methods
            .unstakeTokens(Web3Utils.toWei(stakeValue.toString()))
            .send({ from: account, gasLimit })
            .then((result) => console.log(result))
            .catch((error) => console.log(error));
        })
        .catch((error) => console.log(error));
    }
  };
  const unStakeAllTokens = () => {
    StakingContract.methods
      .unstakeAll()
      .estimateGas({ from: account })
      .then((gasLimit) => {
        StakingContract.methods
          .unstakeAll()
          .send({ from: account, gasLimit })
          .then((result) => console.log(result))
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  };
  const FooterComponent = () => (
    <div className="stake-unstake-modal-footer w-100">
      {isStakeModal && (
        <div className="w-100 text-center">
          <span className="f-12">Annual ROI</span>
          <span className="f-b ml-1">$0.00</span>
        </div>
      )}
      <div className="d-flex justify-content-space-between mt-3">
        <button className="orange-btn w-100 mr-3 f-14" onClick={stakeTokens}>
          Confirm
        </button>
        {isStakeModal ? (
          <button className="yellow-btn w-100 f-14">Buy NFTY</button>
        ) : (
          <button
            className="yellow-btn w-100 f-14"
            onClick={() => setStakeModal(true)}
          >
            Stake
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
          : null
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
                  setStakeValue(event.target.value);
                }}
              />
            </div>
          </div>
        </div>
        <hr />
        <div className="w-100 mt-1">
          <div className="text-center f-b ml-3">
            {isStakeModal
              ? `Staked Balance ${staker?.StakedNFTYBalance}`
              : `Balance ${staker?.StakedNFTYBalance}`}
          </div>
          <div className=" w-100">
            <div style={{ maxWidth: 400, margin: "16px 50px" }}>
              <SliderWithTooltip
                min={0}
                max={100}
                defaultValue={0}
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
