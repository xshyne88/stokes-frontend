import gql from "graphql-tag";
import { completedDutyFragment } from "../fragments/completedDutyFragment";
import landFragment from "../fragments/landFragment";

export default gql`
  mutation createCompletedDutyMutation($input: CreateCompletedDutyInput!) {
    createCompletedDuty(input: $input) {
      land {
        ...landFragment
      }
      completedDuty {
        ...completedDutyFragment
      }
    }
  }
  ${landFragment}
  ${completedDutyFragment}
`;
