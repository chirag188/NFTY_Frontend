import React from "react";
import Modal from "../../components/Modal/Modal";
import rewardLogo from "../../assets/images/rewardIcon.png";

const RewardsEarnedModal = (props) => {
  const closeModal = () => {
    const { modalOpenClose } = props;
    modalOpenClose(false);
  };
  const FooterComponent = () => (
    <div className="w-100 mt-3 apr-earned-modal-footer">
      <button className="orange-btn w-100 f-18">Collect</button>
    </div>
  );

  return (
    <Modal
      closeModal={closeModal}
      headerTitle="Rewards Earned"
      FooterComponent={FooterComponent}
      footerModalClass="footer-bg"
    >
      <div className="rewards-earned-modal p-3">
        <div className="row mt-2">
          <div className="col-6 opacity">Total Rewards Earned</div>
          <div className="col-6">
            <span className="f-b f-18">67.36</span>{" "}
            <img className="mr-2" src={rewardLogo} alt="" />
            <span className="ml-3 mb-2 f-16 opacity">~$5.98</span>
          </div>
        </div>
        <div className="row justify-content-space-around mt-2">
          <div className="col-6 opacity">Unclaimed Rewards</div>
          <div className="col-6">
            <span className="f-b f-18">47.36</span>{" "}
            <img className="mr-2" src={rewardLogo} alt="" />
            <span className="ml-3 mb-2 opacity f-16 pb-1">~$5.98</span>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default RewardsEarnedModal;
