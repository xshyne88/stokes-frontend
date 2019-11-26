import React from "react";
import dayjs from "dayjs";

export const defaultFormat = value => dayjs(value).format(`MMM D YYYY`);
export const smallFormat = value => dayjs(value).format(`M/D/YY`);

export default ({ value, showTime = false }) => (
  <div>{dayjs(value).format(`${showTime ? "HH:mm" : ""} MMM D YYYY`)}</div>
);
