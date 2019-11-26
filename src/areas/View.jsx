import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import DatePicker from "../components/DatePicker";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  item: {
    minHeight: 32,
    display: "flex"
  }
}));

const completed = items => items.filter(i => !!i.activeCompletedDuty);
const incompleted = items => items.filter(i => !i.activeCompletedDuty);

export default ({ land }) => {
  const classes = useStyles();
  const { landDuties } = land;
  return (
    <List className={classes.root}>
      <ListSubheader>Completed</ListSubheader>
      <Divider />
      {completed(landDuties).map(ld => {
        const { duty } = ld;
        const { name: dutyName } = duty;
        return (
          <>
            <ListItem key={ld.id} className={classes.item}>
              <Typography>{dutyName}</Typography>
              <ListItemSecondaryAction></ListItemSecondaryAction>
            </ListItem>
          </>
        );
      })}
      <ListSubheader>Incomplete</ListSubheader>
      <Divider />
      {incompleted(landDuties).map(ld => {
        const { duty } = ld;
        const { name: dutyName } = duty;
        return <ListItem key={ld.id}>{dutyName}</ListItem>;
      })}
    </List>
  );
};
