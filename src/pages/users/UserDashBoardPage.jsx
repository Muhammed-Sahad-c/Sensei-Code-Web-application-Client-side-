import React from 'react'
import { useSelector } from 'react-redux';
import '../../assets/styles/DashBoard.css';
import DashBoardFeeds from '../../components/User/DashBoardFeeds';
import DashBoardNavBar from '../../components/User/DashBoardNavBar';


function UserDashBoardPage() {
  const state = useSelector(state => { return state });
  const { primaryBackground } = state.themeStyle;

  return (
    <>
      <div className="homeFeedBody" style={{ "background": primaryBackground }} >
        <DashBoardNavBar currentTab={"DASHBOARD_TAB"} />
        <DashBoardFeeds />
      </div>
      {/* <DashBoardCourseDetails /> */}
    </>
  )
}

export default UserDashBoardPage