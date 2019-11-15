import gql from "graphql-tag";
import { completedDutyFragment } from "./completedDutyFragment";

export default gql`
  fragment LandFragment on Land {
    id
    name
    latitude
    longitude
    lastCompletedDuty
    landDuties {
      edges {
        node {
          id
          createdAt
          estimatedDays
          status
          completedDuties {
            edges {
              node {
                ...completedDutyFragment
              }
            }
          }
          duty {
            id
            name
            description
          }
        }
      }
    }
  }
  ${completedDutyFragment}
`;
