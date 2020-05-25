import React, { useContext } from "react";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import { BasicsContext } from "../BasicsProvider/BasicsProvider";


const MenuDrawer = () => {
  const ctx = useContext(BasicsContext);

  const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

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
          <div style={{width: "65%", height: "100%", backgroundColor: "white"}}>
            MENU DRAWER
          </div>
        </SwipeableDrawer>
    </>
  );
};

export default MenuDrawer;
