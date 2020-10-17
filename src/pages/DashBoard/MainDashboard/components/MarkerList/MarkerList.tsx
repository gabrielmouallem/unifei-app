import React, { useState, useEffect } from 'react';
import './MarkerList.scss';
import { makeStyles, List, ListItem, Avatar, ListItemText, ListItemAvatar, Typography, Divider, Menu, MenuItem, IconButton, Dialog, Slide, TextField, InputAdornment } from '@material-ui/core';

import blueDot from '../../../../../assets/images/blue-dot.png';
import redDot from '../../../../../assets/images/red-dot.png';
import greenDot from '../../../../../assets/images/green-dot.png';
import { coreHTTPClient } from '../../../../../services/webclient';
import { MARKER_ICON_TYPES } from '../../../../../utils/consts';
import CustomCircularProgress from '../../../../../components/CustomCircularProgress/CustomCircularProgress';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import BaseModal from '../../../../../components/BaseModal/BaseModal';
import { TransitionProps } from '@material-ui/core/transitions/transition';
import SelectedMarker from '../SelectedMarker/SelectedMarker';
import { useHistory } from 'react-router-dom';
import { MarkerProps } from '../../../../../models/markers';
import { Plugins } from '@capacitor/core';
import { handleFilter } from '../../../../../utils/utils';
import SearchIcon from '@material-ui/icons/Search';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { filterAtom, FilterState } from '../../../../../recoils/filterRecoil';
import ReloadFab from '../ReloadFab/ReloadFab';
import socketIo from 'socket.io-client';
import { useRecoilState } from 'recoil';
import { reloadAtom, ReloadState } from '../../../../../recoils/reloadRecoil';
import { socketURL } from '../../../../../env';
import { mapPropsAtom } from '../../../../../recoils/mapPropsRecoil';
import { tabAtom } from '../../../../../recoils/TabRecoil';

const { Modals } = Plugins;

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
}));

const Transition = React.forwardRef<unknown, TransitionProps>(
    function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    }
);

