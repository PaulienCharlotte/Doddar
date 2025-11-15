
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

export const PROFILE_0_12: AgeProfile = {
    title: "Fijn dat je contact zoekt",
    message: "Het is moedig dat je dit deelt. Omdat je nog geen 13 bent, is het extra belangrijk dat je goede en veilige hulp krijgt van een volwassene.",
    tips: [
      "Vertel het aan een volwassene die je vertrouwt (ouder/verzorger, meester/juf of een familielid).",
      "Je kunt gratis en anoniem bellen of chatten met de Kindertelefoon (0800-0432). Zij zijn er speciaal voor jou.",
      "Als je je onveilig voelt door geweld of ruzie thuis: vraag een volwassene om Veilig Thuis te bellen (0800-2000). Bij direct gevaar: 112."
    ],
    cta: {
      acknowledge: "Ik begrijp het, ik zoek hulp",
      withAdult: "Samen met een volwassene invullen"
    },
    links: {
      "De Kindertelefoon (0800-0432)": "https://www.kindertelefoon.nl/",
      "Veilig Thuis (0800-2000)": "https://veiligthuis.nl/"
    },
};

export const PROFILE_13_17: AgeProfile = {
    title: "Jouw veiligheid is belangrijk",
    message: "Het is goed dat je dit deelt. Omdat je tussen de 13 en 17 bent, zijn er specifieke plekken die je kunnen helpen met lastige situaties, zowel online als offline.",
    tips: [
      "Praat erover met een volwassene die je vertrouwt. Dit kan een ouder, docent, mentor of sportcoach zijn.",
      "Weet dat je niet alleen bent. Veel jongeren maken lastige dingen mee.",
      "Je kunt anoniem en gratis chatten of bellen met De Kindertelefoon of met 'Alles Oké? Supportlijn'."
    ],
    cta: {
      acknowledge: "Ik begrijp het, bedankt",
      withAdult: "Ik vul dit later met een volwassene in"
    },
    links: {
      "De Kindertelefoon": "https://www.kindertelefoon.nl/",
      "'Alles Oké?' Supportlijn": "https://www.allesoke.nl/"
    },
};

export const PROFILE_DEFAULT_MINOR: AgeProfile = {
    title: "Hulp is beschikbaar",
    message: "Het is moedig dat je dit deelt. Omdat het erop lijkt dat je minderjarig bent, kunnen wij jouw verhaal niet direct onderzoeken. Je hoeft dit niet alleen te doen.",
    tips: [
      "Praat met een volwassene die je vertrouwt (ouder, verzorger, mentor of vertrouwenspersoon).",
      "Kies iemand die niet bij het probleem betrokken is.",
      "Je kunt anoniem bellen of chatten met de Kindertelefoon (0800-0432)."
    ],
    cta: {
      acknowledge: "Ik begrijp het — ik zoek hulp",
      withAdult: "Samen met een volwassene invullen"
    },
    links: {
      "de Kindertelefoon (0800-0432)": "https://www.kindertelefoon.nl/"
    }
};
