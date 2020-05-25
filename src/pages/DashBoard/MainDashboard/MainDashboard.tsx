import React from 'react';
import './MainDashboard.scss';

import Map from './components/Map/Map';
import BottomDrawer from '../components/BottomTab/BottomTab';

export default () => {

    return (
        <div className="main-dashboard">
            <div className="main-dashboard__map-container">
                <div className="main-dashboard__map">
                    <BottomDrawer />
                </div>
            </div>
        </div>
    )
}