export default () => {

    const classes = useStyles();

    const history = useHistory();

    const [searchInput, setSearchInput] = useState<string>("");

    const [markers, setMarkers] = useState<MarkerProps[]>([]);

    const [selectedMarker, setSelectedMarker] = useState<any>(undefined);

    const [isDeleted, setIsDeleted] = useState<any>(undefined);

    const [loading, setLoading] = useState(false);

    var filter: FilterState = useRecoilValue(filterAtom);

    var [reload, setReload] = useRecoilState(reloadAtom);

    var setMapProps = useSetRecoilState(mapPropsAtom);

    const setSelectedTab = useSetRecoilState(tabAtom);

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event: any, selMarker: MarkerProps) => {
        setSelectedMarker(selMarker);
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleOpenSelectedMarkerModal = (marker: MarkerProps) => {
        setSelectedMarker(marker);
        history.push(
            String('/markers/:marker').replace(':marker', `${marker.id}`)
        )
    }

    async function deleteMarker() {
        await new Promise(async resolve => {
            try {
                const response: any = await coreHTTPClient.delete(`GenericMarker/${selectedMarker.id}/delete/`);
                setIsDeleted(selectedMarker.id)
            } catch (err) {
                console.log("Erro em deleteMarker", err);
            }
        });
    }

    async function reloadAllMarkers() {
        setLoading(true);
        await new Promise(async resolve => {
            try {
                const response: any = await coreHTTPClient.get(`markers/`);
                // console.log(response)
                // @ts-ignore
                setMarkers(response.data.data);
            } catch (err) {
                console.log("Erro em reloadAllMarkers", err);
            } finally {
                setLoading(false);
            }
        });
    }

    async function getAllMarkers() {
        await new Promise(async resolve => {
            try {
                const response: any = await coreHTTPClient.get(`markers/`);
                // console.log(response)
                // @ts-ignore
                setMarkers(response.data.data);
            } catch (err) {
                console.log("Erro em getAllMarkers", err);
            }
        });
    }

    async function showConfirm() {
        let confirmRet = await Modals.confirm({
            title: 'Atenção',
            message: 'Você tem certeza que deseja deletar este marcador?'
        });
        console.log(confirmRet)
        if (confirmRet.value) {
            deleteMarker();
            getAllMarkers();
        }
    }

    useEffect(() => {
        if (reload.reload === true) {
            getAllMarkers();
            setReload((prevReloadState) => {
                return { ...prevReloadState, reload: false }
            })
        }
    }, [reload]);

    useEffect(() => {
        getAllMarkers();
    }, [])

    useEffect(() => {
        const socketIO = socketIo(socketURL);
        socketIO.on('new-marker', (data: any) => {
            setMarkers((prevMarkers) => {
                return [...prevMarkers, data].sort((a, b) => {
                    if (a.type > b.type) {
                        return 1
                    }
                    if (a.type < b.type) {
                        return -1;
                    }
                    else return 0;
                })
            });
        });
    }, []);

    if (markers) {
        return (
            <>
                <ReloadFab action={reloadAllMarkers} isLoading={loading} />
                <div className="marker-list">
                    <div className="marker-list__search">
                        <TextField
                            id="marker-search-input"
                            label="Pesquisar marcador"
                            value={searchInput}
                            onChange={value => setSearchInput(value.target.value)}
                            style={{ alignSelf: "center", paddingBottom: "10px" }}
                            color="secondary"
                            InputProps={{
                                endAdornment:
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="search"
                                            edge="end"
                                        >
                                            <SearchIcon />
                                        </IconButton>
                                    </InputAdornment>,
                            }}
                        />
                        <Divider />
                    </div>
                    <List className={classes.root}>
                        {searchInput === ""
                            ? markers.map((marker: MarkerProps) => {
                                if (handleFilter(filter, marker.type) && marker.id !== isDeleted) {
                                    return (
                                        <>
                                            <ListItem alignItems="flex-start">
                                                <ListItemAvatar>
                                                    <Avatar alt="marker" src={MARKER_ICON_TYPES[marker.type]}
                                                        onClick={() => { handleOpenSelectedMarkerModal(marker) }} />
                                                </ListItemAvatar>
                                                <ListItemText
                                                    onClick={() => { handleOpenSelectedMarkerModal(marker) }}
                                                    primary={marker.name}
                                                    secondary={
                                                        <React.Fragment>
                                                            <div className="marker-list__description">
                                                                {marker.description}
                                                            </div>
                                                        </React.Fragment>
                                                    }
                                                />
                                                <MoreVertIcon onClick={(e) => {
                                                    handleClick(e, marker);
                                                }} />
                                            </ListItem>
                                            <Divider variant="inset" component="li" />
                                        </>
                                    )
                                } else return <></>
                            })
                            : markers
                                .filter(marker => {
                                    return marker.name
                                        .toLowerCase()
                                        .includes(searchInput.toLowerCase());
                                })
                                .map((marker: MarkerProps) => {
                                    if (handleFilter(filter, marker.type) && marker.id !== isDeleted) {
                                        return (
                                            <>
                                                <ListItem alignItems="flex-start">
                                                    <ListItemAvatar>
                                                        <Avatar alt="marker" src={MARKER_ICON_TYPES[marker.type]}
                                                            onClick={() => { handleOpenSelectedMarkerModal(marker) }} />
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        onClick={() => { handleOpenSelectedMarkerModal(marker) }}
                                                        primary={marker.name}
                                                        secondary={
                                                            <React.Fragment>
                                                                <div className="marker-list__description">
                                                                    {marker.description}
                                                                </div>
                                                            </React.Fragment>
                                                        }
                                                    />
                                                    <MoreVertIcon onClick={(e) => {
                                                        handleClick(e, marker);
                                                    }} />
                                                </ListItem>
                                                <Divider variant="inset" component="li" />
                                            </>
                                        )
                                    } else return <></>
                                })}
                        <div style={{ marginBottom: "30px" }}></div>
                    </List>
                    <Menu
                        id={`popover`}
                        anchorEl={anchorEl}

                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={() => {
                            setMapProps({
                                center: {
                                    lat: parseFloat(selectedMarker.latitude),
                                    lng: parseFloat(selectedMarker.longitude)
                                },
                                zoom: 21
                            });
                            setSelectedTab({ value: 0 });
                            handleClose();
                        }}>
                            Ver no Mapa
                        </MenuItem>
                        <Divider />
                        <MenuItem onClick={() => {
                            console.log(selectedMarker.id)
                            history.push(
                                String('/markers/:marker/edit').replace(':marker', `${selectedMarker.id}`)
                            )
                            handleClose();
                        }}>
                            Editar
                        </MenuItem>
                        <Divider />
                        <MenuItem onClick={() => {
                            showConfirm()
                            handleClose();
                        }}>
                            Deletar
                        </MenuItem>
                    </Menu>
                </div>
            </>
        );
    } else {
        return (<CustomCircularProgress />)
    }
}