import { gql } from '@apollo/client';

export const REGISTER_FOR_NEWSLETTER = gql`
  mutation registerForNewsletter($newsletterRegistrationInput: NewsletterRegistrationInputInput!) {
    registerForNewsletter(newsletterRegistrationInput: $newsletterRegistrationInput) {
      registeredCsos
      registeredUseCases
      registrationSuccessful
    }
  }
`;
