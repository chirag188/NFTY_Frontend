import React, { useEffect, useState } from "react";
import Modal from "../../components/Modal/Modal";
import ExchangeArrowIcon from "../../assets/images/exchangeArrow.png";
import nftyLogo from "../../assets/images/coinLogo.png";
import axios from "axios";

const ROICalculatorModal = (props) => {
  const [marketData, setMarketData] = useState();

  const makeAPICall = () => {
    const ress = axios
      .get(`https://api.coingecko.com/api/v3/coins/nifty-token`)
      .then((res) => {
        const responce = res.data?.tickers[0]?.converted_last?.usd;
        setMarketData(responce);
      });
  };
  useEffect(() => {
    makeAPICall();
  }, []);

  const [nftyToken, setNftyToken] = useState();
  const usdValue =
    (marketData && marketData) * (nftyToken === undefined ? 1 : nftyToken);
  const closeModal = () => {
    const { modalOpenClose } = props;
    modalOpenClose(false);
  };

  const FooterComponent = () => (
    <div className="roi-calc-modal-footer w-100">
      <div className="row w-100">
        <div className="col-md-6">
          <div className="f-b f-14 mt-1"> ROI at Current Rates</div>
        </div>
        <div className="col-md-6 d-flex justify-content-space-evenly">
          <div className="f-12 mt-1">~$32,342</div>
          <div>
            <div className="f-b f-18">
              <img className="nfty-logo mr-2" src={nftyLogo} alt="" />
              1,434
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
      headerTitle="ROI Calculator"
      headerSubTitle="Lorem ipsum dolor sit amet, consectetur adipisci ngmet, consectetur adipiscing."
      FooterComponent={FooterComponent}
      footerModalClass="footer-bg"
      modalClass="custom-modal"
    >
      <div className="roi-calc-modal p-3">
        <div className="row">
          <div className="col-md-6 d-flex justify-content-space-evenly f-18 pt-1">
            <span className="f-b f-16">NFTY</span>
            <span>
              <img
                className="exchange-arrow-img"
                src={ExchangeArrowIcon}
                alt=""
              />
            </span>
            <span className="f-b">USD</span>
          </div>
          <div className="col-md-6 text-center">
            <input
              type="text"
              className="form-control input-amount"
              value={(marketData && marketData) || ""}
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
                  ? usdValue.toFixed(4)
                  : marketData && marketData?.toFixed(4)}
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
            APR <span className="green-text">13.754%</span>
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
            <button type="button" className="btn">
              30D
            </button>
            <button type="button" className="btn">
              3M
            </button>
            <button type="button" className="btn">
              7M
            </button>
            <button type="button" className="btn">
              1Y
            </button>
            <button type="button" className="btn">
              7Y
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ROICalculatorModal;
