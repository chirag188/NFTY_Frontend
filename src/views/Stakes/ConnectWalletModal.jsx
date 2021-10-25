import React, { useEffect, useRef, useState } from "react";
import Modal from "../../components/Modal/Modal";
import metamaskImg from "../../assets/images/metamask.png";
import walletConnectImg from "../../assets/images/wallet-Connect.png";
import coinbaseImg from "../../assets/images/coinbase.png";
// import trustwalletImg from "../../assets/images/trustwallet.png";
import formaticeWallet from "../../assets/images/formatice.png";
import MetaMaskOnboarding from "@metamask/onboarding";
import { useWeb3React } from "@web3-react/core";
import {
  injected,
  walletconnect,
  walletLink,
  fortmatic,
} from "./../../utils/connectors";
import { Spinner } from "react-bootstrap";

const ConnectWalletModal = (props) => {
  const closeModal = () => {
    const { modalOpenClose } = props;
    modalOpenClose(false);
  };
  const [loader, setLoader] = useState(false);

  const { account, activate, connector } = useWeb3React();
  const onboarding = useRef();
  useEffect(() => {
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding();
    }
  }, []);
  useEffect(() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      if (account && account.length > 0) {
        onboarding.current.stopOnboarding();
      }
    }
  }, [account]);
  const onConnectWithMetamaskClick = () => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      activate(injected);
    } else {
      onboarding.current.startOnboarding();
    }
    localStorage.setItem("fortmaticConnect", "false");
  };

  const [activatingConnector, setActivatingConnector] = useState();
  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
      setLoader(false);
    }
  }, [activatingConnector, connector]);

  const onConnectWithWalletConnectClick = () => {
    setLoader(true);
    setActivatingConnector(walletconnect);
    activate(walletconnect);
    localStorage.setItem("fortmaticConnect", "false");
  };

  const onLinkConnectClick = () => {
    setLoader(true);
    setActivatingConnector(walletLink);
    activate(walletLink);
    localStorage.setItem("fortmaticConnect", "false");
  };

  const onConnectWithFortmaticClick = async () => {
    setLoader(true);
    setActivatingConnector(fortmatic);
    activate(fortmatic);
    localStorage.setItem("fortmaticConnect", "true");
  };

  return (
    <Modal
      closeModal={closeModal}
      headerTitle="Connect Wallet"
      headerSubTitle="Choose your wallet and get ready to begin your NFTY journey."
      footerModalClass="p-0"
    >
      {loader ? (
        <Spinner
          animation="border"
          role="status"
          style={{ alignSelf: "center", marginTop: "10%", marginBottom: "10%" }}
        />
      ) : (
        <div className="connect-wallet-modal">
          <div className="row text-center">
            <div className="col-sm-6 d-flex justify-content-center">
              <button className="btn" onClick={onConnectWithMetamaskClick}>
                <div className="w-100 text-center">
                  <img src={metamaskImg} alt="" />
                </div>
                <span className="mt-2">Meta Mask</span>
              </button>
            </div>
            <div className="col-sm-6 d-flex justify-content-center">
              <button className="btn" onClick={onConnectWithWalletConnectClick}>
                <div className="w-100 text-center">
                  <img className="mb-2" src={walletConnectImg} alt="" />
                </div>
                <span className="">Wallet Connect</span>
              </button>
            </div>
          </div>
          <div className="row text-center   ">
            <div className="col-sm-6 d-flex justify-content-center">
              <button className="btn" onClick={onConnectWithFortmaticClick}>
                <div className="w-100 text-center">
                  <img className="" src={formaticeWallet} alt="" />
                </div>
                <span className="mt-2">Fortmatic</span>
              </button>
            </div>

            <div className="col-sm-6 d-flex justify-content-center">
              <button className="btn" onClick={onLinkConnectClick}>
                <div className="w-100 text-center">
                  <img className="" src={coinbaseImg} alt="" />
                </div>
                <span className="mt-2">Coin Base</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default ConnectWalletModal;
