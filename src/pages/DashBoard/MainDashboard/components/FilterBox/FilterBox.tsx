import React, { useState } from 'react';
import './FilterBox.scss';

import {
    withStyles,
    makeStyles,
    createStyles,
    FormControl,
    NativeSelect,
    Theme,
    InputBase
} from '@material-ui/core';

import Map from '../Map/Map';
import MarkerList from '../MarkerList/MarkerList';

const BootstrapInput = withStyles((theme: Theme) =>
    createStyles({
        root: {
            "label + &": {
                marginTop: theme.spacing(3)
            }
        },
        input: {
            color: "black",
            "& option": {
                color: "black",
                background: theme.palette.background.paper
            },
            height: "1rem",
            borderRadius: 4,
            position: "relative",
            width: 100,
            border: "1px solid #ced4da",
            fontSize: 15,
            padding: "0px 3px 3px 6px",
            transition: theme.transitions.create(["border-color", "box-shadow"]),
            // Use the system font instead of the default Roboto font.
            fontFamily: [
                "-apple-system",
                "BlinkMacSystemFont",
                '"Segoe UI"',
                "Roboto",
                '"Helvetica Neue"',
                "Arial",
                "sans-serif",
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"'
            ].join(","),
            "&:focus": {
                borderRadius: 4,
                borderColor: "#80bdff",
                boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
                background: "primary"
            }
        }
    })
)(InputBase);

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        margin: {
            marginTop: theme.spacing(1)
        }
    })
);

const allFloors = ['T', '1', '2', '3', '4', '5', '6', '7', '8'];

const AllSwitchOptions = ['Mapa', 'Lista'];

export default () => {

    const classes = useStyles({});

    const [floor, setFloor] = useState<string>("");

    const [switchOption, setSwitchOption] = useState<string>("Mapa");

    const handleFloorChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setFloor(event.target.value as string);
    };

    const handleSwitchChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSwitchOption(event.target.value as string);
    };

    return (
        <>
            <div className="filter-box">
                <div>
                    <FormControl className={classes.margin}>
                        <NativeSelect
                            id="s-select-native"
                            value={switchOption}
                            onChange={handleSwitchChange}
                            input={<BootstrapInput />}
                        >
                            {AllSwitchOptions.map(option => {
                                return <option value={option}>{option}</option>;
                            })}
                        </NativeSelect>
                    </FormControl>
                </div>
                <div>
                    <FormControl className={classes.margin}>
                        <NativeSelect
                            id="f-select-native"
                            value={floor}
                            onChange={handleFloorChange}
                            input={<BootstrapInput />}
                        >
                            {allFloors.map(floor => {
                                if (floor === 'T')
                                    return <option value={floor}>{`Térreo`}</option>;
                                else
                                    return <option value={floor}>{`${floor}º Andar`}</option>;
                            })}
                        </NativeSelect>
                    </FormControl>
                </div>
            </div>
            <div className="filter-box__map-container">
                <div className="filter-box__map">
                    {
                        switchOption === 'Mapa'
                        ? <Map />
                        : <MarkerList />
                    }
                </div>
            </div>
        </>
    )
}