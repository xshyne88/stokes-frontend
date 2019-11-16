import gql from "graphql-tag";
import dutyFragment from "./dutyFragment";

export default gql`
  fragment LandDutyFragment on LandDuty {
    id
    duty {
      ...DutyFragment
    }
  }
  ${dutyFragment}
`;
