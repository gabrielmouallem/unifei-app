import React, { useState } from "react";
import { ChildrenProps } from "../../../../utils/types";
// import Drawer from "../Drawer/Drawer";
import Nav from "../Nav/Nav";

export const BasicsContext = React.createContext({

});

export const BasicsProvider = (props: ChildrenProps) => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectVisible, setSelectVisible] = useState(false);

  return (
    <BasicsContext.Provider
      value={{
        
      }}
    >
      <Nav />
      {/* <Drawer /> */}
      {props.children}
    </BasicsContext.Provider>
  );
};
