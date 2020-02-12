import React, { useState, useContext } from "react";
import ExpirationDatePicker from "../ExpirationDatePicker";
import {
  Dialog,
  Typography,
  DialogContent,
  DialogTitle,
  Slide,
  Divider,
  Button
} from "@material-ui/core";
import { useMutation } from "react-apollo";
import VerifiedIcon from "@material-ui/icons/AssignmentTurnedIn";
import EditIcon from "@material-ui/icons/Edit";
import Fab from "@material-ui/core/Fab";
import { UserContext } from "../../UserProvider";
import dayjs from "dayjs";
import createVerifiedCompletedDutyMutation from "../../graphql/mutations/createVerifiedCompletedDutyMutation";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const formatDate = date => date.format("MMMM D YY");

export default ({ activeCompletedDuty, onClose, open, title }) => {
  const [showDatePicker, toggleDatePicker] = useState(false);
  const { expiresAt, id: completedDutyId } = activeCompletedDuty;
  const [cvcd] = useMutation(createVerifiedCompletedDutyMutation);
  const { user } = useContext(UserContext);
  const { isAdmin: admin } = user;
  const expiresAtDate = formatDate(dayjs(expiresAt));
  const oneWeekLater = formatDate(dayjs(expiresAt).add(7, "day"));
  return (
    <Dialog
      open={open}
      onClose={e => onClose()}
      TransitionComponent={Transition}
      keepMounted
    >
      <DialogTitle>
        <Typography>{title}</Typography>
        <div style={{ display: "flex" }}>
          <Typography style={subTitleStyle} onClick={e => {}}>
            Resets on {expiresAtDate}
          </Typography>
        </div>
      </DialogTitle>
      <Divider />
      <DialogContent>
        {admin && (
          <>
            <Fab
              size="small"
              variant="extended"
              style={buttonStyles}
              onClick={_ => toggleDatePicker(!showDatePicker)}
            >
              <EditIcon style={{ marginRight: 10 }} />
              Edit Reset Date
            </Fab>
            {showDatePicker && (
              <ExpirationDatePicker
                expiresAt={expiresAt}
                completedDutyId={completedDutyId}
              />
            )}
          </>
        )}
        <VerificationDescription
          expiresAt={expiresAtDate}
          oneWeekLater={oneWeekLater}
          title={title}
        />
        <Fab
          size="small"
          variant="extended"
          style={buttonStyles}
          onClick={_ => {
            cvcd({
              variables: {
                input: {
                  extension: 7,
                  completedDutyId
                }
              }
            })
              .then(e => {})
              .catch(err => console.error(err));
          }}
        >
          <VerifiedIcon style={{ marginRight: 10 }} />
          Verify Complete
        </Fab>
        <History
          activeCompletedDuty={activeCompletedDuty}
          title={title}
          expiresAtDate={expiresAtDate}
        />
      </DialogContent>
      <Button onClick={e => onClose()}>Close</Button>
    </Dialog>
  );
};

const buttonStyles = {
  width: "100%",
  marginBottom: 25,

  marginTop: 10
};

const subTitleStyle = {
  color: "rgba(0,0,0,0.54)",
  fontWeight: 400,
  fontSize: 13
};

const History = ({ activeCompletedDuty, title, expiresAtDate }) => {
  const { createdAt, user } = activeCompletedDuty;
  return (
    <div>
      <b>
        History for the task <i>{title}</i>
      </b>
      <br />
      <Divider />
      <br />
      Completion by {upperCase(user.email)} ..... on{" "}
      {formatDate(dayjs(createdAt))}
      {activeCompletedDuty.verifiedCompletedDuties.map(v => (
        <div key={v.id}>
          Verified by {upperCase(v.user.email)} ..... on{" "}
          {formatDate(dayjs(v.createdAt))}
        </div>
      ))}
      <Divider />
      <br />
      <div>Current reset date: {expiresAtDate}</div>
    </div>
  );
};

const upperCase = lower => lower.charAt(0).toUpperCase() + lower.substring(1);

const VerificationDescription = ({ title, expiresAt, oneWeekLater }) => (
  <div>
    Verify complete indicates that the task{" "}
    <i>
      <b>{title}</b>
    </i>{" "}
    does not need to be completed for seven more days after the current reset
    date.
    <br />
    <br />
    <div style={subTitleStyle}>Preview</div>
    <div style={{ display: "flex" }}>
      <div>
        {expiresAt} {" ------> "}
      </div>
      <div>&nbsp;{` ${oneWeekLater}`}</div>
    </div>
  </div>
);
