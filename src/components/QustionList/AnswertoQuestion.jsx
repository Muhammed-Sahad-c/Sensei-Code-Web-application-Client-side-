import React from 'react';
import { useState } from 'react';
import Editor from '../Editor/Editor';
import { useDispatch, useSelector } from 'react-redux';
import { showError } from '../../reducers/ErrorReducer';
import { setLoader } from '../../reducers/LoaderReducer';
import { useNavigate, useParams } from 'react-router-dom';
import { submitUserAnswers } from '../../services/QAsessionServices';

function AnswertoQuestion() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const state = useSelector(state => { return state });
    const { error, spinner } = state;

    const { questionId } = useParams();

    const [quillPage, setQuillPage] = useState('');

    const errorHandler = (status, message = null) => {
        dispatch(setLoader(status));
        dispatch(showError(message));
    }

    const submitAnswer = async (e) => {
        e.preventDefault();
        const data = {
            questionId,
            answer: quillPage
        }
        const response = await submitUserAnswers(data);
        if (response.data.status === true) {
            errorHandler(false, "");
            navigate(`/view question/${questionId}`);
        } else errorHandler(false, `something wen't wrong please try again later`)
    }

    return (
        <>
            <Editor
                tags={[]}
                message={error}
                spinner={spinner}
                isQuestion={false}
                quillPage={quillPage}
                setQuillPage={setQuillPage}
                submitFunction={submitAnswer}
            />
        </>
    )
}

export default AnswertoQuestion