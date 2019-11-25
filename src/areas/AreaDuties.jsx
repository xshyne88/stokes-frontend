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
import { getUserId } from "../helpers";
import { defaultFormat } from "../components/DateDisplay";
import deleteCompletedDutyMutation from "../graphql/mutations/deleteCompletedDutyMutation";
import createCompletedDutyMutation from "../graphql/mutations/createCompletedDutyMutation";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  addCircle: {
    position: "sticky",
    height: 40,
    width: 40,
    top: 30
  },
  listItem: {
    width: "100%"
  },
  checked: {
    textDecoration: "line-through"
  },
  italic: {}
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
        userId
      }
    }
  });

export default props => {
  const { landDuties } = props;
  const { user } = useContext(UserContext);
  const userId = getUserId(user);
  const classes = useStyles();
  const [activeId, toggleInfoDialogue] = React.useState(false);
  const [createcompletedDuty] = useMutation(createCompletedDutyMutation);
  const [deletecompletedDuty] = useMutation(deleteCompletedDutyMutation);
  return (
    <List className={classes.root}>
      {landDuties.map(landDuty => {
        const { id, duty, activeCompletedDuty } = landDuty;
        const { name, description } = duty;
        const completed = !!activeCompletedDuty;
        return (
          <ListItem
            key={id}
            className={classes.listItem}
            dense
            button
            onClick={e =>
              completed
                ? unCheckMutation(deletecompletedDuty, activeCompletedDuty.id)
                : checkMutation(createcompletedDuty, landDuty.id, userId)
            }
          >
            <ListItemIcon>
              <Checkbox edge="start" checked={completed} disableRipple />
            </ListItemIcon>
            <TaskName
              landDutyId={id}
              shouldLineThrough={!!activeCompletedDuty}
              className={classes.checked}
              name={name}
            />
            <CompletedBy activeCompletedDuty={activeCompletedDuty} id={id} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="comments" />
              <InfoIcon onClick={e => toggleInfoDialogue(landDuty.id)} />
              <AreaDutyDescriptionDialog
                open={activeId === landDuty.id}
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

const completedByStyles = {
  fontStyle: "italic"
};

const CompletedBy = ({ activeCompletedDuty, id }) =>
  activeCompletedDuty && (
    <ListItemText id={id} style={completedByStyles}>
      <div>{`Expires at ${defaultFormat(activeCompletedDuty.expiresAt)}`}</div>
    </ListItemText>
  );

const TaskName = ({ shouldLineThrough, className, name, landDutyId }) => {
  return (
    <ListItemText id={landDutyId}>
      <div className={shouldLineThrough ? className : undefined}>{name}</div>
    </ListItemText>
  );
};
