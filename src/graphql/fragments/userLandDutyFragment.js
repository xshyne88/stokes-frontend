import gql from "graphql-tag";

export const userLandDutyFragment = gql`
  fragment UserLandDutyFragment on UserLandDuty {
    id
    completedAt
    landDuty {
      id
    }
  }
`;
