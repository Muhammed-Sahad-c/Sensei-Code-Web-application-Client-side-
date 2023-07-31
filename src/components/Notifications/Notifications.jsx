import { useSelector } from 'react-redux';
import LgBox from '../Placeholders/LgBox';
import { BellFill } from 'react-bootstrap-icons';
import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import DashBoardNavBar from '../User/DashBoardNavBar';
import AnswerNotification from './AnswerNotification';
import CommentNotification from './CommentNotification';
import AuthenticationNotification from './AuthenticationNotification';
import { getUnreadedNotifications } from '../../services/NotificationServices';

function Notifications() {
  const [socket] = useOutletContext();

  const state = useSelector(state => { return state });
  const { primaryColor } = state.themeStyle;

  const categoryTypeNotification = (type, details) => {
    if (type === "COMMENT") return <CommentNotification details={details} />
    else if (type === "ANSWER") return <AnswerNotification details={details} />
    else if (type === "LOGIN" || type === "SIGN UP") return <AuthenticationNotification details={details} />
  }

  const [unreadedNotifications, setUnreadedNotifications] = useState({ notifications: [], status: false });
  const { notifications } = unreadedNotifications;

  const [instedNotifications, setInsteadNotifications] = useState([]);

  useEffect(() => {
    getUnreadedNotifications(state.user.email).then(response => {
      setUnreadedNotifications(response.data)
    });
  }, [unreadedNotifications]);

  useEffect(() => {
    socket.on("recievenotification", data => setInsteadNotifications(prevState => [...prevState, ""]))
  }, [socket]);

  return (
    <div>
      <DashBoardNavBar currentTab={"NOTIFICATION_TAB"} />
      <div className="container">
        <div className="row">
          <div className="col-12 my-3 d-flex justify-content-start align-items-center">
            <h2 className='notificationHeading notificationStyle'>Notifications</h2>
            <BellFill size='25px' className='mx-2 notificationStyle' />
          </div>
          {
            unreadedNotifications.status === false ?
              <div>
                <LgBox height="88px" />
                <LgBox height="88px" />
                <LgBox height="88px" />
                <LgBox height="88px" />
                <LgBox height="88px" />
                <LgBox height="88px" />
              </div>
              :
              <div>
                {
                  unreadedNotifications?.status !== null ?
                    <div>
                      {
                        [...instedNotifications, ...notifications].map(item => {
                          return (
                            <div>
                              {
                                categoryTypeNotification(item.NotificationType, item)
                              }
                            </div>
                          )
                        })
                      }
                    </div>
                    :
                    <div className='py-5 text-center' style={{ color: primaryColor }}>
                      no notifications
                    </div>
                }
              </div>
          }
        </div>
      </div>
    </div>
  )
}

export default Notifications