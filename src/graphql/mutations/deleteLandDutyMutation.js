import gql from "graphql-tag";
import landFragment from "../fragments/landFragment";

export default gql`
  mutation deleteLandDutyMutation($input: DeleteLandDutyInput!) {
    deleteLandDuty(input: $input) {
      success
      land {
        ...LandFragment
      }
    }
  }
  ${landFragment}
`;
