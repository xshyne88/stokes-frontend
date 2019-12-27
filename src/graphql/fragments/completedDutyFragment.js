import gql from "graphql-tag";
import userFragment from "./userFragment";

export default gql`
  fragment completedDutyFragment on CompletedDuty {
    id
    user {
      ...userFragment
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
`;
