import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import List from "@material-ui/core/List";
import Button from "@material-ui/core/Button";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import dayjs from "dayjs";
import prune from "../prune";
import createLandNoteMutation from "../graphql/mutations/createLandNoteMutation";
import { useMutation } from "react-apollo";
import TextField from "@material-ui/core/TextField";

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

export default ({ land }) => {
  const [createLandNote] = useMutation(createLandNoteMutation);
  const [showTextField, toggleAddNote] = useState(false);
  const [textInput, changeText] = useState("");
  const classes = useStyles();
  const { notes } = prune(land);
  const handleChange = e => changeText(e.target.value);
  const handleCreateNote = () => {
    if (textInput === "") return;
    createLandNote({
      variables: { input: { landId: land.id, body: textInput } }
    })
      .then(e => toggleAddNote(false))
      .catch(e => console.error(e));
  };
  console.log(showTextField);
  return (
    <>
      {showTextField ? (
        <>
          <TextField
            style={{ width: "100%" }}
            id="outlined-multiline-flexible"
            label={`Note for ${land.name}`}
            multiline
            rowsMax="10"
            value={textInput}
            onChange={handleChange}
            className={classes.textField}
            margin="normal"
            variant="outlined"
          />
          <Button onClick={handleCreateNote}>Add Note</Button>
        </>
      ) : (
        <Fab
          variant="extended"
          aria-label="like"
          className={classes.fab}
          onClick={() => toggleAddNote(true)}
        >
          <AddIcon className={classes.extendedIcon} />
          Add Note
        </Fab>
      )}
      <List className={classes.root}>
        {notes &&
          notes.map(n => (
            <ListItem>
              <Card className={classes.root}>
                <CardHeader
                  title={
                    <ListItemText
                      primary={n.createdBy.name}
                      secondary={dayjs(n.createdAt).format("MMM DD YYYY")}
                    />
                  }
                />
                <CardContent>
                  <Typography>{n.body}</Typography>
                </CardContent>
              </Card>
            </ListItem>
          ))}
      </List>
    </>
  );
};
