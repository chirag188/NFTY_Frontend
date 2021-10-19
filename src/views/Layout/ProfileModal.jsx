import React, { useEffect, useState } from "react";
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

const ProfileModal = (props) => {
  const [img, setImg] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(viewProfile());
  }, [dispatch]);
  const profile = useSelector((state) => state.profile.userData);
  const [name, setName] = useState(
    profile && (profile.name ? profile.name : profile.walletId)
  );
  const [bio, setBio] = useState(
    profile && (profile.bio ? profile.bio : "No data available")
  );

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

  const createdAt =
    profile && profile.createdAt.substring(0, 10).split("-").reverse();

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
                setImg(URL.createObjectURL(e.target.files[0]));
                dispatch(
                  updateProfilePic({
                    profilePic: e.target.files[0] ? e.target.files[0] : null,
                  })
                );
              }}
            />
            <img
              className="camera-icon cursor-pointer"
              src={cameraIcon}
              alt=""
            />
          </div>
        </div>
        <div className="profile-name">
          <input
            type="text"
            name="name"
            className="form-control"
            value={name || (profile && profile.name) || ""}
            onChange={handleChange}
            autocomplete="off"
            onBlur={() => {
              if (name !== profile.name) {
                dispatch(updateProfile({ name }));
              }
            }}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                if (name !== profile.name) {
                  dispatch(updateProfile({ name }));
                }
              }
            }}
          />
        </div>
        <div className="profile-since mt-1">
          <span className="rep-body-text f-12">Member Since</span>{" "}
          <span className="f-b f-14">
            {createdAt[0]}/{createdAt[1]}/{createdAt[2]}
          </span>
        </div>
        <div className="f-b f-18 mt-2">Bio</div>
        <div className="rep-body-text pb-2 pt-1 profile-bio">
          <textarea
            value={bio || "" || (profile && profile.bio)}
            onChange={handleBioChange}
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
