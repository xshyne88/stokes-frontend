import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import LandMarker from "./map/LandMarker";

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

export const LandsForCards = props => {
  const { loading, error, data } = useQuery(LANDS_QUERY);

  if (error) return <div>error</div>;
  if (loading) return <div>***LOADING****</div>;
};

export const AllLands = ({ marker, markerProps }) => {
  const { loading, error, data } = useQuery(LANDS_QUERY);

  if (error) return <div>error</div>;
  if (loading) return <div>***LOADING****</div>;

  if (data && data.lands.edges) {
    return (
      <LandDisplay
        lands={data.lands.edges}
        marker={marker}
        markerProps={markerProps}
      />
    );
  }
  return <div>No lands have been created</div>;
};

const LandCards = () => null;

const LandDisplay = ({ lands, marker, markerProps }) => {
  const Component = marker ? LandMarker : LandCards;
  return lands.reduce((acc, land) => {
    if (!land.node.latitude || !land.node.longitude) return acc;
    return [
      ...acc,
      <Component
        key={land.node.id}
        {...markerProps}
        longitude={land.node.longitude}
        latitude={land.node.latitude}
        name={land.node.name}
        landId={land.node.id}
        land={land.node}
      />
    ];
  }, []);
};

export default null;
