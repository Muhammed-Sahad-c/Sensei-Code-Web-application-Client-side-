import React from 'react'
import { useSelector } from 'react-redux';
import { Basket2Fill } from 'react-bootstrap-icons';
import { deleteNotifications } from '../../services/NotificationServices';


function NotificationDeleteButton({ id }) {
    const state = useSelector(state => { return state });
    const deleteNotification = async () => {
        const response = await deleteNotifications(id, state.user.email);
        if (response.data.status === true) {
            window.location.reload();
        }
    }
    return (
        <div>
            <div className='deleteNotification d-flex justify-content-end '>
                <button className='mx-2 my-2 btn'>
                    <Basket2Fill size={'12px'} onClick={deleteNotification} />
                </button>
            </div>
        </div>
    )
}

export default NotificationDeleteButton