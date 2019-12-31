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
import { Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: 36,
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
      <ListItem className={classes.listItem} key={"announcements"}>
        <div>
          General notes:
          <Typography>
            - Maintenance of a given section includes maintaining the property
            line in addition to the grave spaces. Easements/borders in a given
            section need to be maintained alongside the grave spaces. For
            example, when maintaining sections K, J, H, &amp; G, the 10 or so
            feet from the last row to the green brick boundary wall of Mt.
          </Typography>
          <Typography>
            - Pleasant church also needs to be maintained. When maintaining the
            vacant land, this includes the area around the storage container and
            along the fence line of the church.
          </Typography>
          <Typography>
            - Maintenance of a given section also includes picking up the
            cemetery road and any access roads in that section.
          </Typography>
          <Typography>
            - The front of the cemetery (along Bruton boulevard) needs to be
            picked up on an as needed basis. Passerby’s often throw trash here
          </Typography>
        </div>
      </ListItem>
      {lands.map(land => (
        <ListItem className={classes.listItem} key={land.id}>
          <AreaCard land={land} />
        </ListItem>
      ))}
    </List>
  );
};
