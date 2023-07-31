import { useState } from 'react';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import SignIn from '../../components/User/SignIn';

function SignInPage() {
    const navigate = useNavigate()


    useEffect(() => {
        const token = localStorage.getItem('user_token');
        if (token) navigate('/userdashboard');
    }, []);




    return (
        <div>
            <SignIn />
        </div>
    )
}

export default SignInPage