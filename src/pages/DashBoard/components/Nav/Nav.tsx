import React, { useEffect, useContext } from 'react';
import './Nav.scss';

import { Plugins } from '@capacitor/core';

import { AppBar, Toolbar, IconButton, Typography, Button, Icon } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import FilterListIcon from '@material-ui/icons/FilterList';
import AddIcon from '@material-ui/icons/Add';
import { BasicsContext } from '../BasicsProvider/BasicsProvider';

const { StatusBar } = Plugins;

export default () => {

    const ctx = useContext(BasicsContext);

    useEffect(() => {
        StatusBar.setBackgroundColor({ color: "#004780" });
    });

    return (
        <AppBar position="sticky">
            <Toolbar>
                <div className="nav">
                    <div className="nav__items-left">
                        <IconButton edge="start" aria-label="menu"
                            onClick={()=>{
                                ctx.openDrawer();
                            }}>
                            <MenuIcon />
                        </IconButton>
                        <h6>
                            UNIFEI APP
                        </h6>
                    </div>
                    <div className="nav__items-right">
                        <div className="nav__right-icons">
                            <IconButton>
                                <FilterListIcon />
                            </IconButton>
                            <IconButton>
                                <NotificationsIcon />
                            </IconButton>
                            <IconButton>
                                <AddIcon />
                            </IconButton>
                        </div>
                    </div>
                </div>
            </Toolbar>
        </AppBar>
    );
}