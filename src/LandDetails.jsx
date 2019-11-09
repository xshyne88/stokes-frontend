import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const LAND_QUERY = gql`
  query landsQuery($landId: ID!) {
    land(landId: $landId) {
      id
      name
      latitude
      longitude
    }
  }
`;

const styles = {
  fontSize: 36
};

export default ({ landId }) => {
  if (!landId) return null;
  const { loading, error, data } = useQuery(LAND_QUERY, {
    variables: { landId }
  });
  if (loading) return <div>Loading..</div>;
  if (error) return <div>error</div>;

  return <div style={styles}>{data.land.name}</div>;
};
