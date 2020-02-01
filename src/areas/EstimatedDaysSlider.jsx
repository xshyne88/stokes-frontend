import React from "react";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";

export default () => (
  <>
    <Typography>
      When a task is marked, set the number of days until it needs to be
      completed again
    </Typography>
    <Slider
      defaultValue={14}
      aria-labelledby="discrete-slider"
      valueLabelDisplay="on"
      getAriaValueText={v => `${v}`}
      step={1}
      marks={Array.from(Array(30), (x, index) => index + 1).map(v => ({
        label: v,
        value: v
      }))}
      min={1}
      max={30}
      style={{ width: "50%", height: 100, top: 50 }}
    />
  </>
);
