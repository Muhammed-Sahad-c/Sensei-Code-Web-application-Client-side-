import OTPInput from "otp-input-react";
import React, { useState } from 'react';
import Spinner from '../Spinner/Spinner';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { showError } from '../../reducers/ErrorReducer';
import { setLoader } from '../../reducers/LoaderReducer';
import { verifyOtp } from '../../services/Authentication';

function Otp() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [OTP, setOTP] = useState('');

    const errorHandler = (status, message = null) => {
        dispatch(setLoader(status));
        dispatch(showError(message));
    };

    const state = useSelector(state => { return state });
    const { spinner, error } = state;

    const handleOtpSubmissions = async e => {
        errorHandler(true);
        if (OTP.length <= 3) errorHandler(false, `enter otp`);
        else {
            const verify = await verifyOtp(OTP, localStorage.getItem('secret_token'));
            const { message, token, status } = verify.data;
            if (status) {
                localStorage.setItem('user_token', token);
                localStorage.removeItem(`secret_token`);
                navigate('/');
            }
            else {
                setOTP('');
                errorHandler(false, message);
            }
        }
        e.preventDefault();
    }

    return (
        <div>
            <h3 className='clr pb-4'>Enter your OTP!</h3>
            <div className='otpOuter d-flex justify-content-center pb-3'>
                <OTPInput
                    value={OTP}
                    onChange={setOTP}
                    autoFocus
                    OTPLength={4}
                    otpType="number"
                    disabled={false}
                    secure
                />
            </div>
            <div className='py-1'>
                <small className="text-danger">{error}</small>
            </div>
            <div className="d-flex justify-content-center">
                {
                    spinner ?
                        <button className=' px-5 d-flex justify-content-center py-2 authButton mt-2 d-flex justify-content-center' disabled style={{ 'cursor': 'not-allowed' }}>
                            <Spinner size='23px' color='black' />
                        </button>
                        :
                        <button className=' px-5 d-flex justify-content-center py-2 authButton mt-2 d-flex justify-content-center' onClick={handleOtpSubmissions}>verify</button>
                }
            </div>
        </div>
    )
}

export default Otp