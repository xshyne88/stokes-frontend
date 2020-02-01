import gql from "graphql-tag";
import completedDutyFragment from "../fragments/completedDutyFragment";

export default gql`
  query completedDutiesQuery(
    $sortBy: CompletedDutySortByType
    $sortDirection: SortDirectionType
  ) {
    completedDuties(sortBy: $sortBy, sortDirection: $sortDirection) {
      edges {
        node {
          ...completedDutyFragment
        }
      }
    }
  }
  ${completedDutyFragment}
`;
