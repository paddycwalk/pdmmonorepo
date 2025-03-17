export const getBottomLinks = (
  label: (key: string, fallback: string) => string,
) => [
  {
    href: label(
      "molecules.layout.menu.link.imprintLink",
      "https://www.bosch-homecomfortgroup.com/en/impressum/",
    ),
    label: label("molecules.layout.menu.link.imprint", "Imprint"),
  },
  {
    href: "/privacyPolicy",
    label: label("molecules.layout.menu.link.privacyPolicy", "Privacy Policy"),
  },
  {
    href: label(
      "molecules.layout.menu.link.legalNoteLink",
      "[https://www.bosch-homecomfortgroup.com/de/rechtshinweise/]",
    ),
    label: label("molecules.layout.menu.link.legalNote", "Legal"),
  },
];
