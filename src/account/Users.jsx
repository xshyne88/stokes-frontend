import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { useMutation } from "react-apollo";
import prune from "../prune";
import Loading from "../components/Loading";
import LoadError from "../components/LoadError";
import USERS_QUERY from "../graphql/queries/usersQuery";
import setPasswordMutation from "../graphql/mutations/setPasswordMutation";
import AddUserDialog from "./AddUserDialog";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import CancelIcon from "@material-ui/icons/Cancel";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Fab from "@material-ui/core/Fab";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  }
}));

export default () => {
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false
  });
  const classes = useStyles();
  const { error, data } = useQuery(USERS_QUERY);
  const [setPassword] = useMutation(setPasswordMutation);
  const [activeId, setActiveId] = useState(0);
  const [addUserDialog, toggleAddUserDialog] = useState(false);
  if (error) return <LoadError />;
  if (!data) return <Loading />;
  const { users } = prune(data);

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };
  return (
    <div className={classes.root}>
      <Fab
        variant="extended"
        aria-label="like"
        className={classes.fab}
        onClick={() => toggleAddUserDialog(true)}
        onClose={() => toggleAddUserDialog(false)}
      >
        <AddIcon className={classes.extendedIcon} />
        Add User
      </Fab>
      <AddUserDialog
        open={addUserDialog}
        close={() => toggleAddUserDialog(false)}
      />
      <List>
        {users.map(user => (
          <ListItem key={user.email}>
            <ListItemText>{user.name}</ListItemText>
            {activeId === user.id ? (
              <>
                <InputLabel htmlFor="standard-adornment-password">
                  {`New Password: `}
                </InputLabel>
                <Input
                  id={user.id}
                  type={values.showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={handleChange("password")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {values.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                      <IconButton size="small">
                        <CancelIcon
                          onClick={_ => {
                            setActiveId(0);
                            setValues({ ...values, password: "" });
                          }}
                        />
                      </IconButton>
                      <IconButton size="small">
                        <CheckCircleIcon
                          onClick={_ => {
                            setPassword({
                              variables: {
                                input: {
                                  userId: user.id,
                                  newPassword: values.password
                                }
                              }
                            })
                              .then(e => setActiveId(0))
                              .catch(e => console.error(e));
                          }}
                        />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </>
            ) : (
              <Fab
                variant="extended"
                aria-label="like"
                className={classes.fab}
                onClick={_ => {
                  setActiveId(user.id);
                  setValues({ ...values, password: "" });
                }}
              >
                <EditIcon className={classes.extendedIcon} />
                Change Pwd
              </Fab>
            )}
          </ListItem>
        ))}
      </List>
    </div>
  );
};
