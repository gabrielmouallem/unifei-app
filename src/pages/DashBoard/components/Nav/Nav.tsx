import React, { useEffect, useContext, useState } from 'react';
import './Nav.scss';

import { Plugins } from '@capacitor/core';

import { AppBar, Toolbar, IconButton, Typography, Button, Icon, Dialog, Slide } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import FilterListIcon from '@material-ui/icons/FilterList';
import AddIcon from '@material-ui/icons/Add';
import { BasicsContext } from '../BasicsProvider/BasicsProvider';
import BaseModal from '../../../../components/BaseModal/BaseModal';
import { TransitionProps } from '@material-ui/core/transitions/transition';
import AddMarker from './components/AddMarker/AddMarker';

const { StatusBar } = Plugins;

const Transition = React.forwardRef<unknown, TransitionProps>(
    function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    }
);

export default () => {

    const ctx = useContext(BasicsContext);

    const [open, setOpen] = useState(false);

    useEffect(() => {
        StatusBar.setBackgroundColor({ color: "#004780" });
    });

    return (
        <>
            <AppBar position="sticky">
                <Toolbar>
                    <div className="nav">
                        <div className="nav__items-left">
                            <IconButton edge="start" aria-label="menu"
                                onClick={() => {
                                    ctx.openDrawer();
                                }}>
                                <MenuIcon />
                            </IconButton>
                            <h6>
                                Bem Vindo!
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
                                <IconButton
                                    onClick={()=>{
                                        setOpen(true);
                                    }}>
                                    <AddIcon />
                                </IconButton>
                            </div>
                        </div>
                    </div>
                </Toolbar>
            </AppBar>
            <Dialog
                fullWidth
                fullScreen
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => {
                    setOpen(false)
                }}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
                >
                <BaseModal title="Criar Marcador" setOpen={setOpen}>
                    <AddMarker key={open.toString()} open={open}/>
                </BaseModal>
            </Dialog>
        </>
    );
}