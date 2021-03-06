import React, { useEffect, useState } from "react";
import moment from "moment";
import Modal from "../../components/Modal/Modal";
import profileImg from "../../assets/images/profile.png";
import cameraIcon from "../../assets/images/cameraIcon.png";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  viewProfile,
  updateProfilePic,
  updateProfile,
} from "../../store/actions/profile/profile";
import { toast } from "react-toastify";

const options = {
  position: "top-center",
  autoClose: 1200,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
  toastId: "1",
};
const ProfileModal = (props) => {
  const [img, setImg] = useState();
  const [isDisabled, setIsDisabled] = useState(true);
  const [isDisabledBio, setIsDisabledBio] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(viewProfile());
  }, [dispatch]);
  const profile = useSelector((state) => state.profile.userData);
  const [name, setName] = useState(
    profile && (profile.name ? profile.name : profile.walletId)
  );
  const [bio, setBio] = useState(profile && profile.bio);
  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleBioChange = (e) => {
    setBio(e.target.value);
  };

  const closeModal = () => {
    const { modalOpenClose } = props;
    modalOpenClose(false);
  };

  return (
    <Modal closeModal={closeModal} headerTitle="Profile" footerModalClass="p-0">
      <div className="profile-modal">
        <div className="profile-pic">
          <div>
            <img
              className="pic"
              src={
                img || (profile.profilePic ? profile.profilePic : profileImg)
              }
              alt=""
            />
          </div>
          <div className="camera">
            <input
              type="file"
              accept="image/png,image/jpg,image/jpeg"
              multiple={false}
              id="file-upload-button"
              onChange={(e) => {
                if (
                  e.target.files[0].type === "image/png" ||
                  e.target.files[0].type === "image/jpg" ||
                  e.target.files[0].type === "image/jpeg"
                ) {
                  setImg(URL.createObjectURL(e.target.files[0]));
                  dispatch(
                    updateProfilePic({
                      profilePic: e.target.files[0] ? e.target.files[0] : null,
                    })
                  );
                } else {
                  toast.error("Please Select an Image", options);
                }
              }}
            />
            <img
              className="camera-icon cursor-pointer"
              src={cameraIcon}
              alt=""
            />
          </div>
        </div>
        <div className="f-b f-18 mt-2 ml-3">
          Username{" "}
          <i
            onClick={() => setIsDisabled(false)}
            className="fa fa-edit cursor-pointer ml-1"
          ></i>
        </div>
        <div className="profile-name">
          <input
            type="text"
            name="name"
            className={
              name.length > 30 ? "form-control f-16" : "form-control f-22"
            }
            value={name || ""}
            onChange={handleChange}
            autocomplete="off"
            readOnly={isDisabled}
            onBlur={() => {
              if (name !== profile.name) {
                if (name === "" || name === null || name === undefined) {
                  setName(profile.name);
                } else {
                  dispatch(updateProfile({ name }));
                }
              }
            }}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                if (name !== profile.name) {
                  dispatch(updateProfile({ name }));
                }
              }
              setIsDisabled(false);
            }}
          />
        </div>
        <div className="profile-since ">
          <span className="rep-body-text f-12">Member Since</span>{" "}
          <span className="f-b f-14">
            {moment(profile && profile.createdAt).format("LL")}
          </span>
        </div>
        <div className="f-b f-18 mt-3">
          Bio{" "}
          <i
            onClick={() => setIsDisabledBio(false)}
            className="fa fa-edit ml-2 cursor-pointer"
          ></i>
        </div>

        <div className="rep-body-text pb-2 pt-1 profile-bio">
          <textarea
            value={bio || ""}
            onChange={handleBioChange}
            disabled={isDisabledBio}
            placeholder="No data available"
            onBlur={() => {
              if (bio !== profile.bio) {
                dispatch(updateProfile({ bio }));
              }
            }}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ProfileModal;
