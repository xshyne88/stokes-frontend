import React from "react";
import { Marker } from "react-map-gl";

const BoxStyle = {
  margin: "30",
  backgroundColor: "green",
  border: "1px solid black",
  padding: "10",
  opacity: ".7",
  filter: "alpha(opacity=60)"
};

const textStyle = { color: "white" };

export default ({ latitude, longitude, name, setActiveLand, landId }) => {
  const long = parseFloat(longitude);
  const lat = parseFloat(latitude);
  if (!lat || !long) return null;
  return (
    <Marker latitude={lat} longitude={long}>
      <div
        style={BoxStyle}
        onClick={e => {
          setActiveLand(landId);
        }}
      >
        <p style={textStyle}>{name}</p>
      </div>
    </Marker>
  );
};
