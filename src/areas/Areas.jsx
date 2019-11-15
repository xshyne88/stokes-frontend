import React from "react";
import AreaCard from "./AreaCard";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { useQuery } from "@apollo/react-hooks";
import AreasLoadError from "./AreasLoadError.jsx";
import AreasLoading from "./AreasLoading.jsx";
import prune from "../prune";
import LANDS_QUERY from "../graphql/queries/landsQuery";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap"
  },
  listItem: {
    display: "inline-block",
    height: "100%"
  }
}));

export default () => {
  const classes = useStyles();
  const { loading, error, data } = useQuery(LANDS_QUERY);

  if (error) return <AreasLoadError />;
  if (loading) return <AreasLoading />;

  const lands = prune(data).lands;
  console.log(lands);

  return (
    <List className={classes.root}>
      <ListItem className={classes.listItem}>
        {lands.map(land => (
          <AreaCard key={land.id} land={land} />
        ))}
      </ListItem>
    </List>
  );
};
