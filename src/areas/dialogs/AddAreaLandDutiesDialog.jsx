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
import AddLandDutyTransferList from "../../components/unused/UnusedTransferList";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default ({ land, ...props }) => (
  <Dialog
    open={props.open}
    onClose={e => props.onClose()}
    TransitionComponent={Transition}
    fullScreen
  >
    <DialogTitle>
      <Typography>{props.title}</Typography>
    </DialogTitle>
    <Divider />
    <DialogContent>
      <AddLandDutyTransferList land={land} />
    </DialogContent>
    <Button onClick={e => props.onClose()}>Close</Button>
    <Button autoFocus color="inherit" onClick={e => props.onClose()}>
      save
    </Button>
  </Dialog>
);
