import React from "react";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { useMutation } from "react-apollo";
import dayjs from "dayjs";
import updateCompletedDutyMutation from "../graphql/mutations/updateCompletedDuty";

export default ({ expiresAt, completedDutyId }) => {
  const [selectedDate, setSelectedDate] = React.useState(dayjs(expiresAt));

  const handleDateChange = date => {
    updateCompletedDuty({
      variables: {
        input: {
          completedDutyId,
          completedDutyInput: {
            expiresAt: date
          }
        }
      }
    })
      .then(e => setSelectedDate(date))
      .catch(e => console.error(e));
  };

  const [updateCompletedDuty] = useMutation(updateCompletedDutyMutation);

  return (
    <>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker
          style={pushUp}
          label="Select a date"
          value={selectedDate}
          format="MMMM d yy"
          onChange={handleDateChange}
        />
      </MuiPickersUtilsProvider>
    </>
  );
};

const pushUp = {
  marginBottom: 10
};
