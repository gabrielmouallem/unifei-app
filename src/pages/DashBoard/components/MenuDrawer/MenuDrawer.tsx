import React, { useContext } from "react";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import { BasicsContext } from "../BasicsProvider/BasicsProvider";
import { Typography, makeStyles, List, ListItem, ListItemIcon, ListItemText, Divider } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { clearToken } from "../../../../redux/auth/actions";
import PersonIcon from '@material-ui/icons/Person';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import SettingsIcon from '@material-ui/icons/Settings';
import ListIcon from '@material-ui/icons/List';
import './MenuDrawer.scss'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
  },
}));

const MenuDrawer = () => {

  const classes = useStyles();

  const ctx = useContext(BasicsContext);

  const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

  const dispatch = useDispatch();

  return (
    <>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={ctx.visible}
        onClose={() => {
          ctx.closeDrawer();
        }}
        onOpen={() => {
          ctx.openDrawer();
        }}
      >
        <div className="menu-drawer">
          <div className="menu-drawer__grey"></div>
          <div className="menu-drawer__profile-pic">
            <PersonIcon
              style={{
                fontSize: "80px"
              }} />
          </div>
          <div
            onClick={() => {
              dispatch(clearToken());
            }}>
            <div className="menu-drawer__profile-name">
              <Typography
                style={{ fontWeight: "bold" }} >
                Aluno
              </Typography>
            </div>
            <div className="menu-drawer__profile-infos">
              <span className="menu-drawer__code">2017017731</span>
              <span className="menu-drawer__logout">
                <ArrowForwardIosIcon
                  style={{ fontSize: "15px" }} /> Sair
              </span>
            </div>
            <div className={classes.root} style={{fontSize: "0.8em", color: "black"}}>
              <List component="nav" aria-label="menu drawer list">
                <Divider />
                <ListItem button>
                  <ListItemIcon>
                    <SettingsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Configurações" />
                </ListItem>
                <Divider />
                <ListItem button>
                  <ListItemIcon>
                    <ListIcon />
                  </ListItemIcon>
                  <ListItemText primary="Meu Horários" />
                </ListItem>
                <Divider />
              </List>
            </div>
          </div>
        </div>
      </SwipeableDrawer>
    </>
  );
};

export default MenuDrawer;
