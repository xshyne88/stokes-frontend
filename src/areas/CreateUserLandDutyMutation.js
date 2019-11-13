import gql from "graphql-tag";

export default gql`
  mutation($input: CreateUserLandDutyInput!) {
    createUserLandDuty(input: $input) {
      userLandDuty {
        id
      }
    }
  }
`;
