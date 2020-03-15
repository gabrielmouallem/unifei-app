import React from 'react';
import './BottomTab.scss';

import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import PlaceIcon from '@material-ui/icons/Place';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import EventIcon from '@material-ui/icons/Event';
import LocalTaxiIcon from '@material-ui/icons/LocalTaxi';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        maxWidth: 500,
    },
});

export default () => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event: any, newValue: any) => {
        setValue(newValue);
    };

    return (
        <div className="bottom-tab">
            <Paper square className={classes.root}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="fullWidth"
                    indicatorColor="primary"
                    textColor="primary"
                    aria-label="icon tabs example"
                >
                    <Tab icon={<PlaceIcon />} aria-label="place" />
                    <Tab icon={<LocalLibraryIcon />} aria-label="study" />
                    <Tab icon={<EventIcon />} aria-label="event" />
                    <Tab icon={<LocalTaxiIcon />} aria-label="car-ride" />
                </Tabs>
            </Paper>
        </div>
    );
}