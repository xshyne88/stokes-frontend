import React from "react";
import AreaCard from "./AreaCard";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { useQuery } from "@apollo/react-hooks";
import LoadError from "../components/LoadError.jsx";
import Loading from "../components/Loading.jsx";
import prune from "../prune";
import LANDS_QUERY from "../graphql/queries/landsQuery";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.default,
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

  if (error) return <LoadError />;
  if (loading) return <Loading />;
  if (!data) return <LoadError />;

  const lands = prune(data).lands;

  return (
    <List className={classes.root}>
      {lands.map(land => (
        <ListItem className={classes.listItem} key={land.id}>
          <AreaCard land={land} />
        </ListItem>
      ))}
    </List>
  );
};
