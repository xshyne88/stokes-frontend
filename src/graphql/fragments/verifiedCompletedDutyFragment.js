import gql from "graphql-tag";
import userFragment from "./userFragment";

export default gql`
  fragment verifiedCompletedDutyFragment on VerifiedCompletedDuty {
    id
    user {
      ...userFragment
    }
    extension
    createdAt
  }
  ${userFragment}
`;
