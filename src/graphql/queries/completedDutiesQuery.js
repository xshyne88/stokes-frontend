import gql from "graphql-tag";
import completedDutyFragment from "../fragments/completedDutyFragment";

export default gql`
  query completedDutiesQuery {
    completedDuties {
      edges {
        node {
          ...completedDutyFragment
        }
      }
    }
  }
  ${completedDutyFragment}
`;
