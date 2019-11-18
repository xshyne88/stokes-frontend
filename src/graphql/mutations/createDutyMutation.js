import gql from "graphql-tag";
import dutyFragment from "../fragments/dutyFragment";

export default gql`
  mutation createDutyMutation($input: CreateDutyInput!) {
    createDuty(input: $input) {
      duty {
        ...dutyFragment
      }
    }
  }
  ${dutyFragment}
`;
