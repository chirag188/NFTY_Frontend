import React from "react";
import Modal from "../../components/Modal/Modal";
import metamaskImg from "../../assets/images/metamask.png";
import walletConnectImg from "../../assets/images/wallet-Connect.png";
import coinbaseImg from "../../assets/images/coinbase.png";
import trustwalletImg from "../../assets/images/trustwallet.png";
import formaticeWallet from "../../assets/images/formatice.png";

const ConnectWalletModal = (props) => {
  const closeModal = () => {
    const { modalOpenClose } = props;
    modalOpenClose(false);
  };

  return (
    <Modal
      closeModal={closeModal}
      headerTitle="Connect Wallet"
      headerSubTitle="Lorem ipsum dolor sit amet, consectetur adipisci ngmet, consectetur adipiscing."
    >
      <div className="connect-wallet-modal">
        <div className="row text-center">
          <div className="col-sm-4 d-flex justify-content-center">
            <button className="btn">
              <div className="w-100 text-center">
                <img src={metamaskImg} alt="" />
              </div>
              <span className="mt-2">Meta Mask</span>
            </button>
          </div>
          <div className="col-sm-4 d-flex justify-content-center">
            <button className="btn">
              <div className="w-100 text-center">
                <img src={walletConnectImg} alt="" />
              </div>
              <span className="mt-2">Wallet Connect</span>
            </button>
          </div>
          <div className="col-sm-4 d-flex justify-content-center">
            <button className="btn">
              <div className="w-100 text-center">
                <img className="" src={formaticeWallet} alt="" />
              </div>
              <span className="mt-2">Formatice</span>
            </button>
          </div>
        </div>
        <div className="row text-center   ">
          <div className="col-sm-6 d-flex justify-content-center">
            <button className="btn">
              <div className="w-100 text-center">
                <img className="" src={trustwalletImg} alt="" />
              </div>
              <span className="mt-2">Trust Wallet</span>
            </button>
          </div>
          <div className="col-sm-6 d-flex justify-content-center">
            <button className="btn">
              <div className="w-100 text-center">
                <img className="" src={coinbaseImg} alt="" />
              </div>
              <span className="mt-2">Coin Base</span>
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ConnectWalletModal;
