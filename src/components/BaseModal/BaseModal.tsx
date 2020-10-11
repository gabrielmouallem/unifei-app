import React, { useState } from 'react';
import { ReactJSX } from '../../utils/types';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import './BaseModal.scss';
import { Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { Plugins } from '@capacitor/core';
const { App } = Plugins;

interface Props {
    title?: string;
    children: ReactJSX;
    setOpen: (open: any) => void;
    closeIconDirection?: string;
}

export default (props: Props) => {

    const history = useHistory();

    const [open, setOpen] = useState(true);

    window.addEventListener('popstate', (e)=>{
        props.setOpen((open: boolean)=>{
            if(open) {
                window.history.go(1);
                return !open;
            }
            else return open;
        })
    });

    return (
        <div className="modal">
            <div className="modal__container">
                <div
                    className="modal__back"
                    onClick={() => {
                        console.log("click")
                        setOpen(false);
                        props.setOpen(false);
                    }}>
                    {props.closeIconDirection === "down" ? <ArrowBackIcon /> : <KeyboardArrowDownIcon />}
                </div>
                <div className="modal__title">
                    <Typography
                        style={{
                            fontSize: "1.35em",
                            fontWeight: "bold",
                            color: "#0D2A54"
                        }}
                    >
                        {props.title}
                    </Typography>
                </div>
            </div>
            {props.children}
        </div>
    );
}