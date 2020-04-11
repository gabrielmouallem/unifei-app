import React from 'react';
import './MarkerList.scss';
import { makeStyles, List, ListItem, Avatar, ListItemText, ListItemAvatar, Typography, Divider } from '@material-ui/core';

import blueDot from '../../../../../assets/images/blue-dot.png';
import redDot from '../../../../../assets/images/red-dot.png';
import greenDot from '../../../../../assets/images/green-dot.png';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: '36ch',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
}));

export default () => {

    const classes = useStyles();

    return (
        <div className="marker-list">
            <List className={classes.root}>
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar alt="marker" src={blueDot} />
                    </ListItemAvatar>
                    <ListItemText
                        primary="Sala B1013"
                        secondary={
                            <React.Fragment>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    className={classes.inline}
                                    color="textPrimary"
                                >
                                    Bloco B
                  </Typography>
                                {" — I'll be in your neighborhood doing errands this…"}
                            </React.Fragment>
                        }
                    />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar alt="marker" src={redDot} />
                    </ListItemAvatar>
                    <ListItemText
                        primary="Sala A1104"
                        secondary={
                            <React.Fragment>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    className={classes.inline}
                                    color="textPrimary"
                                >
                                    Bloco A
                  </Typography>
                                {" — Wish I could come, but I'm out of town this…"}
                            </React.Fragment>
                        }
                    />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar alt="marker" src={greenDot} />
                    </ListItemAvatar>
                    <ListItemText
                        primary="Sala X1208"
                        secondary={
                            <React.Fragment>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    className={classes.inline}
                                    color="textPrimary"
                                >
                                    Bloco X
                  </Typography>
                                {' — Do you have Paris recommendations? Have you ever…'}
                            </React.Fragment>
                        }
                    />
                </ListItem>
            </List>
        </div>
    );
}