import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    marginTop: 12
  },
  noteText: {
    marginLeft: 12,
    fontSize: 8
  }
}));

export default ({ landDuties }) => {
  const classes = useStyles();
  console.log(landDuties);

  return (
    <>
      <Fab variant="Add Note" aria-label="like" className={classes.fab}>
        <AddIcon className={classes.extendedIcon} />
        Add Note
      </Fab>
      <List className={classes.root}>
        <ListItem>
          <Card className={classes.root}>
            <CardHeader
              title={<ListItemText primary="Photos" secondary="Jan 9, 2014" />}
            />
            <CardContent>
              <Typography>
                blah kfeajno'ilfanef awfe feawk'fnawe'kf awfeawen'fn
                afenawfekalwe fnafnea;wlefanefa fekawefn a;fefew
              </Typography>
            </CardContent>
          </Card>
        </ListItem>
      </List>
    </>
  );
};
