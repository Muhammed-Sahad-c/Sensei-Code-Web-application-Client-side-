import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import SignUp from '../../components/User/SignUp'

function SignupPage() {
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('user_token');
        if (token) navigate('/userdashboard');
    }, []);

    return (
        <>
            <SignUp />
        </>
    )
}

export default SignupPage