import React from "react";
import { Marker } from "react-map-gl";
import { getPercentageOfDutiesCompleted, getProgressColor } from "../helpers";

const BoxStyle = {
  margin: "30",
  border: "1px solid black",
  padding: "10",
  opacity: ".7",
  filter: "alpha(opacity=60)",
  height: 100,
  width: 100
};

const textStyle = { color: "white" };

export default ({ land, latitude, longitude, name, setActiveLand, landId }) => {
  const long = parseFloat(longitude);
  const lat = parseFloat(latitude);
  const { landDuties } = land;
  const percentage = getPercentageOfDutiesCompleted(landDuties);
  const progressColor = getProgressColor(percentage);
  if (!lat || !long) return null;
  console.log(land.name, long, lat);
  return (
    <Marker latitude={lat} longitude={long}>
      <div
        style={{ ...BoxStyle, backgroundColor: progressColor }}
        onClick={e => {
          setActiveLand(landId);
        }}
      >
        <p style={textStyle}>{name}</p>
      </div>
    </Marker>
  );
};
