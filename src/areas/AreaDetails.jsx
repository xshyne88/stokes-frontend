import React from "react";
import AreasLoading from "./AreasLoading";
import AreasLoadError from "./AreasLoadError";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import Area from "./Area";
import AreaDuties from "./AreaDuties";
import prune from "../prune";

const LAND_QUERY = gql`
  query landQuery($landId: ID!) {
    land(landId: $landId) {
      id
      name
      latitude
      longitude
      landDuties {
        edges {
          node {
            userLandDuties {
              edges {
                node {
                  id
                  completedAt
                  landDuty {
                    duty {
                      id
                    }
                  }
                }
              }
            }
            id
            estimatedDays
            duty {
              name
              description
            }
          }
        }
      }
    }
  }
`;

export default props => {
  const landId = props.match.params.id;
  const { loading, error, data } = useQuery(LAND_QUERY, {
    variables: { landId }
  });

  if (error) return <AreasLoading />;
  if (loading) return <AreasLoadError />;

  if (data && data.land) {
    const { land } = data;
    return (
      <div>
        <Area area={land} />
        <AreaDuties landDuties={prune(land.landDuties)} />
      </div>
    );
  }
  return <div>{JSON.stringify(props)}</div>;
};
