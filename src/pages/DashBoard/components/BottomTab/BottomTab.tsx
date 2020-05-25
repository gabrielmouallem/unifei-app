import React from 'react';
import './BottomTab.scss';

import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Map from '../../MainDashboard/components/Map/Map';

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
        <>
            {
                value ? <></> : <Map />
            }
            <div className="bottom-tab">
                <Paper square className={classes.root}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        variant="fullWidth"
                        indicatorColor="secondary"
                        textColor="secondary"
                        aria-label="bottom-tab"
                        TabIndicatorProps={{ style: { backgroundColor: "white" } }}
                    >
                        <Tab label="MAPA" aria-label="map" />
                        <Tab label="LISTA" aria-label="list" />
                    </Tabs>
                </Paper>
            </div>
        </>
    );
}