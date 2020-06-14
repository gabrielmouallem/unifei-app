import React, { useEffect, useContext, useState } from 'react';
import './Nav.scss';

import { Plugins } from '@capacitor/core';

import { AppBar, Toolbar, IconButton, Typography, Button, Icon, Dialog, Slide, Menu, MenuItem, Divider } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import FilterListIcon from '@material-ui/icons/FilterList';
import AddIcon from '@material-ui/icons/Add';
import { BasicsContext } from '../BasicsProvider/BasicsProvider';
import BaseModal from '../../../../components/BaseModal/BaseModal';
import { TransitionProps } from '@material-ui/core/transitions/transition';
import AddMarker from './components/AddMarker/AddMarker';
import { FilterState } from '../../../../redux/filter/types';
import { useSelector, useDispatch } from 'react-redux';
import { ApplicationState } from '../../../../redux';
import { storeFilter } from '../../../../redux/filter/actions';
import { useHistory } from 'react-router-dom';

const { StatusBar } = Plugins;

const Transition = React.forwardRef<unknown, TransitionProps>(
    function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    }
);

export default () => {

    const history = useHistory();

    const ctx = useContext(BasicsContext);

    const dispatch = useDispatch();

    const [anchorEl, setAnchorEl] = React.useState(null);

    const [open, setOpen] = useState(false);

    // var filter: FilterState = useSelector((state: ApplicationState) => state.filter);

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

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
                                <IconButton onClick={handleClick}>
                                    <FilterListIcon />
                                </IconButton>
                                <Menu
                                    id="simple-menu"
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={() => {
                                        dispatch(storeFilter({type: undefined}))
                                        handleClose();
                                    }} >
                                        Todos Marcadores
                                    </MenuItem>
                                    <Divider />
                                    <MenuItem onClick={() => {
                                        dispatch(storeFilter({type: 2}))
                                        handleClose();
                                    }} >
                                        Eventos
                                    </MenuItem>
                                    <Divider />
                                    <MenuItem onClick={() => {
                                        dispatch(storeFilter({type: 0}))
                                        handleClose();
                                    }}>
                                        Grupos de Estudo
                                    </MenuItem>
                                    <Divider />
                                    <MenuItem onClick={() => {
                                        dispatch(storeFilter({type: 1}))
                                        handleClose();
                                    }}>
                                        Atividades Extras
                                    </MenuItem>
                                    <Divider />
                                    <MenuItem onClick={() => {
                                        dispatch(storeFilter({type: 4}))
                                        handleClose();
                                    }}>
                                        Obras
                                    </MenuItem>
                                    <Divider />
                                    <MenuItem onClick={() => {
                                        dispatch(storeFilter({type: 3}))
                                        handleClose();
                                    }}>
                                        Salas e Locais
                                    </MenuItem>
                                    <Divider />
                                    <MenuItem onClick={() => {
                                        dispatch(storeFilter({type: 5}))
                                        handleClose();
                                    }}>
                                        Meus Horarios
                                    </MenuItem>
                                </Menu>
                                <IconButton>
                                    <NotificationsIcon />
                                </IconButton>
                                <IconButton
                                    onClick={() => {
                                        setOpen(true)
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
                onClose={() => {
                    setOpen(false);
                }}
                aria-labelledby="alert-dialog-slide-title---"
                aria-describedby="alert-dialog-slide-description---"
            >
                <BaseModal setOpen={setOpen} title="Criar Marcador">
                    <AddMarker key={open.toString()} />
                </BaseModal>
            </Dialog>
        </>
    );
}