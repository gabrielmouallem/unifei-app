import React from 'react';
import './ReloadFab.scss';
import RefreshIcon from '@material-ui/icons/Refresh';
import { CircularProgress } from '@material-ui/core';

interface Props {
    isLoading?: boolean;
    action?: any;
}

export default (props: Props) => {


    return (
        <div className="reload-fab"
            onClick={() => {
                props.action();
            }}>
            {
                props.isLoading
                ?
                    <CircularProgress style={{color: "white", width:"30px", height: "30px"}}/>
                :
                    <RefreshIcon fontSize="large" style={{ color: "white" }} />
            }
        </div>
    );

}