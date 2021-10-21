import React, { useState } from "react";
import Modal from "../../components/Modal/Modal";
import Slider, { createSliderWithTooltip, SliderTooltip } from "rc-slider";
import nftyLogo from "../../assets/images/coinLogo.png";
import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";
import "../../assets/slider-index.less";
import Web3Utils from "web3-utils";
import { useNFTYContract, useStakingContract } from "../../hooks";
import { useWeb3React } from "@web3-react/core";

const StakeUnstakeModal = (props) => {
  const { isStakeModal } = props;
  const { account } = useWeb3React();
  const NFTYContract = useNFTYContract();
  const StakingContract = useStakingContract();
  const [stakeValue,setStakeValue] = useState();
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
    if(!stakeValue)
      return
    if(isStakeModal){
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
  }
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
  }
  const FooterComponent = () => (
    <div className="stake-unstake-modal-footer w-100">
      {isStakeModal && (
        <div className="w-100 text-center">
          <span className="f-12">Annual ROI</span>
          <span className="f-b ml-1">$0.00</span>
        </div>
      )}
      <div className="d-flex justify-content-space-between mt-3">
        <button className="orange-btn w-100 mr-3 f-14" onClick={stakeTokens}>Confirm</button>
        <button className="yellow-btn w-100 f-14" onClick={unStakeAllTokens}>
          {isStakeModal ? "Buy NFTY" : "Stake"}
        </button>
      </div>
    </div>
  );

  return (
    <Modal
      closeModal={closeModal}
      headerTitle={isStakeModal ? "Stake in Pool" : "Unstake"}
      FooterComponent={FooterComponent}
      footerModalClass="footer-bg"
      tooltip={isStakeModal ? "Stake Modal" : "Unstake Modal"}
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
              <div className="f-b mr-3">~$300</div>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <div className="calculated-amount">
              <input
                className="form-control"
                type="number"
                placeholder="0.00"
                onChange={(event) => setStakeValue(event.target.value)}
              />
            </div>
          </div>
        </div>
        <hr />
        <div className="w-100 mt-1">
          <div className="text-center f-b ml-3">
            {isStakeModal ? "Staked Balance 12.09" : "Balance 12.09"}
          </div>
          <div className=" w-100">
            <div style={{ maxWidth: 400, margin: "16px 50px" }}>
              <SliderWithTooltip
                min={0}
                max={100}
                defaultValue={0}
                handle={handle}
                handleStyle={{
                  height: "16px",
                  width: "16px",
                  marginTop: "0px",
                }}
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
