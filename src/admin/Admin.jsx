import React from "react";
import Grid from "@material-ui/core/Grid";
import MUIDataTable from "mui-datatables";
import { useQuery } from "@apollo/react-hooks";
import AreasLoading from "../areas/AreasLoading";
import AreasLoadError from "../areas/AreasLoadError";
import COMPLETED_DUTIES_QUERY from "../graphql/queries/completedDutiesQuery";
import prune from "../prune";
import dayjs from "dayjs";

const Admin = () => {
  const { error, data } = useQuery(COMPLETED_DUTIES_QUERY);
  if (error) return <AreasLoadError />;
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
      label: "Completed By"
    },
    {
      name: "createdAt",
      label: "Completion Date",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => (
          <DateDisplay value={value} />
        )
      }
    },
    {
      name: "expiresAt",
      label: "Renewal Point",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => (
          <DateDisplay value={value} />
        )
      }
    }
  ];

  const completedDuties = prune(data.completedDuties);
  // console.log(completedDuties);
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

const DateDisplay = ({ value, showTime = false }) => (
  <div>{dayjs(value).format(`${showTime ? "HH:mm" : ""} MMM D YYYY`)}</div>
);
