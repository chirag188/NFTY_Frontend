import React, { useEffect, useState } from "react";
import Modal from "../../components/Modal/Modal";
import ExchangeArrowIcon from "../../assets/images/exchangeArrow.png";
import nftyLogo from "../../assets/images/coinLogo.png";
import axios from "axios";
import { tierArr } from "../../utils/tierArray";

const ROICalculatorModal = (props) => {
  const [marketData, setMarketData] = useState(0);
  const [switchData, setSwitchData] = useState(false);
  const [nftyValue, setNftyValue] = useState(0);
  const makeAPICall = () => {
    axios
      .get(`https://api.coingecko.com/api/v3/coins/nifty-token`)
      .then((res) => {
        const responce = res.data?.tickers[0]?.converted_last?.usd;
        setMarketData(responce && responce.toFixed(2));
      });
  };
  useEffect(() => {
    makeAPICall();
  }, []);

  const [nftyToken, setNftyToken] = useState(0);
  const [stakedForDays, setStakedForDays] = useState(0);

  const usdValue = (
    (Number(marketData) && Number(marketData)) *
    (nftyToken === 0 ? 1 : nftyToken)
  ).toFixed(2);

  const closeModal = () => {
    const { modalOpenClose } = props;
    modalOpenClose(false);
  };

  const getStakingReward = (nfty, time) => {
    let minNFTY = 0;
    let minTime = 0;
    if (nfty == 0 && time == 0) {
      return 0;
    }
    for (let i = 0; i < tierArr.length; i++) {
      if (Number(tierArr[i].nftyStaked) > nfty) {
        break;
      }
      minNFTY = tierArr[i];
    }

    for (let i = 0; i < tierArr.length; i++) {
      if (Number(tierArr[i].timeStaked) > time) {
        break;
      }
      minTime = tierArr[i];
    }

    return minNFTY.stakingAPR < minTime.stakingAPR
      ? minNFTY.stakingAPR
      : minTime.stakingAPR;
  };

  const calculatedNfty = (
    (getStakingReward(nftyToken, stakedForDays) * nftyToken * stakedForDays) /
      (100 * 365) +
    Number(nftyToken)
  ).toFixed(2);

  const calculatedFinalUsd = (calculatedNfty * Number(marketData)).toFixed(2);

  const usdToNfty = 1 / Number(marketData);

  const handleChange = (e) => {
    if (switchData) {
      setNftyValue(e.target.value);
      const value =
        e.target.value &&
        e.target.value !== 0 &&
        e.target.value !== undefined &&
        e.target.value !== null
          ? 1 / Number(e.target.value)
          : 0;
      setMarketData(value);
    } else {
      setMarketData(e.target.value);
    }
  };

  const FooterComponent = () => (
    <div className="roi-calc-modal-footer w-100">
      <div className="row w-100 justify-content-space-between">
        <div className="">
          <div className="f-b f-14 mt-1 ml-3"> ROI at Current Rates</div>
        </div>
        <div className="d-flex justify-content-space-evenly">
          <div className="f-12 mt-1">
            ~${calculatedFinalUsd === "NaN" ? 0 : calculatedFinalUsd}
          </div>
          <div>
            <div className="f-b f-18">
              <img className="nfty-logo mr-2" src={nftyLogo} alt="" />
              {calculatedNfty}
            </div>
          </div>
        </div>
      </div>
      <hr className="w-100 mt-2 mb-2" />
      <div>
        <button className="yellow-btn w-100 btn">Buy NFTY</button>
      </div>
      <div className="f-12 text-center mt-2">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent lacus
        nisi, viverra ac ultrices non, mattis viverra dolor. Pellentesque
      </div>
    </div>
  );

  return (
    <Modal
      closeModal={closeModal}
      headerTitle=" Growing Your NFTY"
      headerSubTitle="Peer into the crystal ball and calculate your NFTY rewards right here. If your future is with NFTs, NFTY is your future."
      FooterComponent={FooterComponent}
      footerModalClass="footer-bg"
      modalClass="custom-modal"
    >
      <div className="roi-calc-modal p-3">
        <div className="row">
          <div className="col-md-6 d-flex justify-content-space-evenly f-18 pt-1">
            <span className="f-b ">{switchData ? "USD" : "NFTY"}</span>
            <span>
              <img
                className="exchange-arrow-img"
                src={ExchangeArrowIcon}
                onClick={() => {
                  setSwitchData(!switchData);
                  setNftyValue(usdToNfty);
                }}
                alt=""
              />
            </span>
            <span className="f-b">{switchData ? "NFTY" : "USD"}</span>
          </div>
          <div className="col-md-6 text-center">
            <input
              type="number"
              className="form-control input-amount"
              value={
                switchData
                  ? (nftyValue && nftyValue) || ""
                  : (marketData && marketData) || ""
              }
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="mt-3 pl-3">
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
                  ? usdValue
                  : marketData && marketData}
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <div className="calculated-amount">
              <input
                className="form-control amount-input"
                type="number"
                placeholder="0.00"
                onChange={(e) => setNftyToken(e.target.value)}
                value={nftyToken || ""}
              />
            </div>
          </div>
        </div>
        <div className="row nfty-amount-select justify-content-space-evenly">
          <div
            className="btn-group w-100 mt-1 justify-content-center"
            role="group"
            aria-label="Basic example"
          >
            <button
              type="button"
              className="btn f-14"
              style={{ borderRadius: "300px", maxWidth: "100px" }}
              onClick={() => setNftyToken(100)}
            >
              <img className="nfty-logo" src={nftyLogo} alt="" />
              100
            </button>
            <button
              type="button"
              className="btn f-14"
              style={{ borderRadius: "300px", maxWidth: "100px" }}
              onClick={() => setNftyToken(500)}
            >
              <img className="nfty-logo" src={nftyLogo} alt="" />
              500
            </button>
            <button
              type="button"
              className="btn f-14"
              style={{ borderRadius: "300px", maxWidth: "100px" }}
              onClick={() => setNftyToken(1000)}
            >
              <img className="nfty-logo" src={nftyLogo} alt="" />
              1000
            </button>
            <button
              type="button"
              className="btn f-14"
              style={{ borderRadius: "300px", maxWidth: "100px" }}
              onClick={() => setNftyToken(5000)}
            >
              <img className="nfty-logo" src={nftyLogo} alt="" />
              5000
            </button>
          </div>
        </div>
        <div className="text-center mt-1 apr-text">
          <span className="f-14">
            Reward{" "}
            <span className="green-text">
              {getStakingReward(nftyToken, stakedForDays)}%
            </span>
          </span>
        </div>
        <hr className="mt-3 mb-2" />
        <div className="staked-for">
          <span className="f-b f-14">Staked For</span>
          <div
            className="btn-group w-100 mt-1"
            role="group"
            aria-label="Basic example"
          >
            <button
              type="button"
              className={stakedForDays === 30 ? "btn btn-active" : "btn"}
              onClick={() => setStakedForDays(30)}
            >
              30D
            </button>
            <button
              type="button"
              className={stakedForDays === 90 ? "btn btn-active" : "btn"}
              onClick={() => setStakedForDays(90)}
            >
              3M
            </button>
            <button
              type="button"
              className={stakedForDays === 210 ? "btn btn-active" : "btn"}
              onClick={() => setStakedForDays(210)}
            >
              7M
            </button>
            <button
              type="button"
              className={stakedForDays === 365 ? "btn btn-active" : "btn"}
              onClick={() => setStakedForDays(365)}
            >
              1Y
            </button>
            <button
              type="button"
              className={stakedForDays === 1825 ? "btn btn-active" : "btn"}
              onClick={() => setStakedForDays(1825)}
            >
              5Y
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ROICalculatorModal;
