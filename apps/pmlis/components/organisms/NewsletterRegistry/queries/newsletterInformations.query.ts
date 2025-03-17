import { gql } from '@apollo/client';

export const GET_NEWSLETTER_INFORMATIONS = gql`
  query getNewsletterInformations($clId: Long!) {
    newsletterCsos(uiClId: $clId) {
      csoId
      csoName
      csoUkey
      useCases {
        useCaseId
        useCaseName
        useCaseUkey
        __typename
      }
      __typename
    }
    newsletterSettings(uiClId: $clId) {
      registeredCsos
      registeredUseCases
      __typename
    }
  }
`;
