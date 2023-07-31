import React from 'react';
import "../assets/styles/Common.css";
import OtpPage from '../pages/users/OtpPage';
import AuthLayout from '../layout/AuthLayout';
import { Routes, Route } from 'react-router-dom';
import SignInPage from '../pages/users/SignInPage';
import SignupPage from '../pages/users/SignupPage';
import ProfilePage from '../pages/users/ProfilePage';
import PublicRoute from '../Public Route/PublicRoute';
import CompilerPage from '../pages/users/CompilerPage';
import GuestHomePage from '../pages/users/GuestHomePage';
import QaSessionPage from '../pages/users/QaSessionPage';
import DetailViewPage from '../pages/users/DetailViewPage';
import UsersProfilePage from '../pages/users/UsersProfilePage';
import ProtectedRoutes from '../protectedRoute/ProtectedRoutes';
import UserDashBoardPage from '../pages/users/UserDashBoardPage';
import CreateQustionPage from '../pages/users/CreateQustionPage';
import NotificationPage from '../pages/users/NotificationPage';
import { useRef } from 'react';
import { io } from 'socket.io-client';
import AnswerPage from '../pages/users/AnswerPage';

function UserRouter() {
    const socket = useRef();
    socket.current = io(`http://localhost:8000`);

    return (
        <>
            <Routes>
                <Route path='/' element={<GuestHomePage />} />
                <Route element={<PublicRoute socket={socket.current} />}>
                    <Route path='/compiler' element={<CompilerPage />} />
                    <Route path="/qasession" element={<QaSessionPage />} />
                    <Route path='/usersprofile/:userMail' element={<UsersProfilePage />} />
                    <Route path='/view question/:questionId' element={<DetailViewPage />} />
                </Route>

                <Route element={<ProtectedRoutes role='user' route='/' socket={socket.current} />}>
                    <Route path='/profile' element={<ProfilePage />} />
                    <Route path='/notifications' element={<NotificationPage />} />
                    <Route path="/createqustion" element={<CreateQustionPage />} />
                    <Route path='/userdashboard' element={<UserDashBoardPage />} />
                    <Route path='/answertoquestion/:questionId' element={<AnswerPage />} />
                </Route>

                <Route element={<AuthLayout />}>
                    <Route path='/otp' element={<OtpPage />} />
                    <Route path='/signin' element={<SignInPage />} />
                    <Route path='/signup' element={<SignupPage />} />
                </Route>
            </Routes>
        </>
    )
}

export default UserRouter