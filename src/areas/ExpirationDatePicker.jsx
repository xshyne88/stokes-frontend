import React from "react";
import Button from "@material-ui/core/Button";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { useMutation } from "react-apollo";
import dayjs from "dayjs";
import updateCompletedDutyMutation from "../graphql/mutations/updateCompletedDuty";

export default ({ expiresAt, completedDutyId }) => {
  const [selectedDate, setSelectedDate] = React.useState(dayjs(expiresAt));

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  const [updateCompletedDuty] = useMutation(updateCompletedDutyMutation);

  return (
    <>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker
          style={{ marginBottom: 10 }}
          label={<div>Resets on</div>}
          value={selectedDate}
          format="MMMM d yy"
          onChange={handleDateChange}
        />
      </MuiPickersUtilsProvider>
      <Button
        onClick={e =>
          updateCompletedDuty({
            variables: {
              input: {
                completedDutyId,
                completedDutyInput: {
                  expiresAt: selectedDate
                }
              }
            }
          })
            .then(e => console.log(e))
            .catch(e => console.error(e))
        }
      >
        Set new expiration
      </Button>
    </>
  );
};
