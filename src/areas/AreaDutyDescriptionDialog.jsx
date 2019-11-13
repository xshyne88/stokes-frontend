import React from "react";
import {
  Dialog,
  Typography,
  DialogContent,
  DialogTitle,
  Slide,
  Divider,
  Button
} from "@material-ui/core";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default props => (
  <Dialog
    open={props.open}
    onClose={e => props.onClose()}
    TransitionComponent={Transition}
    keepMounted
  >
    <DialogTitle>
      <Typography>{props.title}</Typography>
    </DialogTitle>
    <Divider />
    <DialogContent>
      <Typography>{props.content}</Typography>
    </DialogContent>
    <Button onClick={e => props.onClose()}>Close</Button>
  </Dialog>
);
