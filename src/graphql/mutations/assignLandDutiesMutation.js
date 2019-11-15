import gql from "graphql-tag";
import { completedDutyFragment } from "../fragments/completedDutyFragment";

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
