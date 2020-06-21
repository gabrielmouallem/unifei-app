import React, { useContext } from "react";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import { BasicsContext } from "../BasicsProvider/BasicsProvider";
import { Typography, makeStyles, List, ListItem, ListItemIcon, ListItemText, Divider } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { clearToken } from "../../../../redux/auth/actions";
import PersonIcon from '@material-ui/icons/Person';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import SettingsIcon from '@material-ui/icons/Settings';
import ListIcon from '@material-ui/icons/List';
import './MenuDrawer.scss'

import "@codetrix-studio/capacitor-google-auth";
import { Plugins } from '@capacitor/core';
import { useHistory } from "react-router-dom";
import { ProfileState } from "../../../../redux/profile/types";
import { ApplicationState } from "../../../../redux";
const { GoogleAuth } = Plugins;

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
  },
}));

const MenuDrawer = () => {

  const classes = useStyles();

  const history = useHistory();

  const ctx = useContext(BasicsContext);

  const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

  var profile: ProfileState = useSelector((state: ApplicationState) => state.profile);

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
          <div>
            <div className="menu-drawer__profile-name">
              <Typography
                style={{ fontWeight: "bold" }} >
                {profile.data.name}
              </Typography>
            </div>
            <div className="menu-drawer__profile-infos">
              <span className="menu-drawer__code">{profile.data.code}</span>
              <span className="menu-drawer__logout"
                onClick={() => {
                  GoogleAuth.signOut()
                  dispatch(clearToken());
                }}>
                <ArrowForwardIosIcon
                  style={{ fontSize: "15px" }} /> Sair
              </span>
            </div>
            <div className={classes.root} style={{fontSize: "0.8em", color: "black"}}>
              <List component="nav" aria-label="menu drawer list">
                <Divider />
                <ListItem button onClick={()=>{
                  ctx.closeDrawer();
                  history.push('/profile/');
                }}>
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText primary="Meu Perfil" />
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
