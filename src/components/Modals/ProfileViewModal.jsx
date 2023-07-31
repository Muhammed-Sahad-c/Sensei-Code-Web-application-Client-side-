import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';

function ProfileViewModal(props) {

    const state = useSelector(state => { return state });
    const { primaryColor, secondaryBackground } = state.themeStyle;

    return (
        <div>
            <Modal centered size="sm" {...props} aria-labelledby="contained-modal-title-vcenter" >
                <img
                    src={props.profile}
                    alt="avathar"
                    height="311px"
                    style={{ background: secondaryBackground, color: primaryColor ,objectFit:"cover"}} />
            </Modal>
        </div>
    )
}

export default ProfileViewModal