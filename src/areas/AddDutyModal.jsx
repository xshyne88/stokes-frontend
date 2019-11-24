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
import Loading from "./Loading";
import { TextField, Button } from "@material-ui/core";

const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  description: Yup.string(),
  estimatedDays: Yup.number()
});

const handleFormikSubmit = async (
  values,
  { setSubmitting, setErrors, setStatus, children }
) => {
  const { name, description, estimatedDays, mutation } = values;
  console.log(values);

  const result = await mutation({
    variables: {
      input: {
        name,
        description,
        estimatedDays
      }
    }
  });
  console.log(result);
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
  // const createDuty => ({
  //   variables: { input: { name: "stuff", description: "mo stuff" } }
  // });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleFormikSubmit}
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
                // onBlur={handleBlur}
                // helperText={
                //   errors.name && touched.name && errors.name
                // }
              />
              <TextField
                error={errors.description}
                label="description"
                name="description"
                value={values.description}
                onChange={handleChange}
                className={classes.tf}
                inputProps={{ className: classes.tf }}
                // onBlur={handleBlur}
                // helperText={errors.description && touched.description && errors.description}
              />
              <Button onClick={handleSubmit}>Add Task</Button>
            </div>
          </Fade>
        </Modal>
      )}
    </Formik>
  );
};
