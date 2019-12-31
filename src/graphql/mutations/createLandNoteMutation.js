import gql from "graphql-tag";
import landFragment from "../fragments/landFragment";

export default gql`
  mutation createLandNoteMutation($input: CreateLandNoteInput!) {
    createLandNote(input: $input) {
      land {
        ...LandFragment
      }
    }
  }
  ${landFragment}
`;
