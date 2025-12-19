
export interface AgeProfile {
  title: string;
  message: string;
  tips: string[];
  cta: {
    acknowledge: string;
    withAdult: string;
  };
  links: Record<string, string>;
}

export const PROFILE_DEFAULT_MINOR: AgeProfile = {
  title: "Ben je jonger dan 18?",
  message: "Wat goed dat je dit deelt. Omdat je minderjarig bent, is het belangrijk dat een volwassene je helpt bij het gebruik van deze tool.",
  tips: [
    "Vraag een ouder, verzorger of vertrouwenspersoon om mee te kijken.",
    "Praat met iemand die je vertrouwt (familie, docent, mentor).",
    "Je kunt gratis en anoniem bellen of chatten met de Kindertelefoon (0800-0432 of via kindertelefoon.nl)."
  ],
  cta: {
    acknowledge: "Ik begrijp het",
    withAdult: "Samen met een volwassene invullen"
  },
  links: {}
};
