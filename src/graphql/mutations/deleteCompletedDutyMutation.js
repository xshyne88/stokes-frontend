import gql from "graphql-tag";
import landFragment from "../fragments/landFragment";

export default gql`
  mutation DeleteCompletedDutyMutation($input: DeleteCompletedDutyInput!) {
    deleteCompletedDuty(input: $input) {
      success
      completedDuty {
        landDuty {
          id
        }
      }
      land {
        ...landFragment
      }
    }
  }
  ${landFragment}
`;
