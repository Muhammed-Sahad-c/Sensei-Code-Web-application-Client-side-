import { useState } from 'react';
import Comment from '../Social/Comment';
import React, { useEffect } from 'react';
import LgBox from '../Placeholders/LgBox';
import Alert from 'react-bootstrap/Alert';
import 'react-toastify/dist/ReactToastify.css';
import SmallBox from '../Placeholders/SmallBox';
import CommentLIsts from '../Social/CommentLIsts';
import { formatTime } from '../../constants/TimeAgo';
import DashBoardNavBar from '../User/DashBoardNavBar';
import { roundedCount } from '../../constants/Millify';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { showError } from '../../reducers/ErrorReducer';
import { setLoader } from '../../reducers/LoaderReducer';
import { checkInappropriate } from '../../constants/BadWords';
import { Link, useOutletContext, useParams } from 'react-router-dom';
import { Chat, CaretDown, CaretUp, CheckCircleFill, CheckCircle } from 'react-bootstrap-icons';
import { acceptAnswerFromAnswers, getAllAnswers, InsertNewComment, rejectCurrentAcceptedAnswer, retrieveQuestionDetails, updateUserOppose, updateUserSupport } from '../../services/QAsessionServices';

function DetailView() {
    const dispatch = useDispatch();
    const { questionId } = useParams();
    const [socket] = useOutletContext();
    const state = useSelector(state => { return state });
    const { primaryBackground, primaryColor } = state.themeStyle;

    const style2 = { color: primaryColor };
    const style1 = { color: primaryColor, background: primaryBackground };

    const [comment, setComment] = useState("");
    const [answers, setAnswers] = useState([]);
    const [process, setProcess] = useState(false);
    const [questionDetails, setQuestionDetails] = useState(null);
    const [emojiPickerStatus, setEmojiPickerStatus] = useState('d-none');
    const [commentUi, setCommentUi] = useState({ status: "d-none", class: "" });

    const showComments = () => {
        errorHandler(false);
        commentUi.status === "d-block" ? setCommentUi({ status: 'd-none', className: "" }) : setCommentUi({ status: 'd-block', className: "commentOptionActive" })
    }
    const errorHandler = (status, message = null) => {
        dispatch(setLoader(status));
        dispatch(showError(message));
    };
    const addNewComment = async e => {
        e.preventDefault();
        if (process === false) {
            setProcess(true);
            setEmojiPickerStatus('d-none');
            dispatch(setLoader(true));
            const isContainInAppropriate = checkInappropriate(comment);
            if (!isContainInAppropriate) {
                if (!comment) {
                    errorHandler(false);
                    return
                }
                const d = new Date();
                let createdAt = d.toString();
                createdAt = createdAt.split(' ').splice(0, 5);
                const data = {
                    time: createdAt,
                    comment: comment,
                    questionId: questionId,
                    userMail: state.user.email,
                    author: state.user.userName,
                    ownerEmail: questionDetails.email,
                }
                const response = await InsertNewComment(data);
                if (response.data.status) {
                    dispatch(setLoader(false));
                    setComment('');
                    setQuestionDetails(prevState => ({
                        ...prevState,
                        comments: [{ author: { userName: data.author, email: data.userMail }, comment: data.comment, time: data.time }, ...prevState.comments]
                    }));
                    socket.emit("sendnotifications", data);
                } else errorHandler(false, response.data.message);
            } else errorHandler(false, `Your input contains inappropriate content. Kindly refrain from using offensive language.`);
            setProcess(false);
        } else toast('please want untill the request complete');
    }
    const submitUserVote_support = async (doc_id, type, answerdUserEmail, support, oppose) => {
        if (process === false) {
            setProcess(true);
            if (type === "QUESTION") {
                if (questionDetails.support.includes(state.user.email)) toast("Your vote already submitted");
                else {
                    const data = {
                        type,
                        doc_id,
                        email: state.user.email,
                        reputation_owner_email: questionDetails.email,
                        isOpposed: questionDetails.oppose.includes(state.user.email)
                    }
                    const response = await updateUserSupport(data);
                    if (response.data.status) {
                        const updateOppose = questionDetails.oppose.filter(email => data.email !== email);
                        const updateSupport = [...questionDetails.support, data.email];
                        setQuestionDetails({
                            ...questionDetails,
                            oppose: updateOppose,
                            support: updateSupport,
                        });
                        toast("Your vote added successfully");
                    } else toast("something went wrong");
                }
            } else {
                const data = {
                    type,
                    doc_id,
                    email: state.user.email,
                    reputation_owner_email: answerdUserEmail,
                    isOpposed: oppose.includes(state.user.email),
                }
                if (support.includes(data.email)) toast("Your vote already submitted");
                else {
                    const response = await updateUserSupport(data);
                    if (response.data.status) {
                        setAnswers(prevState => {
                            return prevState.map(item => {
                                if (item._id === doc_id) {
                                    const updateOppose = item.oppose.filter(email => email !== data.email);
                                    const updateSupport = [...item.support, data.email];
                                    return {
                                        ...item,
                                        oppose: updateOppose,
                                        support: updateSupport,
                                    }
                                }
                                return item;
                            });
                        });
                        toast("Your vote added successfully");
                    } else toast("something went wrong");
                }
            }
            setProcess(false);
        } else toast('please want untill the request complete');
    }
    const submitUserVote_oppose = async (doc_id, type, answerdUserEmail, support, oppose) => {
        if (process === false) {
            setProcess(true);
            if (type === "QUESTION") {
                if (questionDetails.oppose.includes(state.user.email)) {
                    toast("Your vote already submitted");
                } else {
                    const data = {
                        type,
                        doc_id,
                        email: state.user.email,
                        reputation_owner_email: questionDetails.email,
                        isSupported: questionDetails.support.includes(state.user.email)
                    };
                    const response = await updateUserOppose(data);
                    if (response.data.status) {
                        const updateSupport = questionDetails.support.filter(email => data.email !== email);
                        const updateOppose = [...questionDetails.oppose, data.email];
                        setQuestionDetails({
                            ...questionDetails,
                            oppose: updateOppose,
                            support: updateSupport,
                        });
                        toast("Your vote added successfully");
                    } else toast("something went wrong");
                }
            } else {
                const data = {
                    type,
                    doc_id,
                    email: state.user.email,
                    reputation_owner_email: answerdUserEmail,
                    isSupported: support.includes(state.user.email),
                }
                if (oppose.includes(data.email)) toast("Your vote already submitted");
                else {
                    const response = await updateUserOppose(data);
                    if (response.data.status) {
                        setAnswers(prevState => {
                            return prevState.map(item => {
                                if (item._id === doc_id) {
                                    const updateSupport = item.support.filter(email => email !== data.email);
                                    const updateOppose = [...item.oppose, data.email];
                                    return {
                                        ...item,
                                        support: updateSupport,
                                        oppose: updateOppose
                                    };
                                }
                                return item;
                            });
                        });
                        toast("Your vote added successfully");
                    } else toast("something went wrong");
                }
            }
            setProcess(false);
        } else toast('please want untill the request complete');
    }
    const acceptAnswer = async (id) => {
        if (process === false) {
            setProcess(true);
            const data = {
                questionId,
                newAnswerId: id,
                oldAnswerId: questionDetails.acceptedAnswer,
            }
            if (id !== questionDetails.acceptedAnswer) {
                const response = await acceptAnswerFromAnswers(data);
                if (response.data.status) {
                    if (data.oldAnswerId !== "") {
                        setQuestionDetails((prevQuestionDetails) => ({
                            ...prevQuestionDetails,
                            acceptedAnswer: "",
                        }));
                        setAnswers((prevAnswers) =>
                            prevAnswers.map((answer) =>
                                answer._id === data.oldAnswerId ? { ...answer, accepted: false } : answer
                            )
                        );
                    }
                    setQuestionDetails((prevQuestionDetails) => ({
                        ...prevQuestionDetails,
                        acceptedAnswer: data.newAnswerId,
                    }));
                    setAnswers((prevAnswers) =>
                        prevAnswers.map((answer) =>
                            answer._id === data.newAnswerId ? { ...answer, accepted: true } : answer
                        )
                    );
                    toast(response.data.message);
                } else toast(response.data.message);
            } else {
                const response = await rejectCurrentAcceptedAnswer(data);
                if (response.data.status) {
                    setQuestionDetails((prevQuestionDetails) => ({
                        ...prevQuestionDetails,
                        acceptedAnswer: "",
                    }));
                    setAnswers((prevAnswers) =>
                        prevAnswers.map((answer) =>
                            answer._id === data.newAnswerId ? { ...answer, accepted: false } : answer
                        )
                    );
                    toast(`removed successfully`);
                } else toast(`something wen't wrong please try again later`);
            }
            setProcess(false);
        } else toast('please want untill the request complete');
    }

    useEffect(() => {
        retrieveQuestionDetails(questionId, state.user.email).then((response => {
            setQuestionDetails(response.data.details);
            getAllAnswers(questionId).then(response => response.data.status ? setAnswers(response.data.answers) : setAnswers([]))
        }))
    }, []);

    return (
        <>
            <DashBoardNavBar />
            <div className="container mt-2">
                <div className="row  px-3 py-2" style={{ color: primaryColor, background: primaryBackground }}>
                    <div className="col-12 rounded py-3 px-3" style={style2}>
                        {
                            questionDetails ?
                                <div>
                                    <h4 className="questionHeading text-uppercase">{questionDetails?.question}</h4>
                                    <small className="">
                                        <Link to={`/usersprofile/${questionDetails?.email}`}>
                                            {questionDetails.userName}
                                        </Link>
                                    </small>
                                    <small className="timeagoshower mx-2">{formatTime(questionDetails.createdAt)}</small>
                                </div>
                                :
                                <LgBox height="52px" width="auto" />
                        }
                    </div>
                    {
                        questionDetails ?

                            <div className="col-12 my-2 py-3 px-3" style={style2} dangerouslySetInnerHTML={{ __html: questionDetails?.questionPage }}>

                            </div>
                            :
                            <LgBox height="100vh" width="auto" />
                    }
                    <div className="col-12 col-md-9 py-5 ">
                        {
                            questionDetails ?
                                <div>
                                    {questionDetails.questionTags.map(tag => (
                                        <button className="btn disabled px-2 py-1 mx-2 rounded-0 ">
                                            {tag}
                                        </button>
                                    ))}
                                </div>
                                :
                                <SmallBox width="80.99px" height="31px" />
                        }
                    </div>
                    <div className="col-12 col-md-3 d-flex justify-content-end align-items-center py-5">
                        <Link to={`/answertoquestion/${questionId}`}>
                            <button className='btn w-100  rounded py-2 bgClrBorder' style={style2}>
                                Answer to this question
                            </button>
                        </Link>
                    </div>
                    <div className="col-12  px-3 py-1 mb-0 ">
                        {
                            questionDetails ?
                                <div className='d-flex'>
                                    <button className={`px-3 d-flex align-items-center justify-content-start border-0 commentOption ${commentUi.className}`} onClick={showComments} style={style2}>
                                        <Chat />
                                        <small className='mx-3'>
                                            {
                                                roundedCount(questionDetails?.comments.length) + " "
                                            }
                                        </small>
                                    </button>
                                    <button className='border-0 d-flex justify-content-betweeen gap-2 align-items-center mx-1 btn' style={style1} onClick={() => submitUserVote_support(questionId, "QUESTION")}>
                                        <CaretUp className='text-success' size="20px" />
                                        <small className='answerOptions'>support</small>
                                    </button>
                                    <button className='border-0 d-flex justify-content-between gap-2 align-items-center mx-1' style={style1} onClick={() => submitUserVote_oppose(questionId, "QUESTION")}>
                                        <CaretDown className='text-success' size="20px" />
                                        <small className='answerOptions' style={style2}>oppose</small>
                                    </button>
                                    <button disabled className='text-center border-0 mx-3' style={style1}>
                                        <small>{questionDetails.support.length} votes</small>
                                    </button>
                                </div>
                                :
                                <div className='d-flex gap-2'>
                                    <SmallBox width="150.99px" height="31px" />
                                    <SmallBox width="120.99px" height="31px" />
                                </div>
                        }
                    </div>
                    <div className={`col-12 mt-0 commentBody py-3 mt-3 dpx-3 d-flex flex-column justify-content-center ${commentUi.status} `} >
                        <div className="px-2 py-3">
                            {
                                state.user ?
                                    <Comment
                                        comment={comment}
                                        submitFn={addNewComment}
                                        setInputValue={setComment}
                                        emojiPickerStatus={emojiPickerStatus}
                                        placeholder='leave your comments here...'
                                        setEmojiPickerStatus={setEmojiPickerStatus}
                                    />
                                    :
                                    <Alert variant="primary" className='text-center'>
                                        <Link to="/signup">Sign Up</Link> to add comments
                                    </Alert>
                            }
                        </div>
                        {
                            questionDetails?.comments.length > 0 ?
                                <div className="col-12 ">
                                    <CommentLIsts
                                        comments={questionDetails.comments}
                                    />
                                </div>
                                :
                                <div className="commentInnerBody p-5 text-center">
                                    <small>no comments</small>
                                </div>
                        }
                    </div>
                    <hr className='my-5 px-5' />
                    <div className="col-12">
                        <h4 className="text-success pb-5">{answers.length} answers</h4>
                        {
                            answers.map(data => (
                                <div className='answerSectionOuter'>
                                    <div>
                                        <div className="pb-3">
                                            <small className='py-2'>
                                                <Link to={`/usersprofile/${data.userId.email}`}>
                                                    {data.userId.userName}
                                                </Link>
                                            </small>
                                            {
                                                data.accepted ?
                                                    <small className="mx-2 text-success">
                                                        <CheckCircleFill size={'20px'} />
                                                    </small>
                                                    :
                                                    <small></small>
                                            }
                                            <small className='mx-2 timeagoshower' style={style1}>{formatTime(data.createdAt)}</small>
                                        </div>
                                        <div dangerouslySetInnerHTML={{ __html: data?.answer }}>
                                        </div>
                                        <div className='py-1 d-flex justify-content-between align-items-center'>
                                            <div className="d-flex justify-content-start align-items-center">
                                                <button disabled className='text-center border-0 text-dark' style={style1}>
                                                    <small style={style1}>{data.support.length} votes</small>
                                                </button>
                                                <button className='border-0 d-flex justify-content-betweeen gap-2 align-items-center btn' style={style1} onClick={() => submitUserVote_support(data._id, "ANSWER", data.userId.email, data.support, data.oppose)}>
                                                    <CaretUp className='text-success' size="20px" />
                                                    <small className='answerOptions'>support</small>
                                                </button>
                                                <button className='border-0 d-flex justify-content-between gap-2 align-items-center mx-1' style={style1} onClick={() => submitUserVote_oppose(data._id, "ANSWER", data.userId.email, data.support, data.oppose)}>
                                                    <CaretDown className='text-success' size="20px" />
                                                    <small className='answerOptions'>oppose</small>
                                                </button>
                                                {
                                                    questionDetails.email === state.user.email ?
                                                        <small className="mx-2 text-success acceptAnswerOption">
                                                            <CheckCircle size={'20px'} onClick={() => acceptAnswer(data._id)} />
                                                        </small>
                                                        :
                                                        <div></div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <hr className='my-5 px-5' />
                                </div>
                            ))
                        }
                    </div>
                </div>
                <ToastContainer
                    closeOnClick
                    autoClose={1000}
                    position='top-center'
                    hideProgressBar={true}
                />
            </div>
        </>
    )
}

export default DetailView