import React, { useEffect, useContext, useState } from 'react';
import './Nav.scss';

import { Plugins } from '@capacitor/core';

import { AppBar, Toolbar, IconButton, Typography, Button, Icon, Dialog, Slide, Menu, MenuItem, Divider, FormControlLabel, Checkbox } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import FilterListIcon from '@material-ui/icons/FilterList';
import AddIcon from '@material-ui/icons/Add';
import { BasicsContext } from '../BasicsProvider/BasicsProvider';
import BaseModal from '../../../../components/BaseModal/BaseModal';
import { TransitionProps } from '@material-ui/core/transitions/transition';
import AddMarker from './components/AddMarker/AddMarker';
import { useHistory } from 'react-router-dom';
import { filterAtom } from '../../../../recoils/filterRecoil';
import { useRecoilState } from 'recoil';

const { StatusBar } = Plugins;

const Transition = React.forwardRef<unknown, TransitionProps>(
    function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    }
);

export default () => {

    const history = useHistory();

    const ctx = useContext(BasicsContext);

    const [anchorEl, setAnchorEl] = React.useState(null);

    const [open, setOpen] = useState(false);

    const [showAllMarkers, setShowAllMarkers] = useState(undefined);

    const [state, setState] = useRecoilState(filterAtom);

    const handleChange = (event: any) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    const {
        genericMarkers,
        eventMarkers,
        studyGroupMarkers,
        extraActivityMarkers,
        constructionMarkers,
        scheduleMarkers
    } = state;

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        StatusBar.setBackgroundColor({ color: "#004780" });
    }, []);

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
                                {/* Bem Vindo! */}
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
                                    <MenuItem>
                                        <b style={{marginLeft: "28%"}}>Filtrar por:</b>
                                    </MenuItem>
                                    <Divider />
                                    <MenuItem>
                                        <FormControlLabel
                                            control={<Checkbox color="default" checked={eventMarkers} onChange={handleChange} name="eventMarkers" />}
                                            label={<span style={{ fontSize: '0.8em' }}>Eventos</span>}
                                        />
                                    </MenuItem>
                                    <Divider />
                                    <MenuItem>
                                        <FormControlLabel
                                            control={<Checkbox color="default" checked={studyGroupMarkers} onChange={handleChange} name="studyGroupMarkers" />}
                                            label={<span style={{ fontSize: '0.8em' }}>Grupos de Estudo</span>}
                                        />
                                    </MenuItem>
                                    <Divider />
                                    <MenuItem>
                                        <FormControlLabel
                                            control={<Checkbox color="default" checked={extraActivityMarkers} onChange={handleChange} name="extraActivityMarkers" />}
                                            label={<span style={{ fontSize: '0.8em' }}>Atividades Extras</span>}
                                        />
                                    </MenuItem>
                                    <Divider />
                                    <MenuItem>
                                        <FormControlLabel
                                            control={<Checkbox color="default" checked={constructionMarkers} onChange={handleChange} name="constructionMarkers" />}
                                            label={<span style={{ fontSize: '0.8em' }}>Obras</span>}
                                        />
                                    </MenuItem>
                                    <Divider />
                                    <MenuItem>
                                        <FormControlLabel
                                            control={<Checkbox color="default" checked={genericMarkers} onChange={handleChange} name="genericMarkers" />}
                                            label={<span style={{ fontSize: '0.8em' }}>Salas e Locais</span>}
                                        />
                                    </MenuItem>
                                    <Divider />
                                    <MenuItem>
                                        <FormControlLabel
                                            control={<Checkbox color="default" checked={scheduleMarkers} onChange={handleChange} name="scheduleMarkers" />}
                                            label={<span style={{ fontSize: '0.8em' }}>Meus Horários</span>}
                                        />
                                    </MenuItem>
                                    <Divider />
                                    {/* <MenuItem>
                                        <Button
                                            variant="contained"
                                            style={{
                                                fontSize: "0.8em",
                                                marginLeft: "28%"
                                            }}
                                            onClick={()=>{
                                                dispatch(storeFilter(state));
                                                handleClose();
                                            }}>
                                            Salvar
                                        </Button>
                                    </MenuItem> */}
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
                keepMounted={false}
                onClose={() => {
                    setOpen(false);
                }}
                aria-labelledby="alert-dialog-slide-title---"
                aria-describedby="alert-dialog-slide-description---"
            >
                <BaseModal setOpen={setOpen} title="Criar Marcador">
                    <AddMarker key={open.toString()} setOpen={setOpen} />
                </BaseModal>
            </Dialog>
        </>
    );
}