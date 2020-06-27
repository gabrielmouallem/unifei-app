import React, { useState, useEffect } from 'react';
import './MarkerList.scss';
import { makeStyles, List, ListItem, Avatar, ListItemText, ListItemAvatar, Typography, Divider, Menu, MenuItem, IconButton, Dialog, Slide } from '@material-ui/core';

import blueDot from '../../../../../assets/images/blue-dot.png';
import redDot from '../../../../../assets/images/red-dot.png';
import greenDot from '../../../../../assets/images/green-dot.png';
import { coreHTTPClient } from '../../../../../services/webclient';
import { MARKER_ICON_TYPES } from '../../../../../utils/consts';
import CustomCircularProgress from '../../../../../components/CustomCircularProgress/CustomCircularProgress';
import { FilterState } from '../../../../../redux/filter/types';
import { useSelector, useDispatch } from 'react-redux';
import { ApplicationState } from '../../../../../redux';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import BaseModal from '../../../../../components/BaseModal/BaseModal';
import { TransitionProps } from '@material-ui/core/transitions/transition';
import SelectedMarker from '../SelectedMarker/SelectedMarker';
import { useHistory } from 'react-router-dom';
import { MarkerProps } from '../../../../../models/markers';
import { Plugins } from '@capacitor/core';
import { handleFilter } from '../../../../../utils/utils';

const { Modals } = Plugins;

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: '36ch',
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

    const dispatch = useDispatch();

    const history = useHistory();

    const [markers, setMarkers] = useState<MarkerProps[]>([]);

    const [selectedMarker, setSelectedMarker] = useState<any>(undefined);

    const [isDeleted, setIsDeleted] = useState<any>(undefined);

    var filter: FilterState = useSelector((state: ApplicationState) => state.filter);

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
        if (confirmRet.value){
            deleteMarker();
            getAllMarkers();
        }
      }

    useEffect(() => {
        getAllMarkers();
        let intervalID = setInterval(async () => {
            getAllMarkers()
            //set state aqui
        }, 10000);

        return () => {
            clearInterval(intervalID);
        }
    }, [])

    if (markers) {
        return (
            <div className="marker-list">
                <List className={classes.root}>
                    {markers.map((marker: MarkerProps) => {
                        if (handleFilter(filter.data, marker.type) && marker.id !== isDeleted) {
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
                                                    {/* <Typography
                                                        component="span"
                                                        variant="body2"
                                                        className={classes.inline}
                                                        color="textPrimary"
                                                    >
                                                        {marker.description}
                                                    </Typography> */}
                                                    {marker.description}
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
                </List>
                <Menu
                    id={`popover`}
                    anchorEl={anchorEl}

                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={() => {
                        console.log(selectedMarker.id)
                        history.push(
                            String('/markers/:marker/edit').replace(':marker',`${selectedMarker.id}`)
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
                {/* <Dialog
                    fullWidth
                    fullScreen
                    open={open}
                    TransitionComponent={Transition}
                    onClose={() => {
                        dispatch(handleModal({open: false}));
                    }}
                    aria-labelledby="alert-dialog-slide-title--"
                    aria-describedby="alert-dialog-slide-description--"
                >
                    {selectedMarker !== undefined ? (
                        <BaseModal key={`${selectedMarker.id}`} title={selectedMarker.name} >
                            <SelectedMarker key={`${selectedMarker.id}`} markerID={`${selectedMarker.id}`} />
                        </BaseModal>
                    ): null}
                </Dialog> */}
            </div>
        );
    } else return (<CustomCircularProgress />)
}