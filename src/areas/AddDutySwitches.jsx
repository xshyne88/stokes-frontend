import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { Box, Typography, Button } from "@material-ui/core";
import Switch from "@material-ui/core/Switch";
import { useQuery, useMutation } from "react-apollo";
import prune from "../prune";
import dutiesQuery from "../graphql/queries/dutiesQuery";
import Loading from "../components/Loading";
import deleteLandDutyMutation from "../graphql/mutations/deleteLandDutyMutation";
import createLandDutyMutation from "../graphql/mutations/createLandDutyMutation";
import AddDutyModal from "./AddDutyModal";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    height: 50
  },
  grid: {
    width: "100%"
  }
}));

const dutyKey = (duty, idx) => `${duty.name} + ${idx} + ${duty.id}`;
const dutyIsOnLand = (duty, landDuties) =>
  landDuties.find(ld => ld.duty.id === duty.id);

export default ({ land }) => {
  const classes = useStyles();
  const [createLandDuty] = useMutation(createLandDutyMutation);
  const [deleteLandDuty] = useMutation(deleteLandDutyMutation);
  const [openModal, toggleAddDutyModal] = useState(false);
  const { loading, error, data } = useQuery(dutiesQuery);
  if (error || loading) return <Loading />;
  const { landDuties } = land;
  const duties = (data && prune(data.duties)) || [];

  return (
    <Container className={classes.root}>
      <Grid className={classes.grid}>
        {duties.map((duty, idx) => {
          const maybeLandDuty = dutyIsOnLand(duty, landDuties);
          return (
            <Paper className={classes.paper} key={dutyKey(duty, idx)}>
              <Box display="flex" justifyContent="flex-end" textAlign="center">
                <Box flexGrow={1}>
                  <Typography>{duty.name}</Typography>
                </Box>
                <Box flexGrow={1} />
                <Box flexGrow={1} style={{ marginLeft: "auto" }}></Box>
                <Switch
                  checked={!!maybeLandDuty}
                  onChange={() => {
                    console.log(maybeLandDuty);
                    maybeLandDuty
                      ? deleteLandDuty({
                          variables: {
                            input: {
                              landDutyId: maybeLandDuty.id
                            }
                          }
                        })
                      : createLandDuty({
                          variables: {
                            input: { landId: land.id, dutyId: duty.id }
                          }
                        });
                  }}
                  value="checkedB"
                  color="primary"
                />
              </Box>
            </Paper>
          );
        })}
      </Grid>
      <Button onClick={() => toggleAddDutyModal(true)}>Add Task</Button>
      <AddDutyModal open={openModal} close={() => toggleAddDutyModal(false)} />
    </Container>
  );
};
