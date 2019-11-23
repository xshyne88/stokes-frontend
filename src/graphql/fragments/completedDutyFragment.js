import gql from "graphql-tag";

export default gql`
  fragment completedDutyFragment on CompletedDuty {
    id
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
    lastCompletedBy
  }
`;
