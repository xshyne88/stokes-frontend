import gql from "graphql-tag";
import verifiedCompletedDutyFragment from "../fragments/verifiedCompletedDutyFragment";
import landFragment from "../fragments/landFragment";

export default gql`
  mutation createVerifiedCompletedDutyMutation(
    $input: CreateVerifiedCompletedDutyInput!
  ) {
    createVerifiedCompletedDuty(input: $input) {
      land {
        ...LandFragment
      }
      verifiedCompletedDuty {
        ...verifiedCompletedDutyFragment
      }
      errors {
        message
      }
    }
  }
  ${landFragment}
  ${verifiedCompletedDutyFragment}
`;
