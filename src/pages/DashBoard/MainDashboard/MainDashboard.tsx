import React from 'react';
import './MainDashboard.scss';

import Map from './components/Map/Map';
import FilterBox from './components/FilterBox/FilterBox';

export default () => {

    return (
        <div className="main-dashboard">
            <FilterBox />
            <div className="main-dashboard__map-container">
                <div className="main-dashboard__map">
                    <Map />
                </div>
            </div>
        </div>
    )
}