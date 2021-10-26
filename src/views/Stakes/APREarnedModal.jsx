import React, { useState } from "react";
import Modal from "../../components/Modal/Modal";
import nftyLogo from "../../assets/images/coinLogo.png";
import { useStakingContract } from "./../../hooks";
import { useWeb3React } from "@web3-react/core";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { balance, stakerData } from "../../store/actions";
import { useDispatch } from "react-redux";

const options = {
  position: "top-center",
  autoClose: 2200,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
  toastId: "1",
};
const RewardsEarnedModal = (props) => {
  const { usdAmount } = props;
  const { account, deactivate } = useWeb3React();
  const StakingContract = useStakingContract();
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const closeModal = () => {
    const { modalOpenClose } = props;
    modalOpenClose(false);
  };
  const staker = useSelector((state) => state.stakerReducer);

  const collectRewards = async () => {
    if (staker?.UnclaimedRewards === "0") {
      toast.error("No rewards pending to be claimed", options);
      return;
    }
    setLoader(true);
    StakingContract.methods
      .claimRewards()
      .estimateGas({ from: account })
      .then((gasLimit) => {
        StakingContract.methods
          .claimRewards()
          .send({ from: account, gasLimit })
          .then((result) => {
            setLoader(false);
            toast.success("Reward Collected Successfully", options);
            closeModal();
            dispatch(stakerData({ deactivate }));
            dispatch(balance());
          })
          .catch((error) => {
            setLoader(false);
            toast.error(error.message, options);
          });
      })
      .catch((error) => {
        console.log(error);
        setLoader(false);
        toast.error(error.message, options);
      });
  };
  const FooterComponent = () => (
    <div className="w-100 mt-3 apr-earned-modal-footer">
      <button className="orange-btn w-100 f-18" onClick={collectRewards}>
        {loader ? <Spinner animation="border" role="status" /> : "Claim"}
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
              {(
                staker?.TotalRewards?.$numberDecimal / 1000000000000000000
              ).toFixed(4)}
            </span>
          </div>
        </div>
        <div className="row justify-content-space-around">
          <div className="col-6 mt-1 opacity">Unclaimed Rewards</div>
          <div className="col-6">
            <img className="mr-2" src={nftyLogo} alt="" />
            <span className="f-b f-20">
              {(staker?.UnclaimedRewards / 1000000000000000000).toFixed(4)}
            </span>{" "}
            <span className="ml-3 mb-3 f-12">
              ~$
              {(
                usdAmount *
                (staker?.UnclaimedRewards / 1000000000000000000)
              ).toFixed(4)}
            </span>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default RewardsEarnedModal;
