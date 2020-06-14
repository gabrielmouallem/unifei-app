import React from 'react';
import { ReactJSX } from '../../utils/types';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import './BaseModal.scss';
import { Typography } from '@material-ui/core';

interface Props {
    title: string;
    children: ReactJSX;
    setOpen: (open: any) => void;
}

export default (props: Props) => {

    return (
        <div className="modal">
            <div
                className="modal__back"
                onClick={() => {
                    console.log("click")
                    props.setOpen(false)
                }}>
                <ArrowBackIcon />
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
            {props.children}
        </div>
    );
}