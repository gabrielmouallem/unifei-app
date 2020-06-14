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
import { useSelector } from 'react-redux';
import { ApplicationState } from '../../../../../redux';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import BaseModal from '../../../../../components/BaseModal/BaseModal';
import { TransitionProps } from '@material-ui/core/transitions/transition';
import SelectedMarker from '../SelectedMarker/SelectedMarker';

interface MarkerProps {

    id: number;

    // GenericMarker
    latitude: string;
    longitude: string;
    type: number;
    name: string;
    description?: string;

    // EventMarker
    event_type?: number;
    event_date?: string;

    // ConstructionMarker
    construction_type?: number;

    // StudyGroupMarker
    group_size?: number;
    discipline?: string;
    class_group?: string;

    // ExtraActivityMarker
    activity_type?: number;

}

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

    const [open, setOpen] = useState(false);

    const [markers, setMarkers] = useState<MarkerProps[]>([]);

    const [selectedMarker, setSelectedMarker] = useState<any>(undefined);

    var filter: FilterState = useSelector((state: ApplicationState) => state.filter);

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event: any, markerID: number) => {
        console.log(markerID)
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleOpenSelectedMarkerModal = (marker: MarkerProps) => {
        setSelectedMarker(marker);
        setOpen(true);
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
                        if (filter.data.type === marker.type || filter.data.type === undefined) {
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
                                            handleClick(e, marker.id);
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
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={() => {
                        handleClose();
                    }}>
                        Editar
                    </MenuItem>
                    <MenuItem onClick={() => {
                        handleClose();
                    }}>
                        Deletar
                    </MenuItem>
                </Menu>
                <Dialog
                    fullWidth
                    fullScreen
                    open={open}
                    TransitionComponent={Transition}
                    onClose={() => {
                        setOpen(false)
                    }}
                    aria-labelledby="alert-dialog-slide-title-"
                    aria-describedby="alert-dialog-slide-description-"
                >
                    {selectedMarker !== undefined ? (
                        <BaseModal title={selectedMarker.name} setOpen={setOpen}>
                            <SelectedMarker markerID={`${selectedMarker.id}`} setOpen={setOpen} />
                        </BaseModal>
                    ): null}
                </Dialog>
            </div>
        );
    } else return (<CustomCircularProgress />)
}