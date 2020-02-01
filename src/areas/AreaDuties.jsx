import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import { UserContext } from "../UserProvider";
import { useMutation } from "react-apollo";
import { getUserId } from "../helpers";
import { defaultFormat } from "../components/DateDisplay";
import deleteCompletedDutyMutation from "../graphql/mutations/deleteCompletedDutyMutation";
import createCompletedDutyMutation from "../graphql/mutations/createCompletedDutyMutation";
import dayjs from "dayjs";
import FabButton from "../components/FabButton";
import EventIcon from "@material-ui/icons/Event";
import InfoIcon from "@material-ui/icons/Info";
import Tooltip from "@material-ui/core/Tooltip";

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
  const classes = useStyles();
  const [createcompletedDuty] = useMutation(createCompletedDutyMutation);
  const [deletecompletedDuty] = useMutation(deleteCompletedDutyMutation);
  const [sliderValue, setSlider] = useState(14);
  const [useSlider, toggleUseSlider] = useState(false);
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
            Renewal Period
          </Typography>
          <Slider
            value={sliderValue}
            onChange={(e, value) => setSlider(value)}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="on"
            getAriaValueText={v => `${v}`}
            step={1}
            marks={Array.from(Array(30), (_, index) => index + 1).map(v => ({
              label: v,
              value: v
            }))}
            min={1}
            max={30}
            style={{ width: "50%", height: 100, top: 50 }}
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
              onClick={e =>
                completed
                  ? unCheckMutation(deletecompletedDuty, activeCompletedDuty.id)
                  : checkMutation(
                      createcompletedDuty,
                      landDutyId,
                      userId,
                      useSlider ? dayjs().add(sliderValue, "days") : undefined
                    )
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
    <ListItemText id={id} style={{}} edge="end">
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
