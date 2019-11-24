import gql from "graphql-tag";
import landDutyFragment from "./landDutyFragment";

export default gql`
  fragment LandFragment on Land {
    id
    name
    latitude
    longitude
    lastCompletedDuty
    landDuties {
      edges {
        node {
          ...LandDutyFragment
        }
      }
    }
  }
  ${landDutyFragment}
`;
