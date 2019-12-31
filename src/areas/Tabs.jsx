import React from "react";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Visibility from "@material-ui/icons/Visibility";
import AreaDuties from "./AreaDuties";
import AreaNotes from "./AreaNotes";
import View from "./View";
import EditIcon from "@material-ui/icons/Edit";
import EventNoteIcon from "@material-ui/icons/EventNote";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "100%",
    minHeight: 650
  }
}));

export default ({ land }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="View" {...a11yProps(0)} icon={<Visibility />} />
          <Tab label="Notes" {...a11yProps(1)} icon={<EventNoteIcon />} />
          <Tab label="Complete" {...a11yProps(2)} icon={<EditIcon />} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={`x`}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <View land={land} />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <AreaNotes land={land} />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <AreaDuties landDuties={land.landDuties} />
        </TabPanel>
      </SwipeableViews>
    </div>
  );
};
