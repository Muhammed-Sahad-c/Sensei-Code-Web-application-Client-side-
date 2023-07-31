import React from 'react';
import { useSelector } from 'react-redux';
import { Dot } from 'react-bootstrap-icons';

function FollowNotification() {

    const state = useSelector(state => { return state });
    const { primaryColor, secondaryBackground } = state.themeStyle;

    return (
        <div>
            <div className="col-12 my-1 rounded py-4 px-3 notificationBody" style={{ background: secondaryBackground, color: primaryColor }}>
                <div className=" d-flex justify-content-between align-items-center">
                    <div className="d-flex justify-content-center align-items-center centerItems text-center">
                        <div className="d-flex justify-content-start align-items-center">
                            <h5 className='notificationContent' style={{ color: primaryColor }}>
                                <p className='names text-info'>
                                    Muhammed Sahad
                                    {` `}
                                    <small style={{ color: primaryColor }}>
                                        started following you.
                                    </small>
                                </p>
                            </h5>
                        </div>
                    </div>
                    <div className="d-flex justify-content-end align-items-center">
                        <Dot size="40px" className='text-success' />
                        <small className={state.theme === 'Light' ? "text-black-50" : "text-white-50"}>
                            1d
                        </small>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FollowNotification