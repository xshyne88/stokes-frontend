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

export default ({ land, title, open, onClose, ...props }) => {
  const classes = useStyles();
  return (
    <Dialog
      open={open}
      onClose={e => onClose()}
      fullScreen
      TransitionComponent={Transition}
    >
      <Title title={title} titleClass={classes.title} />
      <Divider />
      <DialogContent className={classes.content}>
        <AreaDutySwitches land={land} />
      </DialogContent>
      <Button onClick={e => onClose()}>Close</Button>
    </Dialog>
  );
};

const Title = ({ titleClass, title }) => (
  <DialogTitle>
    <Typography className={titleClass}>{title}</Typography>
  </DialogTitle>
);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
