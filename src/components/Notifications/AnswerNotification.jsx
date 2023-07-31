import React from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Dot } from 'react-bootstrap-icons';
import { formatTime } from '../../constants/TimeAgo';
import NotificationDeleteButton from './NotificationDeleteButton';

function AnswerNotification({ details }) {

    const state = useSelector(state => { return state });
    const { primaryColor, secondaryBackground } = state.themeStyle;

    const { id, user, time } = details.content

    return (
        <div>
            <div className="col-12 my-1 rounded py-4 px-3 notificationBody" style={{ background: secondaryBackground, position: "relative" }}>
                <div className="d-flex justify-content-between align-items-center">
                    <div className="centerItems">
                        <div className="d-flex justify-content-start align-items-center">
                            <h5 className='notificationContent' style={{ color: primaryColor }}>
                                <p className='names text-info'>
                                    {user}
                                    {` `}
                                    <small style={{ color: primaryColor }}>
                                        answered on your question
                                    </small>
                                    <Link to={`/view question/${id}`}>
                                        <button className='px-3 py-1 rounded mx-2 border-0 bgClr text-white'>view</button>
                                    </Link>
                                </p>
                            </h5>
                        </div>
                    </div>
                    <div className="d-flex justify-content-end align-items-center">
                        <small className={state.theme === 'Light' ? "text-black-50" : "text-white-50"} style={{ fontSize: "10px" }}>
                            {
                                formatTime(time)
                            }
                        </small>
                        <Dot size="40px" className='text-success' />
                    </div>
                </div>
                <NotificationDeleteButton id={details._id} />
            </div>
        </div>
    )
}

export default AnswerNotification