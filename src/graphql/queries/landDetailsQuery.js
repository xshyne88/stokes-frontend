import gql from "graphql-tag";
import landDutyFragment from "../fragments/landDutyFragment";

export default gql`
  query landDetailsQuery($landId: ID!) {
    land(landId: $landId) {
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
    }
  }
  ${landDutyFragment}
`;
