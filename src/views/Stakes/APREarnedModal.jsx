import React from "react";
import Modal from "../../components/Modal/Modal";
import nftyLogo from "../../assets/images/coinLogo.png";
import { useStakingContract } from "./../../hooks";
import { useWeb3React } from "@web3-react/core";

const RewardsEarnedModal = (props) => {
  const { account } = useWeb3React();
  const StakingContract =useStakingContract();
  const closeModal = () => {
    const { modalOpenClose } = props;
    modalOpenClose(false);
  };
  const collectRewards = async() => {
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
  }
  const FooterComponent = () => (
    <div className="w-100 mt-3 apr-earned-modal-footer">
      <button className="orange-btn w-100 f-18" onClick={collectRewards}>Collect</button>
    </div>
  );

  return (
    <Modal
      closeModal={closeModal}
      headerTitle="APR Earned"
      FooterComponent={FooterComponent}
      footerModalClass="footer-bg"
      modalClass="custom-modal"
    >
      <div className="apr-earned-modal p-3">
        <div className="row">
          <div className="col-6 mt-1 opacity"> Total APR Earned</div>
          <div className="col-6">
            <img className="mr-2" src={nftyLogo} alt="" />
            <span className="f-b f-20">3244</span>
          </div>
        </div>
        <div className="row justify-content-space-around">
          <div className="col-6 mt-1 opacity">Unclaimed APR</div>
          <div className="col-6">
            <img className="mr-2" src={nftyLogo} alt="" />
            <span className="f-b f-20">3244</span>{" "}
            <span className="ml-3 mb-3 f-12">~$5.98</span>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default RewardsEarnedModal;
