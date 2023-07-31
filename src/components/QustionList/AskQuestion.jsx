import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Plus } from 'react-bootstrap-icons';
import AlertModal1 from '../Modals/AlertModal1';
import { useNavigate } from 'react-router-dom';


function AskQustion() {
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);

    const state = useSelector(state => { return state });
    const { user } = state;

    const askQustion = () => {
        if (user === "") setShowModal(true);
        else navigate('/createqustion');
    }



    return (
        <div>
            <button className=" w-100 py-2 my-4 askQustionButton bgClr text-white" onClick={askQustion}>
                <Plus size={"35px"} />
                ask question
            </button>
            <AlertModal1 setShowModal={setShowModal} showModal={showModal} message={"Sign in to Ask questions and answer questions!"} />
        </div>
    )
}

export default AskQustion