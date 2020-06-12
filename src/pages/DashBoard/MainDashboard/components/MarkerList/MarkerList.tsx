import React, { useState, useEffect } from 'react';
import './MarkerList.scss';
import { makeStyles, List, ListItem, Avatar, ListItemText, ListItemAvatar, Typography, Divider } from '@material-ui/core';

import blueDot from '../../../../../assets/images/blue-dot.png';
import redDot from '../../../../../assets/images/red-dot.png';
import greenDot from '../../../../../assets/images/green-dot.png';
import { coreHTTPClient } from '../../../../../services/webclient';
import { MARKER_ICON_TYPES } from '../../../../../utils/consts';
import CustomCircularProgress from '../../../../../components/CustomCircularProgress/CustomCircularProgress';
import { FilterState } from '../../../../../redux/filter/types';
import { useSelector } from 'react-redux';
import { ApplicationState } from '../../../../../redux';

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



export default () => {

    const classes = useStyles();

    const [markers, setMarkers] = useState<MarkerProps[]>([]);

    var filter: FilterState = useSelector((state: ApplicationState) => state.filter);

    async function getAllMarkers() {
        await new Promise(async resolve => {
            try {
                const response: any = await coreHTTPClient.get(`markers/`);
                console.log(response)
                // @ts-ignore
                setMarkers(response.data.data);
            } catch (err) {
                console.log("Erro em getAllMarkers", err);
            }
        });
    }

    useEffect(() => {
        getAllMarkers();
        setInterval(async () => {
            getAllMarkers()
            //set state aqui
        }, 120000);
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
                                            <Avatar alt="marker" src={MARKER_ICON_TYPES[marker.type]} />
                                        </ListItemAvatar>
                                        <ListItemText
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
                                    </ListItem>
                                    <Divider variant="inset" component="li" />
                                </>
                            )
                        } else return <></>
                    })}
                </List>
            </div>
        );
    } else return (<CustomCircularProgress />)
}