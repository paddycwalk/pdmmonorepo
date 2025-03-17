import { gql } from '@apollo/client';

export const DEREGISTER_FROM_NEWSLETTER = gql`
  mutation deregisterFromNewsletter {
    deregisterFromNewsletter
  }
`;
