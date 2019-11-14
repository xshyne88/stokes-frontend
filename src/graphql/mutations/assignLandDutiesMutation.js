import gql from "graphql-tag";
import { userLandDutyFragment } from "../fragments/userLandDutyFragment";

export default gql`
  mutation($input: AssignLandDutiesInput!) {
    assignLandDuties(input: $input) {
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
  }
  ${userLandDutyFragment}
`;
