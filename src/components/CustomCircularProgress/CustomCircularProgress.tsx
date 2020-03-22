import React from "react";
import { CircularProgress, Backdrop, makeStyles } from "@material-ui/core";

import "./CustomCircularProgress.scss";

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff"
  }
}));

export default () => {
  const classes = useStyles({});
  return (
    <div className="custom-circular-progress">
      {/* <CircularProgress className={"progress"} thickness={2} size={240} /> */}
      <Backdrop className={classes.backdrop} open={true}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};
