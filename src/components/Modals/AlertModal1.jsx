import React, { } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

function AlertModal1({ setShowModal, showModal, message }) {
    const navigate = useNavigate();
    const state = useSelector(state => { return state });

    const { primaryColor, secondaryBackground } = state.themeStyle;
    const style1 = { background: secondaryBackground };
    const style2 = { background: secondaryBackground, color: primaryColor }
    
    const handleClose = () => setShowModal(false);

    return (
        <div>
            <Modal show={showModal} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered >
                <Modal.Header closeButton style={style1}>
                    {/* <Modal.Title>Modal heading</Modal.Title> */}
                </Modal.Header>
                <Modal.Body style={style2}>{message}</Modal.Body>
                <Modal.Footer style={{ background: secondaryBackground, borderTop: "none" }}>
                    <Button onClick={() => navigate('/signin')} className="bgClr border-0 ">
                        Sign in
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default AlertModal1