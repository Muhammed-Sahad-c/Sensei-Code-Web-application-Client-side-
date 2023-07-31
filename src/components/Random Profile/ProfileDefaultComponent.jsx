import { useEffect } from 'react';
import CountUp from 'react-countup';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Spinner from '../Spinner/Spinner.jsx';
import AlertModal2 from '../Modals/AlertModal2.jsx';
import { formatTime } from '../../constants/TimeAgo';
import DashBoardNavBar from '../User/DashBoardNavBar';
import Avathars from '../../assets/images/avathar.png';
import ProfileViewModal from '../Modals/ProfileViewModal';
import { Link, useParams } from 'react-router-dom';
import { followaUser, getRandomUserDetails, unfollowaUser } from '../../services/ProfileServices.js';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage } from 'mdb-react-ui-kit';


function ProfileDefaultComponent() {

  const state = useSelector(state => { return state });
  const { primaryBackground, primaryColor, secondaryBackground } = state.themeStyle;

  const [profilePreview, setProfilePreview] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [apiStatus, setApiStatus] = useState(false);
  const [unfollowModal, setUnfollowModal] = useState(false);

  const { userMail } = useParams();

  useEffect(() => {
    setApiStatus(true);
    getRandomUserDetails(userMail, state.user.email).then(response => {
      setApiStatus(false);
      if (response.data.stats !== false) setUserDetails(response.data.userDetails);
    }).catch(err => console.log(err))
  }, []);

  const { userName, email, bio, about, profile, follow, followerCount, points, askedQuestions, answersCount, questionsCount } = userDetails;

  const showProfile = () => setProfilePreview(true);

  const followuser = async () => {
    const response = await followaUser(state.user.email, userMail);
    if (response.data.status === true) {
      setUserDetails(prevState => ({
        ...prevState,
        follow: true,
        followerCount: prevState.followerCount + 1
      }))
    } else {
      //some error occurred
    }
  }

  const unfollowUser = async () => {
    const response = await unfollowaUser(state.user.email, userMail)
    if (response.data.status) {
      setUserDetails(prevState => ({
        ...prevState,
        follow: false,
        followerCount: prevState.followerCount - 1
      }))
      setUnfollowModal(false)
    } else {
      //something error occurred
    }
  }

  return (
    <div>
      <div style={{ "height": "100vh", backgroundColor: primaryBackground }}>
        <DashBoardNavBar />
        <section style={{ backgroundColor: primaryBackground }}>
          <MDBContainer className="py-5">
            <MDBRow>
              <MDBCol lg="4">
                <MDBCard className="mb-4 " style={{ "background": secondaryBackground }}>
                  <MDBCardBody className="text-center mx-auto">
                    {
                      apiStatus === true ?
                        <div className='profileLoadinRound align-items-center '><Spinner /></div>
                        :
                        <div>
                          <MDBCardImage
                            src={profile ? profile : Avathars}
                            alt="avatar"
                            className="rounded-circle"
                            style={{
                              width: "150px",
                              height: "150px",
                              objectFit: "cover"
                            }}
                            fluid />
                        </div>
                    }
                    <div className='mt-3 text-lowercase profileSettings'>
                      <small className='mx-2 text-success' onClick={showProfile}>View</small>
                    </div>
                    <p className="mb-1 py-3" style={{ "color": primaryColor }}>{followerCount} follower{followerCount <= 1 ? "" : "s"}</p>
                    <div className="d-flex justify-content-center mb-2">
                      {
                        follow ?
                          <button className="profileButtons mx-1 px-3 py-1 rounded w-100 text-white" onClick={() => setUnfollowModal(true)}>unfollow</button>
                          :
                          <button className="profileButtons mx-1 px-3 py-1 rounded w-100 text-white" onClick={followuser}>follow</button>
                      }
                    </div>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
              <MDBCol lg="8">
                <MDBCard className="mb-4" style={{ "background": secondaryBackground }}>
                  <MDBCardBody>
                    <MDBRow>
                      <MDBCol sm="3" >
                        <MDBCardText style={{ "color": primaryColor }}>Full Name</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="" style={{ "color": primaryColor }}>{userName}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr style={{ "color": primaryColor }} />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText style={{ "color": primaryColor }}>Email</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="" style={{ "color": primaryColor }}>{email}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr style={{ "color": primaryColor }} />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText style={{ "color": primaryColor }}>Bio</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="" style={{ "color": primaryColor }} >{bio}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr style={{ "color": primaryColor }} />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText style={{ "color": primaryColor }}>About</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="" style={{ "color": primaryColor }}>{about}</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <div className="div d-flex justify-content-center py-4 gap-3">
                          <div className="counterupbox rounded  d-flex flex-column justify-content-center align-items-center" style={{ background: secondaryBackground, color: primaryColor }}>
                            <h1>
                              <CountUp end={questionsCount} />
                            </h1>
                            <h4>questions</h4>
                          </div>
                          <div className="counterupbox rounded  d-flex flex-column justify-content-center align-items-center" style={{ background: secondaryBackground, color: primaryColor }}>
                            <h1>
                              <CountUp end={points > 10000 ? 10000 : points} /> +
                            </h1>
                            <h4>Points</h4>
                          </div>
                          <div className="counterupbox rounded  d-flex flex-column justify-content-center align-items-center" style={{ background: secondaryBackground, color: primaryColor }}>
                            <h1>
                              <CountUp end={answersCount} />
                            </h1>
                            <h4>Answers</h4>
                          </div>
                        </div>
                      </MDBCol>
                    </MDBRow>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
              <MDBCol lg="12">
                <h4 style={{ color: primaryColor }}>asked questions</h4>

                <div className='py-2'>
                  {
                    askedQuestions ?

                      askedQuestions.map(question => {
                        return (
                          <span>
                            <div className="row">
                              <div className='col-9'>
                                <small><Link to={`/view%20question/${question._id}`}>{question.questionHeading}</Link></small>
                              </div>
                              <div className="col-3">
                                <small className="px-2" style={{ color: primaryColor }}> {formatTime(question.createdAt)}</small>
                              </div>
                            </div>
                            <br />
                          </span>
                        )
                      })
                      : ''
                  }
                </div>
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
      <AlertModal2
        unfollowFn={unfollowUser}
        showModal={unfollowModal}
        setShowModal={setUnfollowModal}
        details={{ userName, profile }}
      />
    </div>
  )
}

export default ProfileDefaultComponent