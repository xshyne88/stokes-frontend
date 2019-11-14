import gql from "graphql-tag";

export default gql`
  mutation DeleteUserLandDutyMutation($input: DeleteUserLandDutyInput!) {
    deleteUserLandDuty(input: $input) {
      success
      userLandDuty {
        landDuty {
          id
        }
      }
    }
  }
`;
