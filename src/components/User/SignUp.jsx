import React from 'react';
import { useState } from 'react';
import Spinner from '../Spinner/Spinner';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { useSelector, useDispatch } from 'react-redux';
import { showError } from '../../reducers/ErrorReducer';
import { setLoader } from '../../reducers/LoaderReducer';
import { submitSignupData } from '../../services/Authentication';
import { getDetailsFromGoogle, signUpWithGoogleDetails } from '../../services/GoogleAuth';


function SignUp() {
    var dispatch = useDispatch();
    var navigate = useNavigate();

    const [signupInfo, setSignupInfo] = useState({ userName: "", email: "", password: "", rePassword: "", bio: "", about: "" });
    const { userName, email, password, rePassword, about, bio } = signupInfo;

    const state = useSelector(state => { return state });
    const { spinner, error } = state;

    const errorHandler = (status, message = null) => {
        dispatch(setLoader(status));
        dispatch(showError(message));
    }

    const signupDataSubmission = async e => {
        e.preventDefault();
        errorHandler(true);
        if (!userName || !email || !password || !rePassword) errorHandler(false, `please fill the form`);
        else {
            if (password !== rePassword) errorHandler(false, `password didn't match!`);
            else {
                if (password.length <= 8 && rePassword.length <= 8) errorHandler(false, `password should contain more than 8 letters`);
                else {
                    const signupResponse = await submitSignupData(signupInfo);
                    if (signupResponse === null) errorHandler(false, `Check your connection and try again`);
                    else {
                        const { status, message, token } = signupResponse.data;
                        if (status) {
                            localStorage.setItem('secret_token', token);
                            errorHandler(false)
                            navigate('/otp');
                        }
                        else errorHandler(false, message)
                    }
                }
            }
        }
    }

    const signupWithGoogle = useGoogleLogin({
        onSuccess: async response => {
            const userDetails = await getDetailsFromGoogle(response.access_token);
            if (userDetails) {
                const data = {
                    email: userDetails.data.email,
                    userName: userDetails.data.name,
                    profile: userDetails.data.picture,
                    google: true,
                    bio: "",
                    about: ""
                }
                const signupResponse = await signUpWithGoogleDetails(data);
                const { status, token, message } = signupResponse.data;
                if (status) {
                    console.log(status, token)
                    localStorage.setItem('user_token', token);
                    navigate('/');
                }
                else errorHandler(false, message);

            } else errorHandler(false, `something went wrong`);
        },
        onError: err => errorHandler(false, `authentication failed`)
    })


    return (
        <div>
            <h1 className='clr pb-3'>Join with us</h1>
            <div className='text-start '>
                <form onSubmit={signupDataSubmission}>
                    <label htmlFor="usernmae">username</label> <br />
                    <input type="text" id='username' className='formInput px-2 py-1 text-start w-100 mb-2' value={userName} onChange={e => setSignupInfo({ userName: e.target.value, email: email, password: password, rePassword: rePassword, bio: bio, about: about })} /> <br />
                    <label htmlFor="email">email</label> <br />
                    <input type="email" id='email' className='formInput px-2 py-1 text-start w-100 mb-2' value={email} onChange={e => setSignupInfo({ userName: userName, email: e.target.value, password: password, rePassword: rePassword, bio: bio, about: about })} /> <br />
                    <label htmlFor="password">password</label> <br />
                    <input type="text" id='password' className='formInput px-2 py-1 text-start w-100 mb-2' value={password} onChange={e => setSignupInfo({ userName: userName, email: email, password: e.target.value, rePassword: rePassword, bio: bio, about: about })} /> <br />
                    <label htmlFor="repassword">re enter password</label> <br />
                    <input type="text" id='repassword' className='formInput px-2 py-1 text-start w-100 mb-2' value={rePassword} onChange={e => setSignupInfo({ userName: userName, email: email, password: password, rePassword: e.target.value, bio: bio, about: about })} /> <br />
                    <small className="text-danger">{error}</small>
                    {
                        spinner ? <button className='w-100 py-2 authButton mt-2 d-flex justify-content-center' disabled style={{ 'cursor': "not-allowed" }}>
                            <Spinner size='23px' color='black' />
                        </button> : <button className='w-100 py-2 authButton mt-2'>sign up</button>
                    }
                </form>
                <p className='pt-3'>already have an account? <a href="/signin">sign in</a></p>
                <div className="text-center pt-4">
                    <button className='googleButton px-3' onClick={signupWithGoogle}>
                        <img src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png" alt="not found !" />
                        sign up with google
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SignUp