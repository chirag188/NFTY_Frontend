import React from "react";
import Modal from "../../components/Modal/Modal";
import nftyLogo from "../../assets/images/coinLogo.png";
import { useStakingContract } from "./../../hooks";
import { useWeb3React } from "@web3-react/core";
import { useSelector } from "react-redux";

const RewardsEarnedModal = (props) => {
  const { usdAmount } = props;
  const { account } = useWeb3React();
  const StakingContract = useStakingContract();
  const closeModal = () => {
    const { modalOpenClose } = props;
    modalOpenClose(false);
  };
  const staker = useSelector((state) => state.stakerReducer);

  const collectRewards = async () => {
    StakingContract.methods
      .claimRewards()
      .estimateGas({ from: account })
      .then((gasLimit) => {
        StakingContract.methods
          .claimRewards()
          .send({ from: account, gasLimit })
          .then((result) => console.log(result))
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  };
  const FooterComponent = () => (
    <div className="w-100 mt-3 apr-earned-modal-footer">
      <button className="orange-btn w-100 f-18" onClick={collectRewards}>
        Claim
      </button>
    </div>
  );

  return (
    <Modal
      closeModal={closeModal}
      headerTitle="Rewards"
      FooterComponent={FooterComponent}
      footerModalClass="footer-bg"
      modalClass="custom-modal"
    >
      <div className="apr-earned-modal p-3">
        <div className="row">
          <div className="col-6 mt-1 opacity"> Total NFTY Rewards</div>
          <div className="col-6">
            <img className="mr-2" src={nftyLogo} alt="" />
            <span className="f-b f-20">
              {staker?.TotalRewards?.$numberDecimal}
            </span>
          </div>
        </div>
        <div className="row justify-content-space-around">
          <div className="col-6 mt-1 opacity">Unclaimed Rewards</div>
          <div className="col-6">
            <img className="mr-2" src={nftyLogo} alt="" />
            <span className="f-b f-20">{staker?.UnclaimedRewards}</span>{" "}
            <span className="ml-3 mb-3 f-12">
              ~${usdAmount * staker?.UnclaimedRewards}
            </span>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default RewardsEarnedModal;
