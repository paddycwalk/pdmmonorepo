import { gql } from "@apollo/client";

export const GET_VIEWPORT_CSOS = gql`
  query viewportCso($uiClId: Long!) {
    viewportCsos(uiClId: $uiClId) {
      csoId
      csoName
      uiClId
    }
  }
`;
