import gql from "graphql-tag";
import dutyFragment from "../fragments/dutyFragment";

export default gql`
  mutation UpdateDutyMutation($input: UpdateDutyInput!) {
    updateDuty(input: $input) {
      duty {
        ...dutyFragment
      }
    }
  }
  ${dutyFragment}
`;
