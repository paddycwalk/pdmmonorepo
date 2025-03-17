export interface NewsletterCso {
  csoId: string;
  csoName: string;
  csoUkey: string;
  useCases: NewsletterUseCase[];
}

export interface NewsletterUseCase {
  useCaseId: string;
  useCaseName: string;
  useCaseUkey: string;
}

export interface NewsletterSettings {
  registeredCsos: string[];
  registeredForNewsletter: boolean;
  registeredUseCases: string[];
}

export interface NewsletterData {
  newsletterCsos: NewsletterCso[];
  newsletterSettings: NewsletterSettings;
}

export interface Variables {
  clId: number;
}

export interface RegisterVariables {
  newsletterRegistrationInput: NewsletterRegistrationInput;
}

export interface NewsletterRegistrationInput {
  registeredCsos: string[];
  registeredUseCases: string[];
}
