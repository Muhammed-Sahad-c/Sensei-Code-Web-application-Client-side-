import React from 'react'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../services/Authentication';
import { darkThemeStyle, lightThemeStyle } from '../constants/Constants';
import { setUserDetails } from '../reducers/UserReducer';
import { changeThemeStyle } from '../reducers/ThemeStyleReducer';
import { changeTheme } from '../reducers/ThemeReducer';
import { useState } from 'react';

function PublicRoute({ socket }) {
    const dispatch = useDispatch();

    const [auth, setAuth] = useState(null);

    const state = useSelector(state => { return state });
    const { primaryBackground, primaryColor, secondaryBackground } = state.themeStyle;
    const { user } = state;


    useEffect(() => {
        getUserDetails().then(user => {
            if (user.data.status) {
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
                localStorage.setItem("user_theme", "Light");
                dispatch(changeTheme('Light'));
                dispatch(changeThemeStyle(lightThemeStyle));
                setAuth(false);
            }
        })
    }, []);

    useEffect(() => {
        if (auth === true) {
            socket.emit("newuser", state.user.email);
        }
    }, [auth]);

    if (auth === null) return

    return auth === true ? <Outlet context={[socket]} /> : <Outlet context={[null]} />
}

export default PublicRoute