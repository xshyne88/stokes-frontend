import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  List,
  Slider,
  Typography,
  ListItemIcon,
  ListItemText,
  ListItem,
  Checkbox,
} from "@material-ui/core";
import { UserContext } from "../UserProvider";
import { useMutation } from "react-apollo";
import { getUserId } from "../helpers";
import { defaultFormat } from "../components/DateDisplay";
import deleteCompletedDutyMutation from "../graphql/mutations/deleteCompletedDutyMutation";
import createCompletedDutyMutation from "../graphql/mutations/createCompletedDutyMutation";
import dayjs from "dayjs";
import FabButton from "../components/FabButton";
import EventIcon from "@material-ui/icons/Event";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  addCircle: {
    position: "sticky",
    height: 20,
    width: 20,
    top: 20
  },
  listItem: {
    width: "100%"
  },
  checked: {
    textDecoration: "line-through"
  },
  italic: {}
}));

const unCheckMutation = (deletecompletedDuty, completedDutyId) =>
  deletecompletedDuty({
    variables: {
      input: {
        completedDutyId: completedDutyId
      }
    }
  });

const checkMutation = (createcompletedDuty, landDutyId, userId, expiresAt) =>
  createcompletedDuty({
    variables: {
      input: {
        landDutyId,
        userId,
        expiresAt
      }
    }
  });

export default props => {
  const { landDuties } = props;
  const { user } = useContext(UserContext);
  const userId = getUserId(user);
  const { isAdmin } = user;
  const classes = useStyles();
  const [createcompletedDuty] = useMutation(createCompletedDutyMutation);
  const [deletecompletedDuty] = useMutation(deleteCompletedDutyMutation);
  const [sliderValue, setSlider] = useState(14);
  const [useSlider, toggleUseSlider] = useState(false);
  console.log(isAdmin)
  return (
    <>
      {useSlider ? (
        <>
          <FabButton
            onClick={() => toggleUseSlider(false)}
            text={"Use Default Period"}
            Icon={EventIcon}
            style={{ height: "75%", padding: 8, margin: 10 }}
          />
          <Typography style={{ margin: 10, padding: 8 }}>
            Renewal Period (Tapping is easier than sliding on mobile) Set number
            of days from today for expiration
          </Typography>
          <Slider
            value={sliderValue}
            onChange={(e, value) => {
              e.stopPropagation();
              setSlider(value);
            }}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="on"
            getAriaValueText={v => `${v} Days`}
            step={1}
            min={1}
            max={14}
            style={{ width: "100%", height: 100, top: 50 }}
          />
        </>
      ) : (
        <>
          <FabButton
            onClick={() => toggleUseSlider(true)}
            text={"Set Renewal Period Before Marking"}
            Icon={EventIcon}
            style={{ height: "75%", padding: 8, margin: 10 }}
          />
          <Typography style={{ fontSize: 10, padding: 8, margin: 10 }}>
            Set a custom number of days before the task expires
          </Typography>
        </>
      )}
      <List className={classes.root}>
        {landDuties.map(landDuty => {
          const { id: landDutyId, duty, activeCompletedDuty } = landDuty;
          const { name } = duty;
          const completed = !!activeCompletedDuty;
          return (
            <ListItem
              key={landDutyId}
              className={classes.listItem}
              dense
              button
              onClick={e => {
                if(completed && isAdmin) {
                  return unCheckMutation(deletecompletedDuty, activeCompletedDuty.id)
                }
                if(!completed) {
                  checkMutation(
                      createcompletedDuty,
                      landDutyId,
                      userId,
                      useSlider ? dayjs().add(sliderValue, "days") : undefined
                    )
                  }
                }
              }
            >
              <ListItemIcon>
                <Checkbox edge="start" checked={completed} disableRipple />
              </ListItemIcon>
              <TaskName
                landDutyId={landDutyId}
                shouldLineThrough={!!activeCompletedDuty}
                className={classes.checked}
                name={name}
              />
              <CompletedBy
                activeCompletedDuty={activeCompletedDuty}
                id={landDutyId}
              />
            </ListItem>
          );
        })}
      </List>
    </>
  );
};

const CompletedBy = ({ activeCompletedDuty, id, admin = true }) =>
  activeCompletedDuty && (
    <ListItemText id={id} edge="end">
      <div style={{ textAlign: "center" }}>
        {`Expires `}
        <i>{defaultFormat(activeCompletedDuty.expiresAt)}</i>
      </div>
    </ListItemText>
  );

const TaskName = ({ shouldLineThrough, className, name, landDutyId }) => {
  return (
    <ListItemText id={landDutyId}>
      <div className={shouldLineThrough ? className : undefined}>{name}</div>
    </ListItemText>
  );
};
