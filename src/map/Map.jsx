import React, { useState } from "react";
import ReactMapGL from "react-map-gl";
import { AllLands } from "../Lands";

const mapBoxToken =
  "pk.eyJ1IjoiY2hhc2Vob21lZGVjb3IiLCJhIjoiY2prc201OThhMDFncjNrcnkwcXQxOXdlaCJ9.fIGVk5GP3iIh0-GFP7Oqzg";
const mapStyle = "mapbox://styles/mapbox/satellite-v9";
const defaultZoom = 17.273;
const [defaultLatitude, defaultLongitude] = [28.51356, -81.428717];

export default ({ setActiveLand }) => {
  const [latitude, setLatitude] = useState(defaultLatitude);
  const [longitude, setLongitude] = useState(defaultLongitude);
  return (
    <ReactMapGL
      width={"100vw"}
      height={"100vh"}
      latitude={latitude}
      longitude={longitude}
      zoom={defaultZoom}
      maxZoom={20}
      minZoom={16.2}
      bearing={-90}
      mapStyle={mapStyle}
      mapboxApiAccessToken={mapBoxToken}
      draggable
      dragRotate
      onViewportChange={viewport => {
        const { latitude, longitude } = viewport;
        setLatitude(latitude);
        setLongitude(longitude);
      }}
    >
      <AllLands marker={true} markerProps={{ setActiveLand: setActiveLand }} />
    </ReactMapGL>
  );
};

/* import LandMarker from "./LandMarker"; */
/*
 * <LandMarker
 * longitude={lat}
 * latitude={lat}
 * name={"chase"}
 * land={{ name: "chase", landDuties: [], landId: 1 }}
 * ></LandMarker> */
/*
   const lat = -81.42998;
   const long = 28.51356;
 * height: 250,
 *       width: 210 */
