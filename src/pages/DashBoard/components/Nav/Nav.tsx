import React, { useEffect } from 'react';
import './Nav.scss';

import unifeiLogo from '../../../../assets/images/unifei-logo.png';

import { Plugins } from '@capacitor/core';
const { StatusBar } = Plugins;

export default () => {

    useEffect(()=>{
        StatusBar.setBackgroundColor({color: "#004780"});
    });

    return (
        <div className="nav">
            <div className="nav__logo">
                <img src={unifeiLogo} />
            </div>
            <div className="nav__title">
                UNIFEI APP
            </div>
        </div>
    );
}