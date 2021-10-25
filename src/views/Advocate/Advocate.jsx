import { useWeb3React } from "@web3-react/core";
import React, { useState } from "react";
import nftyLogo from "../../assets/images/coinLogo.png";
import ConnectWalletModal from "../Stakes/ConnectWalletModal";
import RewardsEarnedModal from "./RewardsEarnedModal";

const Advocate = () => {
  const { account } = useWeb3React();

  const [rewardsEarnedModalOpen, setRewardsEarnedModalOpen] = useState(false);
  const [connectWalletModalOpen, setConnectWalletModalOpen] = useState(false);

  return (
    <React.Fragment>
      <div className="container">
        <div className="advocate">
          <div className="advocate-text">
            <div className="advocate-heading-text">
              {" "}
              Advocate for the Art You Love
            </div>
            <div className="advocate-body-text mt-3">
              The Nifty Protocol aims to apply a reputation layer to all NFTs
              across all marketplaces. This protocol provides value for all
              parties to an NFT auction across all barriers - all who implement
              it will benefit. Sellers gain value from greater sales prices
              thanks to heightened visibility, buyers gain value from protection
              against fraud and gaining an idea of the value of items on which
              they’re bidding, advocates receive a percentage of the final sales
              price, and platforms benefit from the drastic reduction in
              fraudulent and low-quality content.
            </div>
          </div>
          {account ? (
            <div className="d-flex justify-content-center mt-3">
              <div className="banner"> Advocacy Coming Soon</div>
            </div>
          ) : (
            <div className="d-flex justify-content-center mt-3">
              <button
                className="yellow-btn w-50"
                onClick={() => setConnectWalletModalOpen(true)}
              >
                {" "}
                Connect To Wallet
              </button>
            </div>
          )}

          <div className="row d-flex pt-2 pb-2 pr-0 ml-0 stats mt-3">
            <div className="col-sm-4 mt-2 pl-4">
              <div className="head-text">0</div>
              <div className="advocate-body-text f-12">Total Allocation</div>
              <hr className="stats-hr" />
            </div>
            <div className="col-sm-4 pl-4 mt-2">
              <div className="head-text">
                <img className="nfty-logo" src={nftyLogo} alt="" />0
              </div>
              <div className="advocate-body-text">Total NFTY Allocated</div>
              <hr className="stats-hr" />
            </div>
            <div className="col-sm-4 pl-4 mt-2">
              <div className="head-text">$0</div>
              <div className="advocate-body-text ">Total Rewards</div>
            </div>
          </div>
          {/* {account && (
            <>
              <div className="d-flex justify-content-center mt-3">
                <button
                  className="yellow-btn w-50"
                  onClick={() => setRewardsEarnedModalOpen(true)}
                >
                  {" "}
                  Collect My Rewards
                </button>
              </div>
              <div className="text-center advocate-body-text p-2 mt-1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Praesent lacus nisi, viverra ac ultrices non, mattis viverra
                dolor. Pellentesque.
              </div>
            </>
          )} */}
        </div>
      </div>
      {rewardsEarnedModalOpen && (
        <RewardsEarnedModal modalOpenClose={setRewardsEarnedModalOpen} />
      )}
      {connectWalletModalOpen && (
        <ConnectWalletModal modalOpenClose={setConnectWalletModalOpen} />
      )}
    </React.Fragment>
  );
};

export default Advocate;
