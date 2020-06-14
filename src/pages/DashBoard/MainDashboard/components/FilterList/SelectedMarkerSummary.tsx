import React, { useState, useEffect } from 'react';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, List, ListItem, ListItemText, Divider, Typography, Slide, Dialog } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FilterListIcon from '@material-ui/icons/FilterList';
import './SelectedMarkerSummary.scss';
import { TransitionProps } from '@material-ui/core/transitions/transition';
import BaseModal from '../../../../../components/BaseModal/BaseModal';
import SelectedMarker from '../SelectedMarker/SelectedMarker';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../../../../redux';
import { useHistory } from 'react-router-dom';

interface Props {
    icon: any;
    id_title: string;
}

const Transition = React.forwardRef<unknown, TransitionProps>(
    function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    }
);

export default (props: Props) => {

    const dispatch = useDispatch();

    const history = useHistory();

    // useEffect(() => {
    //     console.log("mount SelectedMarker Summary");

    //     return () => {
    //         console.log("unmount SelectedMarker Summary");
    //     }
    // })

    return (
        <div className="summary"
            onClick={() => {
                history.push(
                    String('markers/:marker').replace(':marker', props.id_title.split('-')[0])
                )
            }}>
            <div className="summary__flex">
                {
                    props.icon ?
                        <img src={props.icon.url} />
                        : <></>
                }
                {
                    props.id_title ?
                        <Typography
                            style={{
                                width: "100%",
                                marginLeft: "5px",
                                textAlign: "center",
                                color: "#000",
                                fontSize: "0.8em"
                            }}>
                            {props.id_title.split("-")[1]}
                        </Typography>
                        : <></>
                }
            </div>
        </div>
    );

}