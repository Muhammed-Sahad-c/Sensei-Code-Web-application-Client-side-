import React from 'react';
import { useSelector } from 'react-redux';
import "../../assets/styles/QaSession.css";
import AskQustion from '../../components/QustionList/AskQuestion';
import QustionList from '../../components/QustionList/QuestionList';
import DashBoardNavBar from '../../components/User/DashBoardNavBar'
function QaSessionPage() {
    const state = useSelector(state => { return state });
    const { primaryBackground, primaryColor, secondaryBackground } = state.themeStyle;

    return (
        <div className='' style={{ 'minHeight': "100vh", background: primaryBackground }}>
            <DashBoardNavBar />
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-3">
                        <AskQustion />
                    </div>
                    <div className="col-12 col-md-9">
                        <QustionList />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QaSessionPage