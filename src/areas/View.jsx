import React from "react";
import { makeStyles } from "@material-ui/core/styles";
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
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  item: {
    minHeight: 50,
    display: "flex"
  }
}));

const completed = items => items.filter(i => !!i.activeCompletedDuty);
const incompleted = items => items.filter(i => !i.activeCompletedDuty);

export default ({ land }) => {
  const classes = useStyles();
  const [activeId, toggleInfoDialogue] = React.useState(false);

  const { landDuties } = land;
  return (
    <List className={classes.root}>
      <ListSubheader>Incomplete</ListSubheader>
      <Divider />
      {incompleted(landDuties).map(ld => {
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
      {completed(landDuties).map(ld => {
        const { duty } = ld;
        const { name: dutyName } = duty;
        const { activeCompletedDuty } = ld;
        const { lastCompletedBy, createdAt, expiresAt } = activeCompletedDuty;
        return (
          <ListItem key={ld.id} className={classes.item} icon={<InfoIcon />}>
            <ListItemText
              primary={
                <Typography style={{ textDecoration: "line-through" }}>
                  {dutyName}
                </Typography>
              }
              secondary={`by ${lastCompletedBy} on ${smallFormat(createdAt)}`}
            />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                style={{ marginBottom: 10 }}
                label={<div>Resets on</div>}
                value={smallFormat(expiresAt)}
                format="MMMM d yy"
              />
            </MuiPickersUtilsProvider>
          </ListItem>
        );
      })}
    </List>
  );
};
