import React, { useState, useContext } from "react";
import Loading from "../components/Loading";
import LoadError from "../components/LoadError";
import { useQuery } from "@apollo/react-hooks";
import { makeStyles } from "@material-ui/core/styles";
import Area from "./Area";
import prune from "../prune";
import LAND_DETAILS_QUERY from "../graphql/queries/landDetailsQuery";
import AddCircle from "@material-ui/icons/AddCircle";
import { UserContext } from "../UserProvider";
import AddAreaLandDutiesDialog from "./dialogs/AddAreaLandDutiesDialog";
import Tabs from "./Tabs";

export default props => {
  const landId = props.match.params.id;
  const classes = useStyles();
  const [openDialog, toggleDialog] = useState(false);
  const { user } = useContext(UserContext);
  const { isAdmin } = user;
  const { loading, error, data } = useQuery(LAND_DETAILS_QUERY, {
    variables: { landId }
  });

  if (loading) return <Loading />;
  if (error) return <LoadError />;

  if (data && data.land) {
    const { land } = prune(data);
    return (
      <div>
        <Area area={land} />
        <Tabs land={land} />
        {isAdmin && (
          <>
            <AddCircle
              color={"primary"}
              className={classes.addCircle}
              onClick={e => toggleDialog(true)}
            />
            <AddAreaLandDutiesDialog
              open={openDialog}
              onClose={() => toggleDialog(false)}
              title={land.name}
              land={land}
            />
          </>
        )}
      </div>
    );
  }
};

const useStyles = makeStyles(theme => ({
  root: {
    width: "100vw",
    backgroundColor: theme.palette.background.paper
  },
  addCircle: {
    bottom: 75,
    position: "absolute",
    right: 30,
    height: 100,
    width: 100
  }
}));
