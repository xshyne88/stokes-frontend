import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import AreaDutyDescriptionDialog from "./AreaDutyDescriptionDialog";
import { UserContext } from "../UserProvider";
import { useMutation } from "react-apollo";
import { getISONow } from "../helpers";
import DeleteUserLandDutyMutation from "./DeleteUserLandDutyMutation";
import CreateUserLandDutyMutation from "./CreateUserLandDutyMutation";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100vw",
    backgroundColor: theme.palette.background.paper
  }
}));

export default props => {
  const { user } = useContext(UserContext);
  const classes = useStyles();
  const [showInfoDialog, toggleInfoDialogue] = React.useState(false);
  const [checked, toggleChecked] = React.useState(false);
  const [createUserLandDuty] = useMutation(CreateUserLandDutyMutation);
  const [deleteUserLandDuty] = useMutation(DeleteUserLandDutyMutation);

  return (
    <List className={classes.root}>
      {props.landDuties.map(landDuty => {
        const dutyId = landDuty.duty.id;
        const whatever =
          landDuty.userLandDuties.length &&
          landDuty.userLandDuties.find(f => f.landDuty.duty.id === dutyId);
        console.log(landDuty);
        console.log(whatever);

        // const isCompletedDuty = landDuty.userLandDuties.find(
        // u => u.landDuty.duty.id === landDuty.duty.id
        // );
        return (
          <ListItem
            key={landDuty.id}
            dense
            button
            onClick={e => {
              false
                ? deleteUserLandDuty({
                    variables: {
                      // userLandDutyId: isCompletedDuty
                    }
                  })
                : createUserLandDuty({
                    variables: {
                      input: {
                        landDutyId: landDuty.id,
                        userId: JSON.parse(user).id,
                        completedAt: getISONow()
                      }
                    }
                  })
                    .then(r => {
                      toggleChecked(true);
                      console.log(r);
                    })
                    .catch(e => console.error(e));
            }}
            style={{ width: "100vw" }}
          >
            <ListItemIcon>
              {checked ? (
                <Checkbox
                  edge="start"
                  checked
                  disableRipple
                  inputProps={{ "aria-labelledby": landDuty.id }}
                />
              ) : (
                <div />
              )}
            </ListItemIcon>
            <ListItemText id={landDuty.id} primary={`${landDuty.duty.name}`} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="comments" />
              <InfoIcon onClick={e => toggleInfoDialogue(true)} />
              <AreaDutyDescriptionDialog
                open={showInfoDialog}
                onClose={() => toggleInfoDialogue(false)}
                title={landDuty.duty.name}
                content={landDuty.duty.description}
              />
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
};
