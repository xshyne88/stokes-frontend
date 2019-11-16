import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Dialog,
  Typography,
  DialogContent,
  DialogTitle,
  Slide,
  Divider,
  Button
} from "@material-ui/core";
import AreaDutySwitches from "../AddDutySwitches";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  content: {
    marginTop: 25
  },
  title: {
    textAlign: "center"
  }
}));

export default ({ land, ...props }) => {
  const classes = useStyles();
  return (
    <Dialog
      open={true || props.open}
      onClose={e => props.onClose()}
      TransitionComponent={Transition}
      fullScreen
    >
      <DialogTitle>
        <Typography className={classes.title}>{props.title}</Typography>
      </DialogTitle>
      <Divider />
      <DialogContent className={classes.content}>
        <AreaDutySwitches land={land} />
      </DialogContent>
      <Button onClick={e => props.onClose()}>Close</Button>
    </Dialog>
  );
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
