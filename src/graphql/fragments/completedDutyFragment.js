import gql from "graphql-tag";

export const completedDutyFragment = gql`
  fragment completedDutyFragment on CompletedDuty {
    id
    expiresAt
    expired
    createdAt
    landDuty {
      id
    }
  }
`;
