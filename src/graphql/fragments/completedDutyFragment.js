import gql from "graphql-tag";

export const completedDutyFragment = gql`
  fragment completedDutyFragment on CompletedDuty {
    id
    completedAt
    createdAt
    landDuty {
      id
    }
  }
`;
