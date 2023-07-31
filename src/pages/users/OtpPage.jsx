import React, { useEffect } from 'react'
import Otp from '../../components/User/Otp';
import { useNavigate } from 'react-router-dom';

function OtpPage() {
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('secret_token')) navigate('/userdashboard')
    }, []);

    return (
        <div>
            <Otp />
        </div>
    )
}

export default OtpPage