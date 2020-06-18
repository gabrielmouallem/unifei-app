import React from "react";
import { CircularProgress, Backdrop, makeStyles } from "@material-ui/core";

import "./CustomCircularProgress.scss";

const useStyles = makeStyles(theme => ({
  backdrop: {
    color: "#fff",
    backgroundColor: "rgba(255, 255, 255, 0.1)"
  }
}));

export default () => {
  const classes = useStyles({});
  return (
    <div className="custom-circular-progress">
      {/* <CircularProgress className={"progress"} thickness={2} size={240} /> */}
      <Backdrop className={classes.backdrop} open={true}>
        <CircularProgress style={{color: "rgb(250, 97, 12)", opacity:"1 !important"}} />
      </Backdrop>
    </div>
  );
};
