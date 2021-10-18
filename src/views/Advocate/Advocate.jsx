import React, { useState } from "react";
import nftyLogo from "../../assets/images/coinLogo.png";
import ConnectWalletModal from "../Stakes/ConnectWalletModal";
import RewardsEarnedModal from "./RewardsEarnedModal";

const Advocate = () => {
  const isLogin = sessionStorage.getItem("jwtToken");

  const [rewardsEarnedModalOpen, setRewardsEarnedModalOpen] = useState(false);
  const [connectWalletModalOpen, setConnectWalletModalOpen] = useState(false);

  return (
    <React.Fragment>
      <div className="container">
        <div className="advocate">
          <div className="advocate-text">
            <div className="advocate-heading-text">Lorem Ipsum Dolor</div>
            <div className="advocate-body-text mt-3">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              iaculis convallis mauris, id finibus lectus tristique ut. Donec
              lacinia magna id nibh vehicula faucibus. Mauris venenatis leo
              tellus, pulvinar rhoncus enim luctus eu. Donec condimentum
              sagittis dolor et mattis.
              <br />
              <br />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              iaculis convallis mauris, id finibus lectus tristique ut. Donec
              lacinia magna id nibh vehicula faucibus. Mauris venenatis leo
              tellus, pulvinar rhoncus enim luctus eu. Donec condimentum
              sagittis dolor et mattis.
            </div>
          </div>
          {isLogin ? (
            <div className="d-flex justify-content-center mt-3">
              <button className="orange-btn w-50"> Go To VLBO</button>
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

          <div className="row d-flex pt-2 pb-2 stats mt-3">
            <div className="col-sm-4 mt-2 pl-4">
              <div className="head-text">34</div>
              <div className="advocate-body-text f-12">Total Allocation</div>
              <hr className="stats-hr" />
            </div>
            <div className="col-sm-4 pl-4 mt-2">
              <div className="head-text">
                <img className="nfty-logo" src={nftyLogo} alt="" />
                12,456
              </div>
              <div className="advocate-body-text">Total NFTY Allocated</div>
              <hr className="stats-hr" />
            </div>
            <div className="col-sm-4 pl-4 mt-2">
              <div className="head-text">$12,351</div>
              <div className="advocate-body-text ">Total Rewards</div>
            </div>
          </div>
          {isLogin && (
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
          )}
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
