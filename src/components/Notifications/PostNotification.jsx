import React from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Dot } from 'react-bootstrap-icons';

function PostNotification() {

    const state = useSelector(state => { return state });
    const { primaryColor, secondaryBackground } = state.themeStyle;

    return (
        <div>
            <Link to={`/`} className="text-decoration-none">
                <div className="col-12 my-1 rounded py-4 px-3 notificationBody" style={{ background: secondaryBackground }}>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="centerItems">
                            <div className="d-flex justify-content-start align-items-center">
                                <h5 className='notificationContent' style={{ color: primaryColor }}>
                                    <p className='names text-info'>
                                        Muhammed Sahad
                                        {` `}
                                        <small style={{ color: primaryColor }}>
                                            asked :
                                            <i className='mx-1' style={{ fontWeight: "500", color: "gray" }}>
                                                "sahad klsdjflsdf.........."
                                            </i>
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
            </Link>
        </div>
    )
}

export default PostNotification