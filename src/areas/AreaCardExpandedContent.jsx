import React from "react";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

export default props => {
  return (
    <CardContent>
      {props.land.landDuties.map(ld => (
        <Typography key={ld.id}>
          {ld.activeCompletedDuty &&
            ld.duty.name +
              " " +
              "was completed by: " +
              ld.activeCompletedDuty.user.name}
        </Typography>
      ))}
    </CardContent>
  );
};
