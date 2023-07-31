import React from 'react';
import { useSelector } from 'react-redux';
import DetailView from '../../components/QustionList/DetailView';

function DetailViewPage() {

    const state = useSelector(state => { return state });
    const { primaryBackground } = state.themeStyle;

    return (
        <div style={{ minHeight: "100vh", background:primaryBackground }}>
            <DetailView />
        </div>
    )
}

export default DetailViewPage