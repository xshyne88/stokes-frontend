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
import dayjs from "dayjs";
import { capitalize } from "../../headerfooter/BottomNavigation";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default ({ onClose, title, content, open, landDuty }) => {
  const { duty } = landDuty;
  const { completedDuties } = landDuty;
  const { name: dutyName } = duty;
  return (
    <Dialog
      open={open}
      onClose={e => onClose()}
      TransitionComponent={Transition}
      keepMounted
    >
      <DialogTitle>
        <Typography>{dutyName} Completions</Typography>
      </DialogTitle>
      <Divider />
      <DialogContent>
        {completedDuties && completedDuties.length
          ? completedDuties.map(cd => (
              <div key={cd.id} style={{ display: "flex" }}>
                <div>
                  {`${capitalize(cd.user.email)} ---------------
                   ${dayjs(cd.createdAt).format("MMM D YY")}`}
                </div>
              </div>
            ))
          : `${dutyName} has never been completed`}
      </DialogContent>
      <Button onClick={e => onClose()}>Close</Button>
    </Dialog>
  );
};
