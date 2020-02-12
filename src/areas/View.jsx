import React from "react";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import { IconButton, ButtonGroup } from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import AreaDutyDescriptionDialog from "./dialogs/AreaDutyDescriptionDialog";
import { smallFormat } from "../components/DateDisplay";
import ExpirationDialog from "./dialogs/ExpirationDialog";
import VerifyDialog from "./dialogs/VerifyDialog";
import LogDialog from "./dialogs/LogDialog";
import VerifyIcon from "@material-ui/icons/BorderColor";
import HistoryIcon from "@material-ui/icons/History";

const completed = items => items.filter(i => !!i.activeCompletedDuty);
const incompleted = items => items.filter(i => !i.activeCompletedDuty);
const Secondary = ({ ld }) => (
  <>
    <i>{`Every ${ld.duty.estimatedDays} days`}</i>
  </>
);
export default ({ land, toggleDialog }) => {
  const [infoId, toggleInfoDialog] = React.useState(false);
  const [logId, toggleLogDialog] = React.useState(false);
  const [verifyId, toggleVerifyDialog] = React.useState(false);
  const { landDuties } = land;
  const incompletedDuties = incompleted(landDuties);
  const completedDuties = completed(landDuties);
  return (
    <List style={{ width: "100%", padding: 0, margin: 0 }}>
      <ListSubheader>Incomplete</ListSubheader>
      <Divider style={{ backgroundColor: "red" }} />
      {incompletedDuties.map(ld => {
        const { duty, id: landDutyId } = ld;
        const { name: dutyName, description } = duty;
        return (
          <ListItem key={ld.id}>
            <ListItemText
              primary={<div>{dutyName}</div>}
              secondary={<Secondary ld={ld} />}
              onClick={e => toggleInfoDialog(landDutyId)}
            />
            <ListItemSecondaryAction>
              <ButtonGroup>
                <IconButton
                  aria-label="info"
                  onClick={e => toggleLogDialog(landDutyId)}
                >
                  <HistoryIcon />
                </IconButton>
                <IconButton
                  aria-label="info"
                  onClick={e => toggleVerifyDialog(landDutyId)}
                >
                  <VerifyIcon />
                </IconButton>
              </ButtonGroup>
              <AreaDutyDescriptionDialog
                open={infoId === landDutyId}
                onClose={() => toggleInfoDialog(false)}
                title={dutyName}
                content={description}
              />
              <LogDialog
                open={logId === landDutyId}
                onClose={() => toggleLogDialog(false)}
                landDuty={ld}
              />
              <VerifyDialog
                open={verifyId === landDutyId}
                onClose={() => toggleVerifyDialog(false)}
                landDuty={ld}
              />
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
      <ListSubheader>Completed</ListSubheader>
      <Divider style={{ backgroundColor: "green" }} />
      {completedDuties.map(ld => {
        const { duty, id: landDutyId } = ld;
        const { name: dutyName } = duty;
        const { activeCompletedDuty } = ld;
        const { user, createdAt } = activeCompletedDuty;
        const { name: userName } = user;
        return (
          <ListItem key={ld.id} style={listItemStyles} icon={<InfoIcon />}>
            <ListItemText
              primary={
                <Typography style={typographyStyles}>{dutyName}</Typography>
              }
              secondary={`by ${userName} on ${smallFormat(createdAt)}`}
            />
            <ListItemSecondaryAction>
              <ButtonGroup>
                <IconButton
                  aria-label="info"
                  onClick={e => toggleLogDialog(landDutyId)}
                >
                  <HistoryIcon />
                </IconButton>
              </ButtonGroup>

              <LogDialog
                open={logId === landDutyId}
                onClose={() => toggleLogDialog(false)}
                landDuty={ld}
              />
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
};

const typographyStyles = {
  textDecoration: "line-through"
};

const listItemStyles = {
  minHeight: 50,
  display: "flex"
};

// const DutyExpansionPanel = ({ landDuty }) => {
//   const { duty, id: landDutyId } = landDuty;
//   const { name: dutyName, description } = duty;
//   return (
//     <ExpansionPanel>
//       <ExpansionPanelSummary
//         expandIcon={<ExpandMoreIcon />}
//         aria-controls="panel1a-content"
//         id={landDutyId}
//       >
//         <Typography>{dutyName}</Typography>
//       </ExpansionPanelSummary>
//       <ExpansionPanelDetails>
//         <Typography>{description}</Typography>
//       </ExpansionPanelDetails>
//     </ExpansionPanel>
//   );
// };

/* <ExpirationDialog
      open={logId === landDutyId}
      onClose={() => toggleInfoDialog(false)}
      title={dutyName}
      activeCompletedDuty={activeCompletedDuty}
    ></ExpirationDialog> */
