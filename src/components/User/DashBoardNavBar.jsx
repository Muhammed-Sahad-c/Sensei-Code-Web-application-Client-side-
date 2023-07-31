import { useEffect } from 'react';
import React, { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Container from 'react-bootstrap/Container';
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { changeTheme } from '../../reducers/ThemeReducer';
import { setUserDetails } from '../../reducers/UserReducer';
import { changeThemeStyle } from '../../reducers/ThemeStyleReducer';
import { getDashboardDetails } from '../../services/DashboardServices';
import { darkThemeStyle, lightThemeStyle } from '../../constants/Constants';
import { Bell, Sun, List, Person, BoxArrowRight, Grid, BoxArrowInRight } from 'react-bootstrap-icons';

function DashBoardNavBar({ currentTab }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [socket] = useOutletContext();

    const [show, setShow] = useState(false);
    const [counts, setCounts] = useState({ notificationCount: 0 });
    const [instantCount, setInstantCount] = useState(0);


    const state = useSelector(state => { return state });
    const { primaryBackground, primaryColor, secondaryBackground } = state.themeStyle;

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const revertTheme = () => {

        if (state.theme === "Dark") {
            dispatch(changeTheme("Light"));
            localStorage.setItem('user_theme', "Light");
            dispatch(changeThemeStyle(lightThemeStyle));
        } else {
            dispatch(changeTheme("Dark"));
            localStorage.setItem('user_theme', "Dark");
            dispatch(changeThemeStyle(darkThemeStyle));
        }
    }

    const logout = () => {
        localStorage.removeItem('user_token');
        dispatch(setUserDetails(""));
        navigate('/')
    }

    useEffect(() => {
        getDashboardDetails(state.user.email).then(response => setCounts(response.data.counts))
    }, []);

    useEffect(() => {
        if (state.user) {
            socket.on("recievenotification", data => {
                setInstantCount(prevState => prevState + 1)
            })
        }
    }, [socket]);

    return (
        <>
            <Navbar style={{ "background": secondaryBackground }}>
                <Container>
                    <button onClick={handleShow} className="sidebarButton" style={{ "background": secondaryBackground, "color": primaryColor }}>
                        <List size={'30px'} />
                    </button>
                    <Navbar.Brand href="/userDashBoard" style={{ "color": primaryColor }}>sensei code</Navbar.Brand>
                </Container>
            </Navbar>

            <Offcanvas show={show} onHide={handleClose} style={{ "width": "auto", "backgroundColor": primaryBackground }}>
                <button >
                </button>
                <Offcanvas.Header closeButton className="d-flex justify-content-center w-100"></Offcanvas.Header>

                <Offcanvas.Body className='d-flex flex-column'>
                    <div className="d-flex justify-content-around flex-column">
                        {
                            state.user ? <div>
                                <a href="/userdashboard" className='text-decoration-none offcanvasOuter'>
                                    {
                                        currentTab !== "DASHBOARD_TAB" ?
                                            <button className="px-1 my-2 py-2 offcanvasItems w-100" style={{ "color": primaryColor }}>
                                                <div className="px-2" >
                                                    <Grid />
                                                    <small className='px-2'>Dashboard</small>
                                                </div>
                                            </button>
                                            :
                                            <button className="px-1 my-2 py-2 offcanvasItems w-100 offcanvasItemsActive" style={{ "color": primaryColor }}>
                                                <div className="px-2" >
                                                    <Grid />
                                                    <small className='px-2'>Dashboard</small>
                                                </div>
                                            </button>
                                    }
                                </a>
                                <a href="/profile" className='text-decoration-none offcanvasOuter'>
                                    {
                                        currentTab !== "PROFILE_TAB" ?
                                            <button className="px-1 my-2 py-2 offcanvasItems w-100" style={{ "color": primaryColor }}>
                                                <div className="px-2" >
                                                    <Person />
                                                    <small className='px-2'>Profile</small>
                                                </div>
                                            </button>
                                            :
                                            <button className="px-1 my-2 py-2 offcanvasItems w-100 offcanvasItemsActive" style={{ "color": primaryColor }}>
                                                <div className="px-2" >
                                                    <Person />
                                                    <small className='px-2'>Profile</small>
                                                </div>
                                            </button>
                                    }
                                </a>
                                <Link to="/notifications" className='text-decoration-none offcanvasOuter'>
                                    {
                                        currentTab !== "NOTIFICATION_TAB" ?
                                            <button className="px-1 my-2 py-2 offcanvasItems" style={{ "color": primaryColor }}>
                                                <div className="px-2">
                                                    <Bell />
                                                    <small className='px-2'>Notifications</small>
                                                    <span className='px-2 py-1'>{counts?.notificationCount + instantCount}</span>
                                                </div>
                                            </button>
                                            :
                                            <button className="px-1 my-2 py-2 offcanvasItems offcanvasItemsActive" style={{ "color": primaryColor }}>
                                                <div className="px-2">
                                                    <Bell />
                                                    <small className='px-2'>Notifications</small>
                                                </div>
                                            </button>
                                    }
                                </Link>
                                <button className="px-1 my-2 py-2 offcanvasTheme offcanvasItems" onClick={revertTheme} style={{ "color": primaryColor }}>
                                    <div className="px-2">
                                        <Sun />
                                        <small className='px-2'>Theme : <strong>{state?.theme}</strong></small>
                                    </div>
                                </button>
                                <button className="px-1 my-2 py-2 offcanvasTheme offcanvasItems" style={{ "color": primaryColor }} onClick={logout}>
                                    <div className="px-2">
                                        <BoxArrowRight />
                                        <small className='px-2'>Signout</small>
                                    </div>
                                </button>
                            </div> :
                                <div className='underline-0'>
                                    <Link to="/signin">
                                        <button className="px-1 my-2 py-2 offcanvasTheme offcanvasItems" style={{ "color": primaryColor }} onClick={logout}>
                                            <div className="px-2">
                                                <BoxArrowInRight />
                                                <small className='px-2'>Sign in</small>
                                            </div>
                                        </button>
                                    </Link>
                                </div>
                        }
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default DashBoardNavBar