import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const LANDS_QUERY = gql`
  query landsQuery {
    lands {
      edges {
        node {
          name
        }
      }
    }
  }
`;

const AllLands = () => {
  const { loading, error, data } = useQuery(LANDS_QUERY, {
    fetchPolicy: "network-only"
  });

  if (error) return <div>error</div>;
  if (loading) return <div>***LOADING**** </div>;

  if (data && data.lands.edges) {
    return data.lands.edges.map(l => <h3 key={l.node.name}>{l.node.name}</h3>);
  }
};

export default AllLands;
