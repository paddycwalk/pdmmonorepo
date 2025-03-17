export {};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "dock-privacy-settings": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        "consent-categories"?: string;
        "link-url-policy"?: string;
        locale?: string;
      };
    }
  }
}
