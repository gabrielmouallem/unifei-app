import React, { useState } from "react";
import { ReactJSX } from "../../../../utils/types";
import "./DashboardContainer.scss";
import CustomCircularProgress from "../../../../components/CustomCircularProgress/CustomCircularProgress";

interface Props {
  children: ReactJSX;
}

export default (props: Props) => {
  const [loading, setLoading] = useState(false);

  return (
    <div className={"dashboard-container"}>
      {loading ? <CustomCircularProgress /> : props.children}
    </div>
  );
};
