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
import { getISONow, getUserId } from "../helpers";
import DeleteUserLandDutyMutation from "../graphql/mutations/deleteUserLandDutyMutation";
import CreateUserLandDutyMutation from "../graphql/mutations/creatUserLandDutyMutation";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100vw",
    backgroundColor: theme.palette.background.paper
  },
  addCircle: {
    position: "sticky",
    height: 40,
    width: 40,
    top: 30
  }
}));

const unCheckMutation = (deleteUserLandDuty, userLandDutyId) =>
  deleteUserLandDuty({
    variables: {
      input: {
        userLandDutyId: userLandDutyId
      }
    }
  });

const checkMutation = (createUserLandDuty, landDutyId, userId) =>
  createUserLandDuty({
    variables: {
      input: {
        landDutyId,
        userId,
        completedAt: getISONow()
      }
    }
  });

const findLandDuty = landDuty =>
  landDuty.userLandDuties.length &&
  landDuty.userLandDuties.find(f => f.landDuty.id === landDuty.id);

export default props => {
  const { user } = useContext(UserContext);
  const userId = getUserId(user);
  const classes = useStyles();
  const [showInfoDialog, toggleInfoDialogue] = React.useState(false);
  const [createUserLandDuty] = useMutation(CreateUserLandDutyMutation);
  const [deleteUserLandDuty] = useMutation(DeleteUserLandDutyMutation);

  return (
    <List className={classes.root}>
      {props.landDuties.map(landDuty => {
        const userLandDuty = findLandDuty(landDuty);

        return (
          <ListItem
            key={landDuty.id}
            dense
            button
            onClick={e =>
              userLandDuty
                ? unCheckMutation(deleteUserLandDuty, userLandDuty.id)
                : checkMutation(createUserLandDuty, landDuty.id, userId)
            }
            style={{ width: "100vw" }}
          >
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={!!userLandDuty}
                disableRipple
                inputProps={{ "aria-labelledby": landDuty.id }}
              />
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
