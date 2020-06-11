import React from 'react';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, List, ListItem, ListItemText, Divider, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FilterListIcon from '@material-ui/icons/FilterList';
import './FilterList.scss';

interface Props {
    icon: any;
    id_title: string;
}

export default (props: Props) => {

    // console.log(props.id_title)

    if (props){
        return (
            <div className="filter-list">
                <div className="filter-list__flex">
                    {
                        props.icon?
                            <img src={props.icon.url} />
                        : <></>
                    }
                    {
                        props.id_title ?
                            <Typography
                                style={{
                                    width: "100%",
                                    // marginLeft: "15px",
                                    textAlign: "center",
                                    color: "#000",
                                    fontSize: "0.8em"
                                }}>
                                {props.id_title}
                            </Typography>
                        : <></>
                    }
                </div>
            </div>
    
        );
    } else {
        return (
            <></>
        )
    }
    
}