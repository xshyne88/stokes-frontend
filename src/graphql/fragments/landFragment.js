import gql from "graphql-tag";
import landDutyFragment from "./landDutyFragment";
import noteFragment from "./noteFragment";

export default gql`
  fragment LandFragment on Land {
    id
    name
    latitude
    longitude
    landDuties {
      edges {
        node {
          ...LandDutyFragment
        }
      }
    }
    notes {
      edges {
        node {
          ...noteFragment
        }
      }
    }
  }
  ${landDutyFragment}
  ${noteFragment}
`;
