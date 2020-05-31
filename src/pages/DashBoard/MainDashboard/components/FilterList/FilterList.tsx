import React from 'react';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, List, ListItem, ListItemText, Divider } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FilterListIcon from '@material-ui/icons/FilterList';
import './FilterList.scss';

export default () => {

    return (
        <div className="filter-list">
            <ExpansionPanel>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon style={{ width: "20px" }} />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    style={{ backgroundColor: "#004780", borderRadius: "10px" }}
                >
                    <div className="filter-list__flex">
                        <FilterListIcon /> FILTRAR
                    </div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <div>Grupo de Estudos</div>
                    <Divider />
                    <div>Meus Horários</div>
                    <Divider />
                    <div>Blocos</div>
                    <Divider />
                    <div>Lazer</div>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>

    );
}