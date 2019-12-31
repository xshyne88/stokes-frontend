/* eslint-disable react/prop-types */
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import createDutyMutation from "../graphql/mutations/createDutyMutation";
import { useMutation } from "react-apollo";
import Fade from "../animations/Fade";
import Divider from "@material-ui/core/Divider";
import { Formik } from "formik";
import * as Yup from "yup";
import Loading from "../components/Loading";
import { TextField, Button } from "@material-ui/core";

const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  description: Yup.string(),
  estimatedDays: Yup.number()
});

const handleFormikSubmit = async (
  values,
  { close, setSubmitting, setErrors, setStatus, children }
) => {
  const { name, description, estimatedDays, mutation } = values;

  mutation({
    variables: {
      input: {
        name,
        description,
        estimatedDays
      }
    }
  })
    .then(e => close())
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
  const [createDuty] = useMutation(createDutyMutation);
  const classes = useStyles();
  const initialValues = {
    name: "",
    description: "",
    estimatedDays: 14,
    mutation: createDuty
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, stuff) =>
        handleFormikSubmit(values, { ...stuff, close: close })
      }
    >
      {({ handleSubmit, isSubmitting, errors, values, handleChange }) => (
        <Modal
          className={classes.modal}
          open={open}
          onClose={close}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500
          }}
        >
          <Fade in={open}>
            <div className={classes.paper}>
              <h2 id="spring-modal-title">Add Task</h2>
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
                error={errors.description}
                label="description"
                name="description"
                value={values.description}
                onChange={handleChange}
                className={classes.tf}
                inputProps={{ className: classes.tf }}
              />
              <Button onClick={handleSubmit}>Add Task</Button>
            </div>
          </Fade>
        </Modal>
      )}
    </Formik>
  );
};
