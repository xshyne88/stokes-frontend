import React from "react";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import { IconButton } from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import AreaDutyDescriptionDialog from "./dialogs/AreaDutyDescriptionDialog";
import { smallFormat } from "../components/DateDisplay";
import ExpirationDatePicker from "./ExpirationDatePicker";

const completed = items => items.filter(i => !!i.activeCompletedDuty);
const incompleted = items => items.filter(i => !i.activeCompletedDuty);

export default ({ land, toggleDialog }) => {
  const [activeId, toggleInfoDialogue] = React.useState(false);
  const { landDuties } = land;
  const incompletedDuties = incompleted(landDuties);
  const completedDuties = completed(landDuties);
  return (
    <List style={{ width: "100%" }}>
      <ListSubheader>Incomplete</ListSubheader>
      <Divider />
      {incompletedDuties.map(ld => {
        const { duty, id: landDutyId } = ld;
        const { name: dutyName, description } = duty;
        return (
          <ListItem key={ld.id}>
            <ListItemText primary={dutyName} />
            <ListItemSecondaryAction>
              <IconButton
                aria-label="comments"
                onClick={e => toggleInfoDialogue(landDutyId)}
              >
                <InfoIcon />
              </IconButton>
              <AreaDutyDescriptionDialog
                open={activeId === landDutyId}
                onClose={() => toggleInfoDialogue(false)}
                title={dutyName}
                content={description}
              />
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
      <ListSubheader>Completed</ListSubheader>
      <Divider />
      {completedDuties.map(ld => {
        const { duty } = ld;
        const { name: dutyName } = duty;
        const { activeCompletedDuty } = ld;
        const { user, createdAt, expiresAt } = activeCompletedDuty;

        const { name: userName } = user;

        return (
          <ListItem
            key={ld.id}
            style={{ minHeight: 50, display: "flex" }}
            icon={<InfoIcon />}
          >
            <ListItemText
              primary={
                <Typography style={{ textDecoration: "line-through" }}>
                  {dutyName}
                </Typography>
              }
              secondary={`by ${userName} on ${smallFormat(createdAt)}`}
            />
            <ExpirationDatePicker
              expiresAt={expiresAt}
              completedDutyId={activeCompletedDuty.id}
            />
          </ListItem>
        );
      })}
    </List>
  );
};
