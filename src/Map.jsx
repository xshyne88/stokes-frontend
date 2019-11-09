import React, { useState } from "react";
import ReactMapGL from "react-map-gl";
import { AllLands } from "./Lands";

const [defaultLatitude, defaultLongitude] = [28.51356, -81.428717];
export default ({ setActiveLand }) => {
  const [latitude, setLatitude] = useState(defaultLatitude);
  const [longitude, setLongitude] = useState(defaultLongitude);
  const [zoom, setZoom] = useState(16.773);
  return (
    <ReactMapGL
      width={"50vw"}
      height={"50vh"}
      latitude={latitude}
      longitude={longitude}
      zoom={zoom}
      maxZoom={20}
      minZoom={16.2}
      bearing={-90}
      draggable={true}
      dragRotate={true}
      mapStyle={"mapbox://styles/mapbox/satellite-v9"}
      mapboxApiAccessToken={
        "pk.eyJ1IjoiY2hhc2Vob21lZGVjb3IiLCJhIjoiY2prc201OThhMDFncjNrcnkwcXQxOXdlaCJ9.fIGVk5GP3iIh0-GFP7Oqzg"
      }
      onViewportChange={viewport => {
        const { latitude, longitude, zoom } = viewport;
        setLatitude(latitude);
        setLongitude(longitude);
        setZoom(zoom);
        // Optionally call `setState` and use the state to update the map.
      }}
    >
      <AllLands marker={true} markerProps={{ setActiveLand: setActiveLand }} />
    </ReactMapGL>
  );
};
