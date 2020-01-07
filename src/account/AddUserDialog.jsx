import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useMutation } from "react-apollo";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import createUserMutation from "../graphql/mutations/createUserMutation";
import Fade from "../animations/Fade";
import Divider from "@material-ui/core/Divider";
import { Formik } from "formik";
import * as Yup from "yup";
import Loading from "../components/Loading";
import { TextField, Button } from "@material-ui/core";

const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().required(),
  password: Yup.string().required()
});

const hasError = ({ data }) => {
  const { createUser } = data;
  const { errors } = createUser;
  if (errors.length) return true;
  return false;
};

const handleFormikSubmit = async (
  values,
  { close, setSubmitting, setErrors, setStatus, children, createUser }
) => {
  const { name, email, password } = values;

  createUser({
    variables: {
      input: {
        name,
        email,
        password
      }
    }
  })
    .then(e => {
      if (!hasError(e)) {
        close();
      }
    })
    .catch(e => console.error(e));
  return setSubmitting ? <Loading /> : { children };
};

const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  tf: {
    display: "block"
  }
}));

export default ({ open, close }) => {
  const [createUser] = useMutation(createUserMutation);
  const classes = useStyles();
  const initialValues = {
    name: "",
    email: "",
    password: ""
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, stuff) =>
        handleFormikSubmit(values, {
          ...stuff,
          close: close,
          createUser: createUser
        })
      }
    >
      {({ handleSubmit, isSubmitting, errors, values, handleChange }) => (
        <Modal
          className={classes.modal}
          open={open}
          onClose={close}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{ timeout: 500 }}
        >
          <Fade in={open}>
            <div className={classes.paper}>
              <h2 id="spring-modal-title">Create User</h2>
              <Divider />
              <TextField
                label="name"
                name="name"
                value={values.name}
                onChange={handleChange}
                className={classes.tf}
                inputProps={{ className: classes.tf }}
              />
              <TextField
                error={!!errors.email}
                label="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                className={classes.tf}
                inputProps={{ className: classes.tf }}
              />
              <TextField
                error={!!errors.password}
                label="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                className={classes.tf}
                inputProps={{ className: classes.tf }}
              />
              <Button onClick={handleSubmit}>Create User</Button>
            </div>
          </Fade>
        </Modal>
      )}
    </Formik>
  );
};
