import React from "react";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import dayjs from "dayjs";

export default props => {
  return (
    <CardContent>
      {props.land.landDuties.map(ld => (
        <Typography key={ld.id}>
          {ld.activeCompletedDuty &&
            ld.duty.name +
              " " +
              "----------------- " +
              ld.activeCompletedDuty.user.name +
              " on: " +
              dayjs(ld.createdAt).format("M-D-YY")}
        </Typography>
      ))}
    </CardContent>
  );
};
