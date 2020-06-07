import React from 'react';
import './AddMarker.scss';
import { List, ListItem, Avatar, ListItemAvatar, ListItemText, Typography, Divider, makeStyles } from '@material-ui/core';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import DirectionsIcon from '@material-ui/icons/Directions';
import EventNoteIcon from '@material-ui/icons/EventNote';
import RoomIcon from '@material-ui/icons/Room';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: '36ch',
        backgroundColor: "#F5F5F5",
    },
    inline: {
        display: 'inline',
    },
}));

export default () => {

    const classes = useStyles();

    return (
        <div className="add-marker">
            <List className={classes.root}>
                <ListItem alignItems="flex-start" style={{backgroundColor: "rgba(235, 222, 52, 0.1)"}}>
                    <ListItemAvatar>
                        <MenuBookIcon />
                    </ListItemAvatar>
                    <ListItemText
                        primary="Grupo de Estudos"
                        secondary={
                            <React.Fragment>
                                {"Chame outros alunos da universidade para estudarem com você baseado na sua localização!"}
                            </React.Fragment>
                        }
                    />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem alignItems="flex-start" style={{backgroundColor: "rgba(3, 252, 23, 0.1)"}}>
                    <ListItemAvatar>
                        <AccessibilityNewIcon />
                    </ListItemAvatar>
                    <ListItemText
                        primary="Atividades Extras"
                        secondary={
                            <React.Fragment>
                                {"Chame outros alunos da universidade para realizar uma atividade com você baseado na sua localização!"}
                            </React.Fragment>
                        }
                    />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem alignItems="flex-start" style={{backgroundColor: "rgba(0, 0, 0, 0.1)"}}>
                    <ListItemAvatar>
                        <DirectionsIcon />
                    </ListItemAvatar>
                    <ListItemText
                        primary="Sinalize Uma Obra"
                        secondary={
                            <React.Fragment>
                                {'Se deparou com uma obra que atrapalhou seu caminho? Sinalize para que outros estudantes possam se desviar dela.'}
                            </React.Fragment>
                        }
                    />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem alignItems="flex-start" style={{backgroundColor: "rgba(235, 110, 52, 0.1)"}}>
                    <ListItemAvatar>
                        <EventNoteIcon />
                    </ListItemAvatar>
                    <ListItemText
                        primary="Eventos"
                        secondary={
                            <React.Fragment>
                                {'Adicione seu próprio evento para que outros alunos e professores possam participar dele!'}
                            </React.Fragment>
                        }
                    />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem alignItems="flex-start" style={{backgroundColor: "rgba(3, 115, 252, 0.1)"}}>
                    <ListItemAvatar>
                        <RoomIcon />
                    </ListItemAvatar>
                    <ListItemText
                        primary="Salas e Locais"
                        secondary={
                            <React.Fragment>
                                {'Nos ajude adicionando novas salas e locais que ainda não estão registrados em nosso app!'}
                            </React.Fragment>
                        }
                    />
                </ListItem>
                <Divider variant="inset" component="li" />
            </List>
        </div>
    )
}