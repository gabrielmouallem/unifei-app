import React, { useState } from "react";
import { ChildrenProps } from "../../../../utils/types";
// import Drawer from "../Drawer/Drawer";
import Nav from "../Nav/Nav";
import MenuDrawer from "../MenuDrawer/MenuDrawer";

export const BasicsContext = React.createContext({
  visible: true,
  openDrawer: () => {},
  closeDrawer: () => {},
  toggleDrawer: () => {}
});

export const BasicsProvider = (props: ChildrenProps) => {
  const [drawerVisible, setDrawerVisible] = useState(false);

  return (
    <BasicsContext.Provider
      value={{
        visible: drawerVisible,
        openDrawer: () => setDrawerVisible(true),
        closeDrawer: () => setDrawerVisible(false),
        toggleDrawer: () => setDrawerVisible(!drawerVisible)
      }}
    >
      <Nav />
      <MenuDrawer />
      {props.children}
    </BasicsContext.Provider>
  );
};
