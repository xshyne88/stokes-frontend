import gql from "graphql-tag";
import dutyFragment from "./dutyFragment";
import completedDutyFragment from "./completedDutyFragment";

export default gql`
  fragment LandDutyFragment on LandDuty {
    id
    createdAt
    estimatedDays
    status
    activeCompletedDuty {
      ...completedDutyFragment
    }
    duty {
      ...dutyFragment
    }
  }
  ${dutyFragment}
  ${completedDutyFragment}
`;
