import gql from "graphql-tag";
import dutyFragment from "./dutyFragment";
import completedDutyFragment from "./completedDutyFragment";
import noteFragment from "./noteFragment";

export default gql`
  fragment LandDutyFragment on LandDuty {
    id
    createdAt
    estimatedDays
    status
    completedDuties {
      edges {
        node {
          ...completedDutyFragment
        }
      }
    }
    notes {
      edges {
        node {
          ...noteFragment
        }
      }
    }
    activeCompletedDuty {
      ...completedDutyFragment
    }
    duty {
      ...dutyFragment
    }
  }
  ${dutyFragment}
  ${noteFragment}
  ${completedDutyFragment}
`;
