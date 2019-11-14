import gql from "graphql-tag";
import { landFragment } from "../fragments/landFragment";

export default gql`
  query landsQuery {
    lands {
      edges {
        node {
          ...LandFragment
        }
      }
    }
  }
  ${landFragment}
`;
