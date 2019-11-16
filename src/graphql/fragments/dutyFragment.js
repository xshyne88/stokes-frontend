import gql from "graphql-tag";

export default gql`
  fragment DutyFragment on Duty {
    id
    name
    description
  }
`;
