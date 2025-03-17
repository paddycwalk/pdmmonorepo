import { gql } from "@apollo/client";

export const GET_MYPUBLICATIONS_QUERY = gql`
  query myPublicationsQuery {
    myPublications(where: {}) {
      publicationId
      publicationName
      rootCcatId
      publicationType
      useCaseAttrDvId
      useCase
      staticPagesAllowed
      csoId
      csoName
      createdAt
      updatedAt
      countryLanguageIds
      published
      publishedDate
      statusKey
      statusText
      brand
      country
      isTestPublication
      noMarketingContent
    }
  }
`;
