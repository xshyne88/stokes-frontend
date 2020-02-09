import gql from "graphql-tag";
import userFragment from "./userFragment";
import verifiedCompletedDutyFragment from "./verifiedCompletedDutyFragment";

export default gql`
  fragment completedDutyFragment on CompletedDuty {
    id
    user {
      ...userFragment
    }
    verifiedCompletedDuties {
      edges {
        node {
          ...verifiedCompletedDutyFragment
        }
      }
    }
    expiresAt
    expired
    createdAt
    landDuty {
      id
      land {
        name
      }
      duty {
        id
        name
      }
    }
  }
  ${userFragment}
  ${verifiedCompletedDutyFragment}
`;
