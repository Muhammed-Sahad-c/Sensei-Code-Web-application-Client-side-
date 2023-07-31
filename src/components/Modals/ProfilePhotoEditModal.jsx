import Spinner from '../Spinner/Spinner';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Avathar from '../../assets/images/avathar.png';
import { useDispatch, useSelector } from 'react-redux';
import { showError } from '../../reducers/ErrorReducer';
import { setLoader } from '../../reducers/LoaderReducer';
import React, { useEffect, useRef, useState } from 'react';


function ProfilePhotoEditModal({ show, setShow, profilePhoto, setProfilePhoto, oldProfilePhoto, updatePhoto }) {
    const inputFile = useRef(null);
    const dispatch = useDispatch();
    const state = useSelector(state => { return state });
    const [encodedProfilePhoto, setEncodedProfilePhoto] = useState('');
    const [submitButtonStatus, setSubmitButtonStatus] = useState(false);

    const { spinner, error } = state;
    const { primaryColor, secondaryBackground } = state.themeStyle;
    const style2 = { background: secondaryBackground, color: primaryColor };

    const errorHandler = (status, message = null) => {
        dispatch(setLoader(status));
        dispatch(showError(message));
    }

    useEffect(() => {
        if (profilePhoto === null) setSubmitButtonStatus(false);
        else if (profilePhoto.type.startsWith('image') === false) {
            setSubmitButtonStatus(false);
            setProfilePhoto(null)
            dispatch(showError("invalid file please select jpg /jpeg/png ...etc"))
        }
        else {
            dispatch(showError(""))
            const file = URL.createObjectURL(profilePhoto);
            setEncodedProfilePhoto(file);
            setSubmitButtonStatus(true);
        }
    }, [profilePhoto]);


    const hideModal = () => {
        setShow(false);
        errorHandler(false);
        setProfilePhoto(null);
        setEncodedProfilePhoto(null);
        setSubmitButtonStatus(false);
    }

    return (
        <>
            <Modal
                centered
                size="sm"
                show={show}
                onHide={hideModal}
                aria-labelledby="example-modal-sizes-title-sm"
            >
                <Modal.Header style={style2}>
                    <Modal.Title id="example-modal-sizes-title-sm">
                        Update Profile
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='d-flex justify-content-center' style={style2}>
                    <div className="d-flex flex-column">
                        <div className=" d-flex justify-content-center">
                            {
                                profilePhoto === null ?
                                    <img
                                        src={oldProfilePhoto ? oldProfilePhoto : Avathar}
                                        alt=""
                                        width="100px"
                                        height="100px"
                                        style={{ borderRadius: "100%", objectFit: "cover", }}
                                    />
                                    :
                                    <img
                                        src={encodedProfilePhoto}
                                        alt="not found"
                                        width="100px"
                                        height={"100px"}
                                        style={{ borderRadius: "100%", objectFit: "cover", }}
                                    />
                            }
                        </div>
                        <p className='mt-4 text-center modalFormChoosebutton' onClick={() => inputFile.current.click()}>choose file</p>
                        <small className="text-danger text-center pb-3">{error}</small>
                        <div className='d-flex justify-content-center'>
                            {
                                spinner ?
                                    <Button variant="" className='text-white px-3 my-2 bg-dark mx-2' onClick={hideModal} disabled>cancel</Button>
                                    :
                                    <Button variant="" className=' text-white px-3 my-2 bg-dark mx-2' onClick={hideModal}>cancel</Button>
                            }
                            {
                                submitButtonStatus ?
                                    <Button variant="" className={`bgClr text-white px-3 my-2 mx-2 ${spinner ? "disabled" : ""}`} onClick={updatePhoto} >
                                        {
                                            spinner ? <Spinner size='25px' /> : "update"
                                        }
                                    </Button>
                                    :
                                    <Button variant="" className='text-white px-3 my-2  mx-2 bg-dark' disabled>update</Button>
                            }
                        </div>
                        <input
                            id="file"
                            type="file"
                            ref={inputFile}
                            style={{ display: "none" }}
                            accept="image/png,image/jpeg"
                            onChangeCapture={e => setProfilePhoto(e.target.files[0])}
                        />
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ProfilePhotoEditModal