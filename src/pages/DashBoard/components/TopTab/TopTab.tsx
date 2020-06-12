import React from 'react';
import './TopTab.scss';

import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Map from '../../MainDashboard/components/Map/Map';

import { makeStyles } from '@material-ui/core/styles';
import MarkerList from '../../MainDashboard/components/MarkerList/MarkerList';
import FilterList from '../../MainDashboard/components/FilterList/SelectedMarkerSummary';
import { FilterState } from '../../../../redux/filter/types';
import { useSelector } from 'react-redux';
import { ApplicationState } from '../../../../redux';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        maxWidth: "100%",
    },
});

export default () => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event: any, newValue: any) => {
        setValue(newValue);
    };

    var filter: FilterState = useSelector((state: ApplicationState) => state.filter);

    return (
        <>
            <div className="top-tab">
                <Paper square className={classes.root}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        variant="fullWidth"
                        indicatorColor="secondary"
                        textColor="primary"
                        aria-label="top-tab"
                        TabIndicatorProps={{
                            style: {
                                backgroundColor: "#FA610C",
                                top: "0",
                                height: "3px"
                            }
                        }}
                    >
                        <Tab label="MAPA" aria-label="map" />
                        <Tab label="LISTA" aria-label="list" />
                    </Tabs>
                </Paper>
            </div>
            <div className="top-tab__container">
                <div className="top-tab__map">
                    {
                        value ? <MarkerList /> : <Map key={`__${filter.data.type}`}/>
                    }
                </div>
            </div>
        </>
    );
}