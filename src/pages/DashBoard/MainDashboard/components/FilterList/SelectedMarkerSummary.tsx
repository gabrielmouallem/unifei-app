import React, { useState, useEffect } from 'react';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, List, ListItem, ListItemText, Divider, Typography, Slide, Dialog } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FilterListIcon from '@material-ui/icons/FilterList';
import './SelectedMarkerSummary.scss';
import { TransitionProps } from '@material-ui/core/transitions/transition';
import BaseModal from '../../../../../components/BaseModal/BaseModal';
import SelectedMarker from '../SelectedMarker/SelectedMarker';

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

    const [open, setOpen] = useState(false);

    useEffect(()=> {
        console.log(open)
    }, [open])

    if (props.id_title) {
        return (
            <div className="summary"
                onClick={() => {
                    setOpen(true);
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
                    {props.id_title !== undefined ? (
                        <>
                            <BaseModal title={props.id_title.split("-")[1]} setOpen={setOpen}>
                                <SelectedMarker markerID={props.id_title.split("-")[0]} setOpen={setOpen} />
                            </BaseModal>
                        </>
                    ) : null}
                </Dialog>
            </div>

        );
    } else {
        return (
            <></>
        )
    }

}