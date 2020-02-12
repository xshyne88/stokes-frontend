import gql from "graphql-tag";

export default gql`
  fragment dutyFragment on Duty {
    id
    name
    description
    estimatedDays
  }
`;
