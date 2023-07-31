import React, { } from 'react';
import "../../assets/styles/Modal.css";
import Form from 'react-bootstrap/Form';
import Spinner from '../Spinner/Spinner';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';

function ProfileEditModal({ show, setShow, editedInfo, setEditedInfo, saveStatus, updateUserDetails }) {

  const state = useSelector(state => { return state });

  const { spinner, error } = state;
  const { userName, bio, about } = editedInfo;
  const { primaryColor, secondaryBackground } = state.themeStyle;
  const style2 = { background: secondaryBackground, color: primaryColor };

  const handleClose = () => setShow(false);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header style={style2}>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body style={style2}>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlInput1"
              onChange={e => setEditedInfo({ userName: e.target.value, bio: bio, about: about })}
            >
              <Form.Label>username</Form.Label>
              <Form.Control
                type="username"
                className="modalForm"
                defaultValue={userName}
                placeholder="name@example.com"
                style={style2}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>bio</Form.Label>
              <Form.Control
                maxLength="100"
                defaultValue={bio}
                as="textarea" rows={3}
                className="modalForm"
                style={style2}
                onChange={e => setEditedInfo({ userName: userName, bio: e.target.value, about: about })}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>about</Form.Label>
              <Form.Control
                maxLength="2000"
                defaultValue={about}
                className="modalForm"
                as="textarea" rows={3}
                style={style2}
                onChange={e => setEditedInfo({ userName: userName, bio: bio, about: e.target.value })}
              />
            </Form.Group>
          </Form>
          <small className='text-danger font-weight-lighter'>{error}</small>
        </Modal.Body>
        <Modal.Footer style={{ background: secondaryBackground, color: primaryColor, borderTop: "none" }}>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {
            saveStatus ?
              <Button variant="" className='bgClr text-white d-flex justify-content-center px-3 w-25' onClick={updateUserDetails}>
                {
                  spinner === false ? "Save" : <Spinner size={"25px"} />
                }
              </Button>
              :
              <Button variant="" className='bgClr text-white px-3 w-25' onClick={handleClose} disabled>
                Save
              </Button>
          }
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ProfileEditModal