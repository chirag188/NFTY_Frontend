import React from "react";

const Modal = (props) => {
  const {
    headerTitle,
    children,
    // submitBtnText,
    // submitBtnHandler,
    // cancelBtnText,
    // cancelBtnHandler,
    closeModal,
    modalId,
    modalClass,
    errorMsg,
    successMsg,
    isDisable,
    FooterComponent,
    footerModalClass,
    headerSubTitle,
    isTooltip,
  } = props;

  return (
    <>
      <div
        className="modal fade show"
        id={modalId || ""}
        tabIndex="-1"
        role="dialog"
        aria-labelledby=""
        aria-hidden="true"
        style={{ display: "block", paddingRight: 5, zIndex: 1041 }}
      >
        <div
          className={`modal-dialog ${modalClass || ""} modal-dialog-centered`}
          role="document"
        >
          <div className="modal-content animated fadeInDownBig p-2">
            <div className="modal-content-1">
              <div className="p-1">
                <button
                  type="button"
                  className="close"
                  disabled={isDisable}
                  onClick={closeModal}
                >
                  <span aria-hidden="true" style={{ color: "#000000" }}>
                    &times;
                  </span>
                </button>
              </div>
              <div className="modal-header pb-2">
                <div className="w-100">
                  {(headerTitle !== undefined ||
                    headerTitle != null ||
                    headerTitle !== "") && (
                    <h4 className="modal-title text-center w-100 f-b">
                      {headerTitle}
                    </h4>
                  )}
                  <div
                    className={`modal-sub-title mt-1 ${
                      isTooltip ? "text-justify" : "text-center"
                    } w-100`}
                  >
                    {(headerSubTitle !== undefined ||
                      headerSubTitle != null ||
                      headerSubTitle !== "") && <span>{headerSubTitle}</span>}
                  </div>
                </div>
              </div>
              {children}

              <div
                className={`modal-footer d-flex flex-column ${
                  footerModalClass || ""
                }`}
              >
                {FooterComponent && <FooterComponent />}
              </div>
              <div className="error-message text-center">{errorMsg}</div>
              <div className="success-message text-center">{successMsg}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show" />
    </>
  );
};

export default Modal;
