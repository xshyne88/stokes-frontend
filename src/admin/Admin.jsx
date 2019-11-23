import React from "react";
import Grid from "@material-ui/core/Grid";
import MUIDataTable from "mui-datatables";
import { useQuery } from "@apollo/react-hooks";
import AreasLoading from "../areas/AreasLoading";
import COMPLETED_DUTIES_QUERY from "../graphql/queries/completedDutiesQuery";
import prune from "../prune";

const Admin = () => {
  const { loading, error, data } = useQuery(COMPLETED_DUTIES_QUERY);
  if (!data) return <AreasLoading />;
  const columns = [
    {
      name: "landDuty.land.name",
      label: "Area"
    },
    {
      name: "landDuty.duty.name",
      label: "Task Name"
    },
    {
      name: "lastCompletedBy",
      label: "Marked Completed By"
    },
    {
      name: "expiresAt",
      label: "Renewal Point"
    }
  ];

  const completedDuties = prune(data.completedDuties);
  console.log(completedDuties);
  const options = {
    filterType: "checkbox"
  };
  return (
    <>
      <Grid>
        <MUIDataTable
          title={"History"}
          data={completedDuties}
          columns={columns}
          options={options}
        />
      </Grid>
    </>
  );
};

export default Admin;
