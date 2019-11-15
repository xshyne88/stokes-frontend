import gql from "graphql-tag";
import { completedDutyFragment } from "../fragments/completedDutyFragment";

export default gql`
  query landDetailsQuery($landId: ID!) {
    land(landId: $landId) {
      id
      name
      latitude
      longitude
      landDuties {
        edges {
          node {
            completedDuties {
              edges {
                node {
                  ...completedDutyFragment
                }
              }
            }
            id
            estimatedDays
            duty {
              id
              name
              description
            }
          }
        }
      }
    }
  }
  ${completedDutyFragment}
`;
