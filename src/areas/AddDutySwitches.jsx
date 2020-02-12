import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Container from "@material-ui/core/Container";
import { Box, Typography } from "@material-ui/core";
import Switch from "@material-ui/core/Switch";
import { useQuery, useMutation } from "react-apollo";
import prune from "../prune";
import dutiesQuery from "../graphql/queries/dutiesQuery";
import Loading from "../components/Loading";
import deleteLandDutyMutation from "../graphql/mutations/deleteLandDutyMutation";
import createLandDutyMutation from "../graphql/mutations/createLandDutyMutation";
import updateDutyMutation from "../graphql/mutations/updateDutyMutation";
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
  activePaper: {
    border: "solid 2px blue",
    padding: theme.spacing(1),
    textAlign: "center",
    height: 50
  },
  grid: {
    width: "100%"
  },
  marginLeftBox: {
    marginLeft: "auto"
  },
  dutyLinkActive: {
    textDecoration: "underline",
    color: "purple",
    cursor: "pointer"
  },
  dutyLink: {
    textDecoration: "underline",
    color: "blue",
    cursor: "pointer"
  }
}));

const dutyKey = (duty, idx) => `${duty.name} + ${idx} + ${duty.id}`;
const dutyIsOnLand = (duty, landDuties) =>
  landDuties.find(ld => ld.duty.id === duty.id);

export default ({ land }) => {
  const dayArray = possibleDays();
  const classes = useStyles();
  const [createLandDuty] = useMutation(createLandDutyMutation);
  const [deleteLandDuty] = useMutation(deleteLandDutyMutation);
  const [updateDuty] = useMutation(updateDutyMutation);
  const [selectedDuty, selectDuty] = useState(false);
  const [openModal, toggleAddDutyModal] = useState(false);
  const { loading, error, data } = useQuery(dutiesQuery);
  if (error || loading) return <Loading />;
  const { landDuties, id: landId } = land;
  const duties = (data && prune(data.duties)) || [];
  const dutyStyle = dutyId => {
    if (!selectedDuty) return classes.dutyLink;
    return dutyId === selectedDuty.id
      ? classes.dutyLinkActive
      : classes.dutyLink;
  };
  const paperStyle = dutyId => {
    if (!selectedDuty) return classes.paper;
    return dutyId === selectedDuty.id ? classes.activePaper : classes.paper;
  };
  return (
    <Container className={classes.root}>
      <Fab
        variant="extended"
        aria-label="like"
        className={classes.fab}
        onClick={() => toggleAddDutyModal(true)}
      >
        <AddIcon className={classes.extendedIcon} />
        Add New Task
      </Fab>
      <Grid className={classes.grid}>
        {duties.map((duty, idx) => {
          const { id: dutyId } = duty;
          const maybeLandDuty = dutyIsOnLand(duty, landDuties);

          return (
            <Paper className={paperStyle(duty.id)} key={dutyKey(duty, idx)}>
              <Box display="flex" justifyContent="flex-end" textAlign="center">
                <Box flexGrow={1}>
                  <Typography>{duty.name}</Typography>
                </Box>
                <Box flexGrow={1}>
                  <Typography
                    className={dutyStyle(dutyId)}
                    onClick={() => {
                      selectDuty(duty);
                    }}
                  >{`${duty.estimatedDays} days`}</Typography>
                </Box>
                <Box flexGrow={1} className={classes.marginLeftBox} />
                <Switch
                  checked={!!maybeLandDuty}
                  onChange={() => {
                    toggleChecked(
                      maybeLandDuty,
                      landId,
                      dutyId,
                      createLandDuty,
                      deleteLandDuty
                    );
                  }}
                  value="checkedB"
                  color="primary"
                />
              </Box>
            </Paper>
          );
        })}
      </Grid>
      {selectedDuty && selectedDuty.id && (
        <div style={{ textAlign: "center", fontSize: 24 }}>
          <b>{selectedDuty.name}</b>
          <div>Set Renewal Cycle</div>
          <Select
            labelId="demo-simple-select-placeholder-label-label"
            id="demo-simple-select-placeholder-label"
            value={selectedDuty.estimatedDays}
            onChange={e =>
              updateDuty({
                variables: {
                  input: {
                    dutyId: selectedDuty.id,
                    dutyInput: {
                      estimatedDays: e.target.value
                    }
                  }
                }
              })
                .then(({ data }) => {
                  selectDuty(undefined);
                })
                .catch(err => console.error(err))
            }
          >
            {dayArray.map(d => {
              return (
                <MenuItem key={d} value={d}>
                  {d}
                </MenuItem>
              );
            })}
          </Select>
        </div>
      )}

      <AddDutyModal open={openModal} close={() => toggleAddDutyModal(false)} />
    </Container>
  );
};

const possibleDays = () => {
  let arr = new Array(50);
  for (var i = 1; i < 50; i++) {
    arr.push(i);
  }
  return arr;
};

const toggleChecked = (
  maybeLandDuty,
  landId,
  dutyId,
  createLandDuty,
  deleteLandDuty
) => {
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
          input: { landId, dutyId }
        }
      });
};
