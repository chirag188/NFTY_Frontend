import React from "react";
import Modal from "../../components/Modal/Modal";
import Slider, { createSliderWithTooltip, SliderTooltip } from "rc-slider";
import nftyLogo from "../../assets/images/coinLogo.png";
import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";
import "../../assets/slider-index.less";

const StakeUnstakeModal = (props) => {
  const { isStakeModal } = props;
  const closeModal = () => {
    const { modalOpenClose } = props;
    modalOpenClose(false);
  };
  const SliderWithTooltip = createSliderWithTooltip(Slider);
  const { Handle } = Slider;
  const handle = (props) => {
    const { value, dragging, index, ...restProps } = props;
    console.log(value);
    return (
      <SliderTooltip
        prefixCls="rc-slider-tooltip"
        overlay={`${value} %`}
        visible={dragging}
        placement="top"
        align={{
          offset: [0, -20],
        }}
        key={index}
      >
        <Handle value={value} {...restProps} />
      </SliderTooltip>
    );
  };
  const FooterComponent = () => (
    <div className="stake-unstake-modal w-100">
      {isStakeModal && (
        <div className="w-100 text-center">
          <span className="f-12">Annual ROI</span>
          <span className="f-b ml-1">$0.00</span>
        </div>
      )}
      <div className="d-flex justify-content-space-between mt-3">
        <button className="orange-btn w-100 mr-3">Confirm</button>
        <button className="yellow-btn w-100">
          {isStakeModal ? "Buy NFTY" : "Stake"}
        </button>
      </div>
    </div>
  );

  return (
    <Modal
      closeModal={closeModal}
      headerTitle={isStakeModal ? "Stake in Pool" : "Unstake"}
      FooterComponent={FooterComponent}
      footerModalClass="footer-bg"
      tooltip={isStakeModal ? "Stake Modal" : "Unstake Modal"}
      isTooltip
    >
      <div className="stake-unstake-modal p-3">
        <div className="mt-4 pl-3">
          <div className="d-flex justify-content-space-between">
            <div>
              <div className="f-b">
                <img className="nfty-logo" src={nftyLogo} alt="" />
                Enter NFTY
              </div>
            </div>
            <div className="d-flex">
              <div className="f-b mr-3">~$300</div>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <div className="calculated-amount">0.00</div>
          </div>
        </div>
        <div className="w-100 mt-3">
          <div className="text-center f-b">
            {isStakeModal ? "Staked Balance 12.09" : "Balance 12.09"}
          </div>
          <div className="mt-1 w-100">
            <div style={{ maxWidth: 400, margin: 50 }}>
              <SliderWithTooltip
                min={0}
                max={100}
                defaultValue={3}
                handle={handle}
                style={{ height: "20px" }}
              />
              <div
                className="row d-flex justify-content-space-between ml-1"
                style={{ color: "rgba(0, 0, 0, 0.4)" }}
              >
                <div className=" f-12">0%</div>
                <div className=" f-12">25%</div>
                <div className=" f-12">50%</div>
                <div className=" f-12">75%</div>
                <div className=" f-12">100%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default StakeUnstakeModal;
