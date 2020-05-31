import React from 'react';
import './MainDashboard.scss';

import Map from './components/Map/Map';
import TopTab from '../components/TopTab/TopTab';

export default () => {

    return (
        <div className="main-dashboard">
            <div className="main-dashboard__map-container">
                <div className="main-dashboard__map">
                    <TopTab />
                </div>
            </div>
        </div>
    )
}