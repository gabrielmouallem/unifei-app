import React, { useEffect } from 'react';
import './TopTab.scss';

import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Map from '../../MainDashboard/components/Map/Map';

import { makeStyles } from '@material-ui/core/styles';
import MarkerList from '../../MainDashboard/components/MarkerList/MarkerList';
import { filterAtom, FilterState } from '../../../../recoils/filterRecoil';
import { useRecoilState, useRecoilValue } from 'recoil';
import { tabAtom, TabState } from '../../../../recoils/TabRecoil';
import { Plugins } from '@capacitor/core';
const { App } = Plugins;

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        maxWidth: "100%",
    },
});

export default () => {
    const classes = useStyles();

    const handleChange = (event: any, newValue: any) => {
        setSelectedTab({value: newValue});
    };

    var filter: FilterState = useRecoilValue(filterAtom);

    const [selectedTab, setSelectedTab] = useRecoilState<TabState>(tabAtom);

    useEffect(()=>{
        console.log({selectedTab})
    },[selectedTab])

    return (
        <>
            <div className="top-tab">
                <Paper square className={classes.root}>
                    <Tabs
                        value={selectedTab.value}
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
                        selectedTab.value 
                            ? <MarkerList />
                            : <Map key={`${JSON.stringify(filter)}`}/>
                    }
                </div>
            </div>
        </>
    );
}