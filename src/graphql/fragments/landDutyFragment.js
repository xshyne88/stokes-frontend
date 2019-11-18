import gql from "graphql-tag";
import dutyFragment from "./dutyFragment";

export default gql`
  fragment LandDutyFragment on LandDuty {
    id
    createdAt
    estimatedDays
    status
    activeCompletedDuty {
      id
      lastCompletedBy
    }
    duty {
      ...dutyFragment
    }
  }
  ${dutyFragment}
`;
