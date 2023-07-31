import React from 'react';
import { useState } from 'react';
import Spinner from '../Spinner/Spinner';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { useSelector, useDispatch } from 'react-redux';
import { showError } from '../../reducers/ErrorReducer';
import { setLoader } from '../../reducers/LoaderReducer';
import { signinwithgoogle } from '../../services/GoogleAuth.js';
import { getDetailsFromGoogle } from '../../services/GoogleAuth';
import { submitSigninData } from '../../services/Authentication.js';

function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const { email, password } = loginData;

  const state = useSelector(state => { return state });
  const { spinner, error } = state;

  const errorHandler = (status, message = null) => {
    dispatch(setLoader(status));
    dispatch(showError(message));
  };

  const handleSignInData = async e => {
    e.preventDefault();
    errorHandler(true);
    if (!email || !password) errorHandler(false, 'please fill the form');
    else {
      if (password.length < 8) errorHandler(false, `password should contain more than 8 letters`);
      else {
        const signindataResponse = await submitSigninData(loginData);
        if (signindataResponse) {
          const { token, message, status } = signindataResponse.data;
          if (status) {
            localStorage.setItem('user_token', token);
            navigate('/');
          }
          else errorHandler(false, message);
        }
      }
    }
  }

  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      const userDetails = await getDetailsFromGoogle(codeResponse.access_token);
      const signindataResponse = await signinwithgoogle(userDetails.data.email);
      if (signindataResponse) {
        const { token, message, status } = signindataResponse.data;
        if (status) {
          localStorage.setItem('user_token', token);
          navigate('/');
        }
        else errorHandler(false, message);
      }
    },
    onError: err => {

    }
  })

  return (
    <div>
      <h1 className='clr pb-3'>welcome back!</h1>
      <div className='text-start'>
        <form onSubmit={handleSignInData}>
          <label htmlFor="email">email</label> <br />
          <input type="email" id='email' className='formInput px-2 py-1 text-start w-100 mb-2' value={email} onChange={(e) => { setLoginData({ email: e.target.value, password: password }) }} /> <br />
          <label htmlFor="password">password</label> <br />
          <input type="password" id='password' className='formInput px-2 py-1 text-start w-100 mb-2' value={password} onChange={e => { setLoginData({ email: email, password: e.target.value }) }} /> <br />
          <small className="text-danger">{error}</small>
          {
            spinner ?
              <button className='w-100 py-2 authButton mt-2 d-flex justify-content-center' style={{ 'cursor': 'not-allowed' }} disabled>
                <Spinner size='23px' color='black' />
              </button> :
              <button className='w-100 py-2 authButton mt-2 d-flex justify-content-center'>sign in</button>
          }
        </form>
        <p className='pt-3'>don't have an account? <a href="/signup">sign up</a></p>
        <div className="text-center pt-4">
          <button className='googleButton px-3 py-1' onClick={loginWithGoogle}>
            <img src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png" alt="" />
            sign in with google
          </button>
        </div>
      </div>
    </div>
  )
}

export default SignIn