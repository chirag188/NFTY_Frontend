import React from "react";
import Modal from "../../components/Modal/Modal";
import profilePic from "../../assets/images/dummyPic.png";
import cameraIcon from "../../assets/images/cameraIcon.png";

const ProfileModal = (props) => {
  const closeModal = () => {
    const { modalOpenClose } = props;
    modalOpenClose(false);
  };

  return (
    <Modal closeModal={closeModal} headerTitle="Profile">
      <div className="profile-modal">
        <div className="profile-pic">
          <img src={profilePic} alt="" />
          <img className="camera-icon cursor-pointer" src={cameraIcon} alt="" />
        </div>
        <div
          className="profile-name mt-3
        "
        >
          Martha C. Terry
        </div>
        <div className="profile-since mt-4">
          {" "}
          <span className="rep-body-text">Member Since</span>{" "}
          <span className="f-b">12/09/2021</span>
        </div>
        <div className="f-b f-18 mt-4">Bio</div>
        <div className="rep-body-text p-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
          lacus nisi, viverra ac ultrices non, mattis viverra dolor. Lorem ipsum
          dolor sit amet, consectetur adipiscing elit. Praesent lacus nisi,
          viverra ac ultrices non, mattis viverra dolor.
        </div>
      </div>
    </Modal>
  );
};

export default ProfileModal;
