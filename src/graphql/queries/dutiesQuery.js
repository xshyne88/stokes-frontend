import gql from "graphql-tag";
import dutyFragment from "../fragments/dutyFragment";

export default gql`
  query dutiesQuery {
    duties {
      edges {
        node {
          ...dutyFragment
        }
      }
    }
  }
  ${dutyFragment}
`;
