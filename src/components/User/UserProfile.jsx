import "../../assets/styles/Profile.css";
import DashBoardNavBar from './DashBoardNavBar';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Avathars from '../../assets/images/avathar.png';
import { showError } from '../../reducers/ErrorReducer';
import { setLoader } from '../../reducers/LoaderReducer';
import ProfileViewModal from '../Modals/ProfileViewModal';
import ProfileEditModal from '../Modals/ProfileEditModal';
import { setUserDetails } from "../../reducers/UserReducer";
import ProfilePhotoEditModal from "../Modals/ProfilePhotoEditModal";
import { updateEditedUserDetails, updateUserProfile } from '../../services/ProfileServices.js';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage } from 'mdb-react-ui-kit';

function UserProfile() {

  const dispatch = useDispatch();

  const state = useSelector(state => { return state });
  const { userName, profile, email, bio, about } = state.user;
  const { primaryBackground, primaryColor, secondaryBackground } = state.themeStyle;

  const [saveStatus, setSaveStatus] = useState(true);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [profilePreview, setProfilePreview] = useState(false);
  const [editProfileModal, setEditProfileModal] = useState(false);
  const [editedInfo, setEditedInfo] = useState({ userName, bio, about });
  const [editProfilePhotoModal, setEditProfilePhotoModal] = useState(false);

  const style2 = { color: primaryColor };
  const style3 = { "background": secondaryBackground };
 
  const showProfile = () => setProfilePreview(true);
  const showEditModal = () => setEditProfileModal(true);

  const errorHandler = (status, message = null) => {
    dispatch(setLoader(status));
    dispatch(showError(message));
  }

  const updateUserDetails = async () => {
    dispatch(setLoader(true));
    const data = { editedInfo, email };
    const response = await updateEditedUserDetails(data);
    if (response.data.status) {
      dispatch(setUserDetails(response.data.updatedUserDetails))
      errorHandler(false);
      setEditProfileModal(false);
    }
    else errorHandler(false, response.data.message);
  }

  const updateProfileImage = async e => {
    errorHandler(true)
    const data = new FormData();
    data.append('file', profilePhoto);
    const response = await updateUserProfile(data);
    if (response.data.status) {
      dispatch(
        setUserDetails({
          bio,
          email,
          about,
          userName,
          profile: response.data.profile_url
        })
      )
      errorHandler(false);
      setEditProfilePhotoModal(false);
    } else {
      setEditProfilePhotoModal(false);
      errorHandler(false, response.data.message);
    }
    e.preventDefault();
  }

  useEffect(() => {
    if (JSON.stringify({ userName, bio, about }) === JSON.stringify(editedInfo)) setSaveStatus(false);
    else {
      if (editedInfo.userName === "") setSaveStatus(false);
      else setSaveStatus(true)
    }
  }, [editedInfo]);

  return (
    <div>
      <div style={{ "height": "100vh", backgroundColor: primaryBackground }}>
        <DashBoardNavBar currentTab={"PROFILE_TAB"} />
        <section style={{ backgroundColor: primaryBackground }}>
          <MDBContainer className="py-5">
            <MDBRow>
              <MDBCol lg="4">
                <MDBCard className="mb-4 " style={{ "background": secondaryBackground }}>
                  <MDBCardBody className="text-center">
                    <MDBCardImage
                      src={profile ? profile : Avathars}
                      alt="avatar"
                      className="rounded-circle"
                      style={{
                        "width": "150px",
                        "height": "150px",
                        objectFit: "cover"
                      }}
                      fluid />
                    <div className='mt-3 text-lowercase profileSettings'>
                      <small className='mx-2 text-success' onClick={showProfile}>View</small>
                      <small className='mx-2 text-success' onClick={() => setEditProfilePhotoModal(true)}>Update
                      </small>
                    </div>
                    <p className="mb-1 pt-3" style={style2}>{userName}</p>
                    <p className="mb-4" style={style2}>{bio}</p>
                    <div className="d-flex justify-content-center mb-2">
                      <button className="profileButtons mx-1 px-3 py-1 rounded text-white" onClick={showEditModal}>edit</button>
                    </div>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
              <MDBCol lg="8">
                <MDBCard className="mb-4" style={style3}>
                  <MDBCardBody>
                    <MDBRow>
                      <MDBCol sm="3" >
                        <MDBCardText style={style2}>Full Name</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="" style={style2}>{userName}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr style={style2} />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText style={style2}>Email</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="" style={style2}>{email}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr style={style2} />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText style={style2}>Bio</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="" style={style2} >{bio}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr style={style2} />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText style={style2}>About</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="" style={style2}>{about}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                  </MDBCardBody>
                </MDBCard>

              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>
      </div>

      <ProfileViewModal
        show={profilePreview}
        profile={profile ? profile : Avathars}
        onHide={() => setProfilePreview(false)}
      />

      <ProfileEditModal
        show={editProfileModal}
        editedInfo={editedInfo}
        saveStatus={saveStatus}
        setShow={setEditProfileModal}
        setEditedInfo={setEditedInfo}
        updateUserDetails={updateUserDetails}
      />

      <ProfilePhotoEditModal
        show={editProfilePhotoModal}
        setShow={setEditProfilePhotoModal}
        profilePhoto={profilePhoto}
        setProfilePhoto={setProfilePhoto}
        oldProfilePhoto={profile}
        updatePhoto={updateProfileImage}
      />


    </div >
  )
}

export default UserProfile