import React from "react";
import { useQuery } from "@apollo/react-hooks";
import LandMarker from "./map/LandMarker";
import LoadError from "./components/LoadError";
import Loading from "./components/Loading";
import LANDS_QUERY from "./graphql/queries/landsQuery";
import prune from "./prune";

export const AllLands = ({ marker, markerProps }) => {
  const { loading, error, data } = useQuery(LANDS_QUERY);

  if (loading) return <Loading />;
  if (error) return <LoadError />;
  if (!data) return <LoadError />;

  const landsCount = data.lands.edges.length;
  if (landsCount === 0) return <div>No lands have been created</div>;

  return (
    <LandDisplay
      lands={data.lands.edges}
      marker={marker}
      markerProps={markerProps}
    />
  );
};

const LandDisplay = ({ lands, marker, markerProps }) => {
  const prunedLands = prune(lands);
  return prunedLands.reduce((acc, land) => {
    const { latitude, longitude, id, name } = land;
    if (!latitude || !longitude) return acc;
    return [
      ...acc,
      <LandMarker
        key={id}
        landId={id}
        name={name}
        longitude={longitude}
        latitude={latitude}
        land={land}
        {...markerProps}
      />
    ];
  }, []);
};

export default null;
