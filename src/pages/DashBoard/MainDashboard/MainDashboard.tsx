import React from 'react';
import './MainDashboard.scss';

import Map from './components/Map/Map';
import TopTab from '../components/TopTab/TopTab';
import AbsoluteWrapper from '../../../components/AbsoluteWrapper/AbsoluteWrapper';

export default () => {

    return (
        <AbsoluteWrapper>
            <div className="main-dashboard">
                <div className="main-dashboard__map-container">
                    <div className="main-dashboard__map">
                        <TopTab />
                    </div>
                </div>
            </div>
        </AbsoluteWrapper>
    )
}