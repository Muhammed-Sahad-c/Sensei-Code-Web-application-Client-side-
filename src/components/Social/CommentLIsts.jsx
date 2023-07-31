import React from 'react'
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { formatTime } from '../../constants/TimeAgo';
import avathar from '../../assets/images/avathar.png';
import { MDBCard, MDBCardBody, MDBCardImage, MDBCol, MDBContainer, MDBRow, MDBTypography, } from "mdb-react-ui-kit";

function CommentLIsts({ comments }) {

    const state = useSelector(state => { return state });
    const { primaryColor, secondaryBackground } = state.themeStyle;
    const { user } = state;
    return (

        <>
            <section >
                <MDBContainer className="py-2 text-dark" style={{ maxWidth: "1000px" }}>
                    <MDBRow className="">
                        <MDBCol xl="12">
                            {
                                comments.map(comment => {
                                    return (
                                        <MDBCard className="mb-3" key={uuidv4()} style={{ background: secondaryBackground, color: primaryColor }}>
                                            <MDBCardBody>
                                                <div className="d-flex flex-start">
                                                    <MDBCardImage
                                                        className="rounded-circle shadow-1-strong me-3"
                                                        src={comment.author.profile ? comment.author.profile : avathar}
                                                        alt="avatar"
                                                        width="30"
                                                        height="30"
                                                    />
                                                    <div className="w-100">
                                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                                            <MDBTypography
                                                                tag="h6"
                                                                className="text-primary fw-bold mb-0"
                                                            >
                                                                {
                                                                    comment.author.email === user.email ?
                                                                        <div className="d-flex gap-4 align-items-center">
                                                                            <small className="fw-normal">you</small>
                                                                        </div>
                                                                        :
                                                                        <div className="d-flex gap-5 align-items-center w-100">
                                                                            <Link to={`/usersprofile/${comment.author.email}`}>
                                                                                <small className='text-decoration-none fw-light'>{comment.author.userName}</small>
                                                                            </Link>
                                                                        </div>
                                                                }
                                                                <div className="py-2" style={{ maxWidth: '1000px', fontWeight: 200 }}>
                                                                    <small style={{ color: primaryColor }}>
                                                                        <i>{comment.comment}</i>
                                                                    </small>
                                                                </div>
                                                                <p className="mb-0 fw-lighter" style={{ color: primaryColor, opacity: .5 }}>{formatTime(comment.time.join(" "))}</p>

                                                            </MDBTypography>
                                                        </div>
                                                    </div>
                                                </div>
                                            </MDBCardBody>
                                        </MDBCard>
                                    )
                                })
                            }
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </section>
        </>
    )
}

export default CommentLIsts