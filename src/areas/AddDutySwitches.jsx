import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { Box, Typography, Button } from "@material-ui/core";
import Switch from "@material-ui/core/Switch";
import { useQuery, useMutation } from "react-apollo";
import prune from "../prune";
import dutiesQuery from "../graphql/queries/dutiesQuery";
import AreasLoading from "./AreasLoading";
import createDutyMutation from "../graphql/mutations/createDutyMutation";

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

export default ({ land }) => {
  const classes = useStyles();
  const [createDuty] = useMutation(createDutyMutation);
  const { loading, error, data } = useQuery(dutiesQuery);
  if (error || loading) return <AreasLoading />;
  const { landDuties } = land;
  const duties = (data && prune(data.duties)) || [];

  return (
    <Container className={classes.root}>
      <Grid className={classes.grid}>
        {duties.map((duty, idx) => (
          <Paper className={classes.paper} key={`${duty.name} + ${duty.idx}`}>
            <Box display="flex" justifyContent="flex-end" textAlign="center">
              <Box flexGrow={1}>
                <Typography>{duty.name}</Typography>
              </Box>
              <Box flexGrow={1} />
              <Box flexGrow={1} style={{ marginLeft: "auto" }}></Box>
              <Switch
                checked={true}
                onChange={() => null}
                value="checkedB"
                color="primary"
              />
            </Box>
          </Paper>
        ))}
      </Grid>
      <Button
        onClick={() =>
          createDuty({
            variables: { input: { name: "stuff", description: "mo stuff" } }
          })
        }
      >
        Add Duty
      </Button>
    </Container>
  );
};
