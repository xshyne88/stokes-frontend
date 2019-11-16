import gql from "graphql-tag";
import landDutyFragment from "../fragments/landDutyFragment";

export default gql`
  mutation createLandDutyMutation($input: CreateLandDutyInput!) {
    createLandDuty(input: $input) {
      landDuty {
        ...LandDutyFragment
      }
    }
  }
  ${landDutyFragment}
`;
