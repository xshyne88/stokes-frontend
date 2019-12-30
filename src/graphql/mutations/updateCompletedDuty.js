import gql from "graphql-tag";
import completedDutyFragment from "../fragments/completedDutyFragment";

export default gql`
  mutation UpdateCompletedDutyMutation($input: UpdateCompletedDutyInput!) {
    updateCompletedDuty(input: $input) {
      completedDuty {
        ...completedDutyFragment
      }
    }
  }
  ${completedDutyFragment}
`;
