import React from 'react';
import { useSelector } from 'react-redux';
import "../../assets/styles/Notifications.css";
import Notifications from '../../components/Notifications/Notifications';

function NotificationPage() {
    const state = useSelector(state => { return state });
    const { primaryBackground, primaryColor, secondaryBackground } = state.themeStyle;

    return (
        <div style={{ background: primaryBackground, minHeight:'100vh' }}>
            <Notifications />
        </div>
    )
}

export default NotificationPage