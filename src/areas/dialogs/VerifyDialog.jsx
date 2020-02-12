import React, { useContext } from "react";
import { useMutation } from "react-apollo";
import dayjs from 'dayjs';
import { getUserId } from "../../helpers";
import { UserContext } from "../../UserProvider";
import {
  Button,
  Slide,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import createVerifiedCompletedDutyMutation from "../../graphql/mutations/createVerifiedCompletedDutyMutation";
import createCompletedDutyMutation from "../../graphql/mutations/createCompletedDutyMutation";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const createCd = (landDuty, userId, createCompletedDuty) => {
  const { id: landDutyId } = landDuty;
  return createCompletedDuty({
    variables: {
      input: {
        landDutyId,
        userId,
        expiresAt: dayjs().add(7, "days"),
      }
    }
  });
};

const createVcd = (completedDutyId, createVerifiedCompletedDuty) => {
  return createVerifiedCompletedDuty({
    variables: {
      input: {
        completedDutyId,
        extension: 7
      }
    }
  });
};

  const handleConfirm = (landDuty, userId, onClose, createCompletedDuty, createVerifiedCompletedDuty) => {
            const { completedDuties } = landDuty;
            const previousCompletedDuties = completedDuties.length === 0;
            if (previousCompletedDuties) {
              createCd(landDuty, userId, createCompletedDuty)
                .then(_ => onClose())
                .catch(console.error);
            } else {
              const completedDutyId = completedDuties[0].id
              createVcd(completedDutyId, createVerifiedCompletedDuty)
                .then(_ => onClose())
                .catch(console.error);
            }
          }

export default function AlertDialog({ open, onClose, landDuty }) {
  const { duty, land } = landDuty;
  const { name: dutyName } = duty;
  const { user } = useContext(UserContext);
  const userId = getUserId(user);
  const [createVerifiedCompletedDuty] = useMutation(
    createVerifiedCompletedDutyMutation
  );
  const [createCompletedDuty] = useMutation(createCompletedDutyMutation);
  const handleClose = () => {};
  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      keepMounted
    >
      <DialogTitle id="foo">{dutyName} Verification</DialogTitle>
      <DialogContent>
        <DialogContentText id="dialog-verification">
          {`
        "By clicking confirm you are noting that this task \`${dutyName}\` does not require immediate attention and the due date can be extended one week"`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
        <Button
          onClick={() => handleConfirm(landDuty, userId, onClose, createCompletedDuty, createVerifiedCompletedDuty)}
          color="primary"
          autoFocus
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
 
