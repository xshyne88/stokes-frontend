import gql from "graphql-tag";
import landDutyFragment from "../fragments/landDutyFragment";
import noteFragment from "../fragments/noteFragment";

export default gql`
  query landDetailsQuery($landId: ID!) {
    land(landId: $landId) {
      id
      name
      latitude
      longitude
      notes {
        edges {
          node {
            ...noteFragment
          }
        }
      }
      landDuties {
        edges {
          node {
            ...LandDutyFragment
          }
        }
      }
    }
  }
  ${noteFragment}
  ${landDutyFragment}
`;
