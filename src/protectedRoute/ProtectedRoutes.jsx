import React, { useState, useEffect } from 'react';
import Spinner from '../components/Spinner/Spinner';
import { changeTheme } from '../reducers/ThemeReducer';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { setUserDetails } from '../reducers/UserReducer';
import { getUserDetails } from '../services/Authentication';
import { changeThemeStyle } from '../reducers/ThemeStyleReducer';
import { darkThemeStyle, lightThemeStyle } from '../constants/Constants';


function ProtectedRoutes({ role, route, socket }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [auth, setAuth] = useState(null);

    const state = useSelector(state => { return state });
    const { primaryBackground } = state.themeStyle;

    useEffect(() => {
        if (role === `user`) {
            getUserDetails().then(user => {
                if (user.data.status === true) {
                    dispatch(setUserDetails(user.data.userInfo));
                    setAuth(user.data?.status);

                    var theme = localStorage.getItem("user_theme");

                    if (!theme) {
                        localStorage.setItem("user_theme", "Light");
                        dispatch(changeTheme('Light'));
                        dispatch(changeThemeStyle(lightThemeStyle));
                    } else {
                        if (theme === 'Dark') dispatch(changeThemeStyle(darkThemeStyle));
                        else dispatch(changeThemeStyle(lightThemeStyle));
                    }
                } else {
                    setAuth(false);
                    localStorage.removeItem('user_token')
                }
            })
        }
    }, []);

    useEffect(() => {
        if (auth === true) {
            socket.emit("newuser", state.user.email);
        }
    }, [auth]);


    if (auth == null) {
        return (
            <div style={{ height: "100vh", backgroundColor: primaryBackground }} className="w-100 d-flex justify-content-center align-items-center">
                <div className="bg-dark p-3 rounded">
                    <Spinner size="30px" />
                </div>
            </div>
        )
    }

    return auth ? <Outlet context={[socket]} /> : navigate(route);

}

export default ProtectedRoutes