import gql from "graphql-tag";
import { userLandDutyFragment } from "./userLandDutyFragment";

export const landFragment = gql`
  fragment LandFragment on Land {
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
                ...UserLandDutyFragment
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
  ${userLandDutyFragment}
`;
