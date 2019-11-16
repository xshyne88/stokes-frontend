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
import AreaDutyDescriptionDialog from "./dialogs/AreaDutyDescriptionDialog";
import { UserContext } from "../UserProvider";
import { useMutation } from "react-apollo";
import { getISONow, getUserId } from "../helpers";
import deleteCompletedDutyMutation from "../graphql/mutations/deleteCompletedDutyMutation";
import createCompletedDutyMutation from "../graphql/mutations/createCompletedDutyMutation";

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
  },
  listItem: {
    width: "100vw"
  },
  checked: {
    textDecoration: "line-through"
  }
}));

const unCheckMutation = (deletecompletedDuty, completedDutyId) =>
  deletecompletedDuty({
    variables: {
      input: {
        completedDutyId: completedDutyId
      }
    }
  });

const checkMutation = (createcompletedDuty, landDutyId, userId) =>
  createcompletedDuty({
    variables: {
      input: {
        landDutyId,
        userId,
        completedAt: getISONow()
      }
    }
  });

const findLandDuty = landDuty =>
  landDuty.completedDuties.length &&
  landDuty.completedDuties.find(f => f.landDuty.id === landDuty.id);

export default props => {
  const { user } = useContext(UserContext);
  const userId = getUserId(user);
  const classes = useStyles();
  const [showInfoDialog, toggleInfoDialogue] = React.useState(false);
  const [createcompletedDuty] = useMutation(createCompletedDutyMutation);
  const [deletecompletedDuty] = useMutation(deleteCompletedDutyMutation);

  return (
    <List className={classes.root}>
      {props.landDuties.map(landDuty => {
        const { id, duty } = landDuty;
        const { name, description } = duty;
        const completedDuty = findLandDuty(landDuty);

        return (
          <ListItem
            key={id}
            className={classes.listItem}
            dense
            button
            onClick={e =>
              completedDuty
                ? unCheckMutation(deletecompletedDuty, completedDuty.id)
                : checkMutation(createcompletedDuty, landDuty.id, userId)
            }
          >
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={!!completedDuty}
                disableRipple
                inputProps={{ "aria-labelledby": landDuty.id }}
              />
            </ListItemIcon>
            <ListItemText id={id} style={{ lineDecoration: "line-through" }}>
              <div className={completedDuty ? classes.checked : undefined}>
                {name}
              </div>
            </ListItemText>
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="comments" />
              <InfoIcon onClick={e => toggleInfoDialogue(true)} />
              <AreaDutyDescriptionDialog
                open={showInfoDialog}
                onClose={() => toggleInfoDialogue(false)}
                title={landDuty.duty.name}
                content={description}
              />
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
};
