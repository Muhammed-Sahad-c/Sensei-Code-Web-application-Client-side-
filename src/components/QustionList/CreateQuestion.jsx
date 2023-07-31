import Editor from '../Editor/Editor';
import React, { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { showError } from '../../reducers/ErrorReducer';
import { setLoader } from '../../reducers/LoaderReducer';
import { postQustion } from '../../services/QAsessionServices';
import DashBoardNavBar from '../User/DashBoardNavBar';

function CreateQuestion() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [quillPage, setQuillPage] = useState(null);
    const [question, setQuestion] = useState(null);
    const [questionTags, setQuestionTags] = useState([])

    const state = useSelector(state => { return state });
    const { error, spinner } = state;

    const errorHandler = (status, message = null) => {
        dispatch(setLoader(status));
        dispatch(showError(message));
    }

    const submitQustion = async () => {
        errorHandler(true);
        if (question !== null) {
            const response = await postQustion(quillPage, question, state.user.email, questionTags);
            const { message, status } = response.data;
            if (status) {
                errorHandler(false);
                navigate('/qasession');
            } else errorHandler(false, message);
        } else errorHandler(false, "please enter question");
    }


    return (
        <>
            <DashBoardNavBar />
            <Editor
                message={error}
                isQuestion={true}
                spinner={spinner}
                tags={questionTags}
                question={question}
                quillPage={quillPage}
                setQuestion={setQuestion}
                setQuillPage={setQuillPage}
                submitFunction={submitQustion}
                setTags={setQuestionTags}
            />
        </>
    )
}

export default CreateQuestion