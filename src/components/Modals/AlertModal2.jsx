import React, { } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { MDBCardImage } from 'mdb-react-ui-kit';
import Avathar from '../../assets/images/avathar.png'

function AlertModal2({ setShowModal, showModal, details, unfollowFn }) {
    const state = useSelector(state => { return state });

    const { primaryColor, secondaryBackground } = state.themeStyle;
    const style1 = { background: secondaryBackground };
    const style2 = { background: secondaryBackground, color: primaryColor }

    const handleClose = () => setShowModal(false);

    return (
        <div>
            <Modal show={showModal} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered size='sm'>
                <Modal.Header closeButton style={style1}>
                    {/* <Modal.Title>Modal heading</Modal.Title> */}
                </Modal.Header>
                <Modal.Body style={style2} className="d-flex flex-column gap-4 justify-content-center align-items-center text-center">
                    <MDBCardImage
                        src={details.profile ? details.profile : Avathar}
                        alt="avatar"
                        className="rounded-circle"
                        style={{
                            width: "70px",
                            height: "70px",
                            objectFit: "cover"
                        }}
                        fluid />
                    <p>Unfollow <strong>{details.userName}</strong> ?</p>
                </Modal.Body>
                <Modal.Footer style={{ background: secondaryBackground, borderTop: "none" }} className="d-flex justify-content-center ">
                    <Button onClick={unfollowFn} className="border-1 w-100 border-danger text-danger " style={style1}>
                        unfollow
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default AlertModal2