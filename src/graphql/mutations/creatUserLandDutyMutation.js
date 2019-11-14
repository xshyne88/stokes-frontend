import gql from "graphql-tag";
import { userLandDutyFragment } from "../fragments/userLandDutyFragment";

export default gql`
  mutation CreateUserLandDutyMutation($input: CreateUserLandDutyInput!) {
    createUserLandDuty(input: $input) {
      userLandDuty {
        ...UserLandDutyFragment
      }
    }
  }
  ${userLandDutyFragment}
`;
