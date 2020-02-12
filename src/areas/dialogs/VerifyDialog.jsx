import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Slide from "@material-ui/core/Slide";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useMutation } from "react-apollo";
import createVerifiedCompletedDutyMutation from "../../graphql/mutations/createVerifiedCompletedDutyMutation";
import createCompletedDutyMutation from "../../graphql/mutations/createCompletedDutyMutation";
import { getUserId } from "../../helpers";
import { UserContext } from "../../UserProvider";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const createCd = (landDuty, userId, createCompletedDuty) => {
  const { id: landDutyId } = landDuty;
  return createCompletedDuty({
    variables: {
      input: {
        landDutyId,
        userId
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

export default function AlertDialog({ open, onClose, landDuty }) {
  const { duty, land } = landDuty;
  const { name: dutyName } = duty;
  const { user } = useContext(UserContext);
  const userId = getUserId(user);
  const [createVerifiedCompletedDuty] = useMutation(
    createVerifiedCompletedDutyMutation
  );
  const [createCompletedDuty] = useMutation(createCompletedDutyMutation);
  console.log(landDuty);
  const handleClose = () => {};
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      keepMounted
    >
      <DialogTitle id="foo">{dutyName} Verification</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {`By clicking confirm you are moving the task \`${dutyName}\` to the completed section.`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
        <Button
          onClick={() => {
            const { completedDuties } = landDuty;
            const previousCompletedDuties = completedDuties.length === 0;
            if (previousCompletedDuties) {
              createCd(landDuty, userId, createCompletedDuty)
                .then(_ => onClose())
                .catch(console.error);
            } else {
              createVcd(completedDuties[0].id, createVerifiedCompletedDuty)
                .then(_ => onClose())
                .catch(console.error);
            }
          }}
          color="primary"
          autoFocus
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
