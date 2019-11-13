import gql from "graphql-tag";

export default gql`
  mutation($input: DeleteUserLandDutyInput!) {
    deleteUserLandDuty(input: $input) {
      success
    }
  }
`;
