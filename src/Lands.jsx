import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import LandMarker from "./map/LandMarker";
import LoadError from "./components/LoadError";
import Loading from "./components/Loading";

const LANDS_QUERY = gql`
  query landsQuery {
    lands {
      edges {
        node {
          id
          name
          latitude
          longitude
        }
      }
    }
  }
`;

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

const LandCards = () => null;

const LandDisplay = ({ lands, marker, markerProps }) => {
  const Component = marker ? LandMarker : LandCards;
  return lands.reduce((acc, land) => {
    const { node } = land;
    const { latitude, longitude, id, name } = node;
    if (!latitude || !longitude) return acc;
    return [
      ...acc,
      <Component
        key={id}
        landId={id}
        name={name}
        longitude={longitude}
        latitude={latitude}
        land={land.node}
        {...markerProps}
      />
    ];
  }, []);
};

export default null;
