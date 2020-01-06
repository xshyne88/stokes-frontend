import gql from "graphql-tag";
import landDutyFragment from "../fragments/landDutyFragment";
import landFragment from "../fragments/landFragment";

export default gql`
  mutation createLandDutyMutation($input: CreateLandDutyInput!) {
    createLandDuty(input: $input) {
      land {
        ...LandFragment
      }
      landDuty {
        ...LandDutyFragment
      }
      errors {
        message
      }
    }
  }
  ${landFragment}
  ${landDutyFragment}
`;
