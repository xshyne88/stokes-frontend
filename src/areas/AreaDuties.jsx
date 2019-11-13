import React from "react";
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

const useStyles = makeStyles(theme => ({
  root: {
    width: "100vw",
    backgroundColor: theme.palette.background.paper
  }
}));

const toggleChecked = id => console.log(id);

export default props => {
  const classes = useStyles();
  const [showInfoDialog, toggleInfoDialogue] = React.useState(false);
  const userLandDuty = false;

  return (
    <List className={classes.root}>
      {props.landDuties.map(landDuty => {
        const labelId = `checkbox-list-label-${landDuty.duty.id}`;

        return (
          <ListItem
            key={landDuty.id}
            dense
            button
            onClick={e => toggleChecked(landDuty.id)}
            style={{ width: "100vw" }}
          >
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={userLandDuty || false}
                disableRipple
                inputProps={{ "aria-labelledby": labelId }}
              />
            </ListItemIcon>
            <ListItemText id={labelId} primary={`${landDuty.duty.name}`} />
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
