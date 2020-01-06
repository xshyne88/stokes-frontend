import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FabButton from "../components/FabButton";
import List from "@material-ui/core/List";
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
    doCreateLandNote(land, textInput, toggleAddNote, createLandNote);
  };
  return (
    <>
      {showTextField ? (
        <AddNoteUI
          className={classes.root}
          land={land}
          textInput={textInput}
          handleChange={handleChange}
          handleCreateNote={handleCreateNote}
        />
      ) : (
        <FabButton
          onClick={() => toggleAddNote(true)}
          text={"Create New Note"}
        />
      )}
      <List className={classes.root}>
        {notes &&
          notes.map(n => (
            <ListItem key={n.id}>
              <Card className={classes.root}>
                <CardHeader
                  title={
                    <ListItemText
                      primary={n.createdBy.name || n.createdBy.email}
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

const AddNoteUI = ({
  land,
  textInput,
  handleChange,
  handleCreateNote,
  className
}) => (
  <>
    <TextField
      className={className}
      style={{ width: "100%" }}
      id="outlined-multiline-flexible"
      label={`Note for ${land.name}`}
      multiline
      rowsMax="10"
      value={textInput}
      onChange={handleChange}
      margin="normal"
      variant="outlined"
    />
    <FabButton onClick={handleCreateNote} text={"Add Note"} />
  </>
);

const doCreateLandNote = (land, textInput, toggleAddNote, createLandNote) => {
  createLandNote({
    variables: { input: { landId: land.id, body: textInput } }
  })
    .then(e => toggleAddNote(false))
    .catch(e => console.error(e));
};
