import React, { useState } from "react";
import AreasLoading from "./AreasLoading";
import AreasLoadError from "./AreasLoadError";
import { useQuery } from "@apollo/react-hooks";
import { makeStyles } from "@material-ui/core/styles";
import Area from "./Area";
import AreaDuties from "./AreaDuties";
import prune from "../prune";
import LAND_DETAILS_QUERY from "../graphql/queries/landDetailsQuery";
import AddCircle from "@material-ui/icons/AddCircle";
// import { UserContext } from "../UserProvider";
import AddAreaLandDutiesDialog from "./dialogs/AddAreaLandDutiesDialog";

export default props => {
  // const { user } = useContext(UserContext);
  // console.log(user);
  const landId = props.match.params.id;
  const classes = useStyles();
  const [openDialog, toggleDialog] = useState(false);
  const { loading, error, data } = useQuery(LAND_DETAILS_QUERY, {
    variables: { landId }
  });

  if (error) return <AreasLoading />;
  if (loading) return <AreasLoadError />;

  if (data && data.land) {
    const land = prune(data.land);
    return (
      <div>
        <Area area={land} />
        <AreaDuties landDuties={land.landDuties} />
        {/* {user.isAdmin && ( */}
        {true && (
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
