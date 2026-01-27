
export interface KennisArticle {
  id: string;
  title: string;
  category: string;
  summary: string;
  content: {
    intro: string;
    analysis: string;
    // Legacy fields maintained for type compatibility
    methodology: string;
    conclusion: string;
  };
  practicalApplication: string;
  keyPoints: string[];
  source: {
    author: string;
    year: number;
    journal?: string;
    doi?: string;
    url?: string;
  };
}

export const kennisArticles: KennisArticle[] = [
  // --- NIEUW: GEAVANCEERDE MANIPULATIE (2019-2021) ---
  {
    id: "dark-empath",
    title: "De 'Donkere Empath': Gevaarlijker dan de Psychopaat?",
    category: "Gedragsanalyse",
    summary: "Nieuw onderzoek (2021) identificeert een persoonlijkheidstype dat duistere trekken combineert met hoge empathie, wat leidt tot effectievere manipulatie.",
    content: {
      intro: "Lange tijd werd aangenomen dat daders van psychische mishandeling een gebrek aan empathie hebben. Recent onderzoek draait dit om: de gevaarlijkste manipulators begrijpen emoties juist uitstekend.",
      analysis: `Heym et al. (2021) identificeerden in een grootschalige studie de **Dark Empath**. Dit type scoort hoog op de 'Dark Triad' (narcisme, machiavellisme, psychopathie) maar óók hoog op cognitieve empathie.

In tegenstelling tot de klassieke psychopaat (die niet *voelt* wat jij voelt), *snapt* de Dark Empath precies wat jouw pijnpunten zijn. Ze gebruiken dit inzicht niet om te troosten, maar om strategisch te manipuleren.

**Kenmerken:**
*   Minder fysiek agressief, maar meesters in 'indirecte agressie' (sociale uitsluiting, schuldgevoel aanpraten).
*   Komen charmant en begripvol over, waardoor slachtoffers hen lang in vertrouwen nemen.
*   Gebruiken persoonlijke informatie, gedeeld in vertrouwen, later als wapen.`,
      methodology: "",
      conclusion: ""
    },
    practicalApplication: "Analyseren van de discrepantie tussen 'begripvolle woorden' en destructief gedrag.",
    keyPoints: ["Cognitieve empathie als wapen", "Indirecte agressie", "Wolf in schaapskleren"],
    source: { author: "Heym, Sumich et al.", year: 2021, journal: "Personality and Individual Differences", doi: "10.1016/j.paid.2020.110339" }
  },
  {
    id: "darvo-tactic",
    title: "DARVO: De Tegenaanval van de Dader",
    category: "Gedragsanalyse",
    summary: "Deny, Attack, Reverse Victim and Offender. Een wetenschappelijk model voor de reactie van daders op confrontatie.",
    content: {
      intro: "Wanneer een slachtoffer een dader confronteert met wangedrag, volgt zelden een excuus. Vaak ontstaat een verwarrende dynamiek waarin het slachtoffer uiteindelijk zijn excuses aanbiedt.",
      analysis: `Jennifer Freyd publiceerde in 2020 (Harsey & Freyd) nieuw empirisch bewijs voor het **DARVO**-mechanisme. Het is een voorspelbaar patroon bij confrontatie:

1.  **Deny (Ontkennen):** "Dat is nooit gebeurd" of "Je herinnert het je verkeerd."
2.  **Attack (Aanvallen):** De geloofwaardigheid of geestelijke gesteldheid van de melder wordt aangevallen. "Je bent hysterisch/dronken/wraakzuchtig."
3.  **Reverse Victim & Offender (Omdraaien):** De dader presenteert zich als het échte slachtoffer van de 'valse beschuldigingen' van de ander.

Het onderzoek toont aan dat toeschouwers die niet bekend zijn met DARVO, vaak gaan twijfelen aan het echte slachtoffer. Kennis van dit patroon is essentieel voor waarheidsvinding.`,
      methodology: "",
      conclusion: ""
    },
    practicalApplication: "Analyseren van transcripties van confrontatiegesprekken.",
    keyPoints: ["Dader-slachtoffer omkering", "Aanval op geloofwaardigheid", "Verwarring zaaien"],
    source: { author: "Harsey & Freyd", year: 2020, journal: "Journal of Aggression, Maltreatment & Trauma", doi: "10.1080/10926771.2020.1774695" }
  },
  {
    id: "institutional-gaslighting",
    title: "Institutionele Gaslighting: Als de Organisatie Ontkent",
    category: "Fraude & Integriteit",
    summary: "Hoe organisaties klokkenluiders psychologisch destabiliseren door collectieve ontkenning van misstanden.",
    content: {
      intro: "Gaslighting vindt niet alleen plaats in relaties, maar ook op de werkvloer. Klokkenluiders worden vaak niet bedankt, maar pathologisch verklaard.",
      analysis: `Kenny (2019) onderzocht de ervaringen van klokkenluiders in de bancaire sector en gezondheidszorg. Ze beschrijft 'Institutional Gaslighting' als een proces waarbij de organisatie de realiteit van de melder systematisch ondermijnt.

**Strategieën:**
*   **Normalisatie van afwijking:** De gemelde fraude wordt afgedaan als 'standaard procedure'.
*   **Isolatie:** Collega's wordt opgedragen de melder te negeren.
*   **Karaktermoord:** De focus verschuift van de *inhoud* van de melding naar de *persoonlijkheid* van de melder ("Hij ligt moeilijk in de groep", "Ze is labiel").

Het gevolg is dat de klokkenluider gaat twijfelen aan zijn eigen waarneming en moreel kompas, wat vaak leidt tot burn-out of vertrek, precies zoals de organisatie beoogt.`,
      methodology: "",
      conclusion: ""
    },
    practicalApplication: "Reconstructie van tijdlijnen: melding vs. HR-maatregelen.",
    keyPoints: ["Klokkenluiders", "Karaktermoord", "Verschuiving focus naar persoon"],
    source: { author: "Kate Kenny", year: 2019, journal: "Whistleblowing: Toward a New Theory", doi: "10.4159/9780674242135" }
  },

  // --- NIEUW: MANIPULATIE & WETENSCHAP (2021-2023) ---
  {
    id: "smart-abuse-iot",
    title: "Smart Abuse: Dwingende Controle via IoT",
    category: "Cybercrime & Digital",
    summary: "Hoe slimme apparaten (IoT) in huis nieuwe wapens worden voor dwingende controle en surveillance binnen relaties.",
    content: {
      intro: "De opkomst van 'Smart Homes' creëert nieuwe mogelijkheden voor misbruik. Recent onderzoek definieert dit als 'Technology-Facilitated Coercive Control'.",
      analysis: `Harris & Woodlock (2022) analyseerden hoe daders IoT-apparaten gebruiken om slachtoffers op afstand te terroriseren. Het gaat niet alleen om camera's, maar om subtiele sabotage:
      
1.  **Omgevingscontrole:** Het op afstand wijzigen van de thermostaat (extreem koud of heet), verlichting laten knipperen of slimme sloten blokkeren.
2.  **Surveillance:** Het gebruik van babyfoons, robotstofzuigers met camera's en 'Find My'-functies om elke beweging te volgen.
3.  **Gaslighting:** Doordat de dader acties ontkent (*"Je bent gek, de verwarming staat gewoon op 20 graden"*), twijfelt het slachtoffer aan haar waarneming en de techniek.

**De impact:**
Deze vorm van controle is 'spaceless'; het slachtoffer is nergens veilig, zelfs niet als de dader fysiek afwezig is. Het creëert een gevoel van alomtegenwoordigheid (omnipresentie) van de dader.`,
      methodology: "",
      conclusion: ""
    },
    practicalApplication: "Onderzoek naar logs van slimme apparaten.",
    keyPoints: ["Spaceless violence", "IoT sabotage", "Omnipresentie dader"],
    source: { author: "Harris & Woodlock", year: 2022, journal: "Journal of Gender-Based Violence", doi: "10.1332/239868021X16285243258834" }
  },
  {
    id: "love-bombing-narcissism",
    title: "Love Bombing: Narcistische Strategie",
    category: "Gedragsanalyse",
    summary: "Empirisch bewijs uit 2023 koppelt love bombing direct aan narcisme en onveilige hechting, niet aan verliefdheid.",
    content: {
      intro: "Overweldigende affectie aan het begin van een relatie wordt vaak geromantiseerd. Wetenschappelijk onderzoek toont echter aan dat 'love bombing' een berekende manipulatiestrategie is.",
      analysis: `Strutzenberg et al. (2023) voerden een studie uit onder 484 jongvolwassenen. De resultaten tonen een sterke correlatie tussen **love bombing** en **narcistische trekken** (lage zelfwaardering, behoefte aan bewondering).

De onderzoekers onderscheiden drie fasen in deze manipulatiecyclus:
1.  **Idealisatie (Love Bombing):** Exessief contact, cadeaus en toekomstplannen om het slachtoffer afhankelijk te maken.
2.  **Devaluatie:** Zodra de emotionele investering binnen is, stopt de aandacht en begint de kritiek.
3.  **Verwerping:** Het slachtoffer wordt aan de kant gezet of in een knipperlichtrelatie gehouden.

**Conclusie:**
Love bombing is geen teken van 'ware liefde', maar een teken van een *onveilige hechtingsstijl* van de dader, bedoeld om controle te verkrijgen.`,
      methodology: "",
      conclusion: ""
    },
    practicalApplication: "Herkennen van disproportionele affectie in tijdlijnen.",
    keyPoints: ["Correlatie narcisme", "Idealisatie-Devaluatie", "Controlemechanisme"],
    source: { author: "Strutzenberg et al.", year: 2023, journal: "Journal of Social and Personal Relationships", doi: "10.1177/02654075231153213" }
  },
  {
    id: "virtual-harassment",
    title: "Manipulatie in de Hybride Organisatie",
    category: "Fraude & Integriteit",
    summary: "Hoe toxisch leiderschap en pestgedrag zich aanpassen aan Teams, Zoom en Slack.",
    content: {
      intro: "Met de verschuiving naar thuiswerken is intimidatie niet verdwenen, maar van vorm veranderd. 'Cyber-incivility' is subtieler en lastiger te bewijzen.",
      analysis: `Onderzoek van Vranjes et al. (2021) toont aan dat digitale communicatie de drempel voor manipulatie verlaagt.
      
**Nieuwe vormen van manipulatie:**
*   **De 'Silence Treatment':** Iemand negeren in groepschats of bewust 'vergeten' uit te nodigen voor Teams-vergaderingen (sociale isolatie).
*   **Micro-management via status:** Het monitoren van 'groene bolletjes' (online status) en direct bellen als iemand 5 minuten 'afwezig' is.
*   **Publieke vernedering:** Kritische feedback geven in een kanaal waar alle collega's meelezen (CC-cultuur), in plaats van 1-op-1.

Omdat non-verbale signalen ontbreken, kunnen daders zich makkelijker verschuilen achter *"het was maar een grapje"* of *"je leest de toon verkeerd"* (gaslighting via tekst).`,
      methodology: "",
      conclusion: ""
    },
    practicalApplication: "Analyse van chatlogs en vergaderstructuren.",
    keyPoints: ["Cyber-incivility", "Digitale isolatie", "Gebrek aan non-verbaal"],
    source: { author: "Vranjes et al.", year: 2021, journal: "Journal of Occupational Health Psychology", doi: "10.1037/ocp0000284" }
  },

  // --- NIEUW: MANIPULATIE & STRAFBAAR GEDRAG (2024 UPDATE) ---
  {
    id: "wet-seksuele-misdrijven",
    title: "Wet Seksuele Misdrijven 2024: Instemming Centraal",
    category: "Onderzoeksmethodiek & Recht",
    summary: "De nieuwe wetgeving (1 juli 2024) verandert de bewijslast: dwang is niet langer vereist, het ontbreken van instemming is leidend.",
    content: {
      intro: "Op 1 juli 2024 is de Wet seksuele misdrijven in werking getreden. Dit is een fundamentele verschuiving in het Nederlandse strafrecht. Waar voorheen 'dwang' (geweld of bedreiging) bewezen moest worden, draait het nu om 'instemming'.",
      analysis: `Onder de oude wet was seksueel contact strafbaar als er sprake was van dwang. Dit leidde tot schrijnende situaties waarin slachtoffers die bevroren ('freezing') of gemanipuleerd waren, juridisch geen poot om op hadden te staan.

**Schuldverkrachting en Opzet:**
De nieuwe wet introduceert een lagere drempel. 
1.  **Opzetverkrachting:** De dader *wist* dat de ander niet wilde.
2.  **Schuldverkrachting:** De dader *had moeten vermoeden* dat de ander niet wilde, maar ging toch door (aanmerkelijke onvoorzichtigheid).

Ook seksuele intimidatie (zowel fysiek als online) is nu expliciet strafbaar gesteld. Voor onderzoekers betekent dit dat de focus verschuift van het zoeken naar sporen van fysiek geweld naar het analyseren van communicatie en context waaruit blijkt dat instemming ontbrak.`,
      methodology: "",
      conclusion: ""
    },
    practicalApplication: "Reconstructie van wilsverklaringen en context.",
    keyPoints: ["Van dwang naar instemming", "Schuldverkrachting strafbaar", "Freezing is geen toestemming"],
    source: { author: "Rijksoverheid / Ministerie van JenV", year: 2024, url: "https://www.rijksoverheid.nl/onderwerpen/seksuele-misdrijven/nieuwe-wet-seksuele-misdrijven" }
  },
  {
    id: "psychological-violence-law",
    title: "Psychisch Geweld: Strafbaar als Mishandeling?",
    category: "Onderzoeksmethodiek & Recht",
    summary: "Hoe de Hoge Raad de definitie van 'mishandeling' verruimt naar ernstige geestelijke schade.",
    content: {
      intro: "Lange tijd was 'mishandeling' (art. 300 Sr) synoniem aan fysiek letsel. Psychische terreur bleef straffeloos. Jurisprudentie toont echter een kentering.",
      analysis: `Hoewel een specifiek wetsartikel voor 'dwingende controle' in Nederland nog in ontwikkeling is, biedt de huidige rechtspraak al mogelijkheden. De Hoge Raad heeft bepaald dat het toebrengen van 'pijn' of 'letsel' niet beperkt is tot het fysieke lichaam.

**Criteria voor vervolging:**
Om psychisch geweld (zoals systematische vernedering, isolatie of gaslighting) als mishandeling te vervolgen, moet er sprake zijn van:
1.  **Medisch objectiveerbaar letsel:** Een diagnose (bijv. PTSS, depressie) vastgesteld door een erkend deskundige.
2.  **Causaliteit:** Bewijs dat dit letsel direct veroorzaakt is door het gedrag van de dader.

Daarnaast wordt art. 285b Sr (Belaging) steeds vaker ingezet voor dwingende controle binnen relaties, waarbij de 'inbreuk op de persoonlijke levenssfeer' de kern vormt.`,
      methodology: "",
      conclusion: ""
    },
    practicalApplication: "Koppeling medische dossiers aan feitenrelaas.",
    keyPoints: ["Geestelijk letsel als mishandeling", "PTSS als bewijs", "Belaging binnen relatie"],
    source: { author: "Hoge Raad", year: 2023, doi: "ECLI:NL:HR:2023:XXXX" }
  },
  {
    id: "sextortion-exposing",
    title: "Sextortion & Exposing: Manipulatie met Beeld",
    category: "Cybercrime & Digital",
    summary: "Het dreigen met of verspreiden van intiem beeldmateriaal is zwaarder strafbaar onder de nieuwe wetgeving.",
    content: {
      intro: "Het ongevraagd delen van intieme beelden ('wraakporno' of exposing) of het dreigen daarmee (sextortion) is een destructieve vorm van manipulatie.",
      analysis: `De Wet seksuele misdrijven (2024) stelt het maken, bezitten én verspreiden van seksueel beeldmateriaal zonder instemming expliciet strafbaar. Ook het maken van 'deepfakes' valt hieronder.

**De manipulatie:**
Daders gebruiken beelden vaak als dwangmiddel om slachtoffers in een relatie te houden of geld af te persen. De dreiging *"Als je bij me weggaat, stuur ik dit naar je baas"* is nu strafbaar als dwang, zelfs als de beelden nooit verstuurd worden.

**Onderzoek:**
Het veiligstellen van digitale sporen (chatlogs van de dreigementen, metadata van de bestanden) is cruciaal. Vaak verwijdert de dader berichten ('unsend'), maar laten deze sporen achter op servers of in back-ups.`,
      methodology: "",
      conclusion: ""
    },
    practicalApplication: "Digitaal forensisch onderzoek naar afpersing.",
    keyPoints: ["Strafbaarstelling deepfakes", "Dwangmiddel", "Digitale bewijslast"],
    source: { author: "Slachtofferhulp Nederland", year: 2024, url: "https://www.slachtofferhulp.nl/gebeurtenissen/seksueel-misbruik/nieuwe-zedenwet/" }
  },
  {
    id: "grooming-adults",
    title: "Grooming van Volwassenen: De 'Slow Game'",
    category: "Afhankelijkheidsrelaties",
    summary: "Grooming is niet voorbehouden aan minderjarigen. Hoe fraudeurs en daders volwassenen conditioneren.",
    content: {
      intro: "Bij grooming denken we aan kinderen. Echter, in fraudezaken (CEO-fraude, beleggingsfraude) en toxische relaties zien we exact hetzelfde psychologische proces bij volwassenen.",
      analysis: `Whitty & Buchanan (2012) beschrijven het model van volwassen grooming:
1.  **Targeting:** Het zoeken naar een kwetsbaarheid (eenzaamheid, financiële stress, ijdelheid).
2.  **Friendship forming:** Het creëren van een 'veilige' bubbel en het isoleren van het slachtoffer van kritische geluiden.
3.  **Testing:** Kleine grensoverschrijdingen om de meegaandheid te testen.
4.  **Abuse:** Het daadwerkelijke misbruik (financieel of emotioneel).

**Normalisatie:**
Het doel van grooming is 'normalisatie'. De dader zorgt ervoor dat abnormaal gedrag (zoals het overmaken van geld naar een privérekening of het accepteren van extreme controle) logisch en noodzakelijk lijkt binnen de realiteit die de dader schept.`,
      methodology: "",
      conclusion: ""
    },
    practicalApplication: "Tijdlijn-analyse van beïnvloeding.",
    keyPoints: ["Normalisatie van afwijking", "Isolatie", "Stapsgewijze conditionering"],
    source: { author: "Whitty & Buchanan", year: 2012, journal: "British Journal of Criminology", doi: "10.1093/bjc/azr076" }
  },

  // --- BESTAANDE ARTIKELEN (ZIEKTEVERZUIM & FRAUDE) ---
  {
    id: "fraud-diamond",
    title: "De Fraude Diamant: Driehoek is niet genoeg",
    category: "Fraude & Integriteit",
    summary: "Waarom sommige medewerkers wel frauderen en anderen in dezelfde positie niet: de factor 'Capaciteit'.",
    content: {
      intro: "De klassieke Fraude Driehoek (Druk, Gelegenheid, Rationalisatie) verklaart veel, maar mist één cruciaal element. Waarom grijpt de ene boekhouder met schulden wel in de kas en de andere niet?",
      analysis: `Wolfe & Hermanson (2004) breidden het model uit naar de **Fraude Diamant**. Zij voegden de factor **Capaciteit (Capability)** toe.
      
Niet iedereen *kan* frauderen. Een succesvolle fraudeur heeft specifieke eigenschappen nodig:
1.  **Positie:** De juiste autoriteit of toegang binnen de organisatie.
2.  **Intelligentie:** Het vermogen om de zwakke plekken in de controle te zien én te begrijpen hoe deze uitgebuit kunnen worden.
3.  **Ego/Overtuigingskracht:** Het vermogen om anderen te manipuleren of te liegen zonder te blozen (dwangmatig liegen).
4.  **Stressbestendigheid:** Het vermogen om de druk van het 'dubbelleven' aan te kunnen.

**Relevantie voor werkgevers:**
Bij het zoeken naar een dader wordt vaak gekeken naar wie er toegang had (Gelegenheid). De Diamant leert ons dat we ook moeten kijken naar wie er *slim en brutaal genoeg* was om het te doen. Vaak zijn dit de 'sterren' van de afdeling: medewerkers die processen beter snappen dan hun managers.`,
      methodology: "",
      conclusion: ""
    },
    practicalApplication: "Daderprofilering en risico-analyse.",
    keyPoints: ["Capaciteit (Capability)", "Intelligentie misbruik", "Stressbestendigheid"],
    source: { author: "Wolfe & Hermanson", year: 2004, journal: "The CPA Journal", url: "https://www.nysscpa.org/news/publications/the-cpa-journal/2004/december/the-fraud-diamond-considering-the-four-elements-of-fraud" }
  },
  {
    id: "malingering",
    title: "Malingering: De kunst van het ziek veinzen",
    category: "Fraude & Integriteit",
    summary: "Hoe onderscheid je echte medische klachten van geveinsd gedrag voor financieel gewin?",
    content: {
      intro: "In verzuimcasussen is 'malingering' (het opzettelijk produceren van valse of overdreven symptomen) een kostbaar probleem. Het gaat niet om psychosomatische klachten, maar om bewust bedrog.",
      analysis: `De DSM-5 definieert malingering als gedrag gemotiveerd door externe prikkels (zoals doorbetaling van salaris, vermijden van werk of verkrijgen van schadevergoeding).
      
Rogers (1997) ontwikkelde modellen om dit te detecteren. Signalen zijn onder andere:
*   **Inconsistentie:** De patiënt kan bepaalde bewegingen 'niet' maken tijdens het spreekuur, maar wel op de parkeerplaats.
*   **Overdrijving:** Symptomen worden theatraler gepresenteerd dan medisch logisch is.
*   **Selectief geheugen:** Wel details weten over de 'oorzaak' (het arbeidconflict), maar vaag zijn over dagelijkse activiteiten.

**Het juridische probleem:**
Een bedrijfsarts gaat uit van de vertrouwensrelatie en mag niet 'rechercheren'. Een arts *moet* de klacht serieus nemen. Hierdoor kan een frauderende werknemer zich lang verschuilen achter medisch geheim. Alleen feitelijk bewijs van gedrag *buiten* de spreekkamer kan dit doorbreken.`,
      methodology: "",
      conclusion: ""
    },
    practicalApplication: "Observatie van dagelijkse activiteiten (ADL).",
    keyPoints: ["Inconsistent gedrag", "Externe motivatie", "Medisch geheim vs. Feiten"],
    source: { author: "Richard Rogers", year: 1997, journal: "Clinical Assessment of Malingering and Deception", url: "https://psycnet.apa.org/record/1997-08737-000" }
  },
  {
    id: "moonlighting-sick",
    title: "Nevenwerkzaamheden tijdens ziekte",
    category: "Fraude & Integriteit",
    summary: "Waarom werken voor jezelf tijdens ziekteverzuim vaak leidt tot ontslag op staande voet.",
    content: {
      intro: "Een veelvoorkomende casus: de werknemer meldt zich ziek met een burn-out of rugklachten, maar wordt gezien terwijl hij klust, in de horeca werkt of zijn eigen bedrijf runt.",
      analysis: `Juridisch gezien draait dit om art. 7:611 BW (Goed werknemerschap) en de re-integratieverplichting.
      
Als een werknemer stelt arbeidsongeschikt te zijn voor zijn eigen werk, maar wel in staat is om vergelijkbare (of zwaardere) activiteiten elders te verrichten, is er sprake van bedrog. Hij belemmert zijn eigen herstel en benadeelt de werkgever.

**De rol van onderzoek:**
Het enkele *vermoeden* is niet genoeg. Een ontslag op staande voet vereist onomstotelijk bewijs.
Onderzoek richt zich op:
1.  **Aard van de activiteiten:** Is het 'therapeutisch' (een rondje wandelen) of arbeid (stratenmaken)?
2.  **Frequentie:** Is het incidenteel of structureel?
3.  **Inkomsten:** Wordt er geld verdiend (zwart)?

Het vastleggen van deze activiteiten middels observatie is vaak de enige manier om de discrepantie tussen 'claim' (ik kan niet werken) en 'feit' (ik ben aan het werk) aan te tonen.`,
      methodology: "",
      conclusion: ""
    },
    practicalApplication: "Bewijsvoering arbeidsrechtelijke fraude.",
    keyPoints: ["Belemmering herstel", "Goed werknemerschap", "Discrepantie belasting"],
    source: { author: "Gerechtshof Arnhem-Leeuwarden", year: 2021, doi: "ECLI:NL:GHARL:2021:3095" }
  },

  // --- GEDRAGSANALYSE & PSYCHOLOGIE ---
  {
    id: "truth-default-theory",
    title: "Truth-Default Theory: Waarom we liegen niet herkennen",
    category: "Gedragsanalyse",
    summary: "Waarom mensen evolutionair 'geprogrammeerd' zijn om leugens te geloven en waarom intuïtie faalt.",
    content: {
      intro: "De wetenschap weerlegt het idee dat we intuïtief weten wanneer iemand liegt. Uit meta-analyses blijkt dat mensen in slechts 54% van de gevallen een leugen herkennen – nauwelijks beter dan gokken.",
      analysis: `Timothy Levine (2014) introduceerde de **Truth-Default Theory (TDT)**. Deze theorie stelt dat mensen evolutionair zijn ontwikkeld om standaard aan te nemen dat communicatie eerlijk is. Dit is geen naïviteit, maar efficiëntie: als we elke uitspraak zouden wantrouwen, zou sociale samenwerking onmogelijk zijn.

De meeste mensen blijven in deze 'Truth-Default state' tot er een **trigger** is die onmogelijk genegeerd kan worden. Dit verklaart waarom partners of werkgevers vaak jarenlang signalen van bedrog missen: hun brein rationaliseert het verdachte gedrag weg om de status quo te behouden.

**Implicaties voor onderzoek:**
Het vertrouwen op 'buikgevoel' of het observeren van nervositeit is zinloos. Echte leugenaars zijn vaak niet nerveus, en onschuldige mensen zijn dat onder druk juist wel. Professioneel onderzoek richt zich daarom nooit op de *persoon*, maar op de *inhoud*. 

In de praktijk betekent dit dat verklaringen niet worden beoordeeld op geloofwaardigheid, maar systematisch worden getoetst aan verifieerbare data, tijdlijnen en logistieke feiten. Alleen harde feiten kunnen de 'Truth-Default' doorbreken en zekerheid bieden.`,
      methodology: "",
      conclusion: ""
    },
    practicalApplication: "Validatie door feitenonderzoek.",
    keyPoints: ["54% detectiekans (gokken)", "Evolutionaire bias", "Feiten als enige trigger"],
    source: { author: "Timothy R. Levine", year: 2014, journal: "Journal of Communication", doi: "10.1111/jcom.12064" }
  },
  {
    id: "cognitive-load",
    title: "Cognitieve Belasting: Het brein van de leugenaar",
    category: "Gedragsanalyse",
    summary: "Liegen is mentaal zwaar. Hoe interviewtechnieken deze zwakte benutten.",
    content: {
      intro: "Liegen vergt aanzienlijk meer hersencapaciteit dan de waarheid spreken. Dit fundamentele principe uit de rechtspsychologie vormt de basis voor moderne waarheidsvinding.",
      analysis: `Onderzoek van Vrij et al. (2006) toont aan dat liegen een complexe 'multitasking' taak is. Een leugenaar moet:
1. Een plausibel verhaal construeren;
2. Zorgen dat het consistent is met wat de luisteraar al weet;
3. Zijn eigen gedrag monitoren om 'normaal' te lijken;
4. De reactie van de interviewer in de gaten houden.

**De strategie:**
Door de **cognitieve belasting** kunstmatig te verhogen tijdens een interview, stort het kaartenhuis in. Eerlijke mensen putten uit hun geheugen en hebben hier weinig moeite mee. Leugenaars moeten hun verhaal *live* construeren. 

Effectieve methoden zijn bijvoorbeeld het vragen om het verhaal in **omgekeerde chronologische volgorde** te vertellen, of het vragen naar specifieke zintuiglijke details (geur, geluid) die in een verzonnen script vaak ontbreken. Wanneer het brein overbelast raakt, ontstaan er stiltes, inconsistenties en wordt de lichaamstaal statisch omdat alle energie naar het denken gaat.`,
      methodology: "",
      conclusion: ""
    },
    practicalApplication: "Strategische interviewtechnieken.",
    keyPoints: ["Liegen is topsport", "Multitasking faalt onder druk", "Omgekeerde volgorde"],
    source: { author: "Aldert Vrij et al.", year: 2006, journal: "Law and Human Behavior", doi: "10.1007/s10979-006-9007-y" }
  },
  {
    id: "dark-triad",
    title: "De 'Dark Triad' op de werkvloer",
    category: "Gedragsanalyse",
    summary: "Hoe narcisme, machiavellisme en psychopathie leiden tot toxisch leiderschap en fraude.",
    content: {
      intro: "Niet alle psychopaten zijn criminelen; velen zijn succesvolle managers. De psychologie spreekt van de **Dark Triad**: drie persoonlijkheidskenmerken die vaak samengaan en grote schade aanrichten in organisaties.",
      analysis: `De driehoek bestaat uit:
1. **Narcisme:** Een opgeblazen ego, behoefte aan bewondering en woede bij kritiek.
2. **Machiavellisme:** Strategische manipulatie, kille berekening en het idee dat het doel de middelen heiligt.
3. **Psychopathie:** Gebrek aan empathie, impulsiviteit en angstloosheid.

**De Corporate Psychopaat:**
Paulhus & Williams (2002) toonden aan dat deze types vaak snel carrière maken. Ze zijn charmant, durven risico's te nemen en kunnen goed verkopen. Echter, op de lange termijn laten ze een spoor van vernieling achter: pesterijen, fraude en een angstcultuur.

Ze zijn meesters in **impression management**: ze managen naar boven (slijmen bij de baas) en trappen naar beneden (intimidatie van personeel). Hierdoor worden ze vaak pas ontdekt als de schade al enorm is.`,
      methodology: "",
      conclusion: ""
    },
    practicalApplication: "Screening en cultuuronderzoek.",
    keyPoints: ["Charme als wapen", "Managen naar boven", "Destructief leiderschap"],
    source: { author: "Paulhus & Williams", year: 2002, journal: "Journal of Research in Personality", doi: "10.1016/S0092-6566(02)00505-6" }
  },
  {
    id: "halo-effect",
    title: "Het Halo-effect: Waarom we fraudeurs niet verdenken",
    category: "Gedragsanalyse",
    summary: "De cognitieve bias waardoor aantrekkelijke of succesvolle mensen als 'betrouwbaar' worden gezien.",
    content: {
      intro: "Waarom komen sommige 'succesvolle' mensen zo lang weg met fraude? Het antwoord ligt vaak in het Halo-effect.",
      analysis: `Het **Halo-effect** is een cognitieve bias waarbij één positieve eigenschap (uiterlijk, vlotte babbel, succes) onze perceptie van iemands *hele* karakter kleurt. "Hij ziet er zo netjes uit, hij zou nooit stelen."

Thorndike (1920) beschreef dit effect al. In fraudeonderzoeken zien we dit vaak terug: de 'topverkoper' of de 'charmante manager' wordt niet gecontroleerd, terwijl de stille, onopvallende medewerker met argusogen wordt bekeken. Fraudeurs misbruiken dit bewust door veel aandacht te besteden aan hun imago en sociale status.

**Onderzoek:**
Een objectief onderzoek moet blind zijn voor status. Data (cijfers, logfiles) zijn niet gevoelig voor het Halo-effect.`,
      methodology: "",
      conclusion: ""
    },
    practicalApplication: "Objectieve data-analyse.",
    keyPoints: ["Schone schijn", "Bias bij controle", "Status misbruik"],
    source: { author: "Edward Thorndike", year: 1920, journal: "Journal of Applied Psychology", doi: "10.1037/h0071663" }
  },
  {
    id: "narcissistic-rage",
    title: "Narcistische Woede: Het gevaar van ontmaskering",
    category: "Gedragsanalyse",
    summary: "Waarom confrontatie met een narcist kan leiden tot explosieve agressie of wraak.",
    content: {
      intro: "Het confronteren van iemand met narcistische trekken met zijn leugens is niet zonder risico. Het kan leiden tot 'Narcissistic Rage'.",
      analysis: `Kohut (1972) beschreef dat narcisten een uiterst kwetsbaar ego hebben. Kritiek of ontmaskering wordt niet ervaren als een fout, maar als een totale vernietiging van hun zelfbeeld. De reactie is vaak niet schaamte, maar intense woede.

Dit kan zich uiten in:
*   Fysieke agressie.
*   Een lastercampagne tegen de onderzoeker of melder.
*   Het vernietigen van bewijsmateriaal uit pure wraakzucht.

**Strategie:**
Bij onderzoek naar personen met dit profiel is de timing van de confrontatie cruciaal. Eerst moet het bewijs 100% veiliggesteld zijn ("lockdown") voordat de betrokkene op de hoogte wordt gesteld.`,
      methodology: "",
      conclusion: ""
    },
    practicalApplication: "Veiligheidsstrategie bij confrontatie.",
    keyPoints: ["Kwetsbaar ego", "Explosieve reactie", "Veiligstellen bewijs"],
    source: { author: "Heinz Kohut", year: 1972, journal: "The Psychoanalytic Study of the Child", url: "https://www.tandfonline.com/doi/abs/10.1080/00797308.1972.11822721" }
  },
  {
    id: "scan-technique",
    title: "Statement Analysis (SCAN): Woorden liegen niet",
    category: "Gedragsanalyse",
    summary: "Hoe taalgebruik verraadt wat iemand probeert te verbergen.",
    content: {
      intro: "Scientific Content Analysis (SCAN) gaat ervan uit dat mensen hun woorden onbewust kiezen op basis van hun herinnering.",
      analysis: `Avinoam Sapir ontwikkelde deze techniek. Enkele indicatoren:
*   **Verandering in voornaamwoorden:** Iemand begint met "ik deed dit" en schakelt over naar "wij deden dat" of passief taalgebruik ("het werd gedaan") op het moment dat het delict plaatsvond.
*   **Tijdsprongen:** Zinnen als "later die middag" of "vervolgens" worden vaak gebruikt om tijdvakken waarin iets strafbaars gebeurde over te slaan.
*   **Ontbrekende connecties:** Eerlijke verhalen hebben een logische structuur. Verzonnen verhalen missen vaak de 'brug' tussen emotie en actie.

SCAN is een krachtig hulpmiddel om te bepalen *waar* in een verklaring de leugen waarschijnlijk zit, zodat daarop doorgevraagd kan worden.`,
      methodology: "",
      conclusion: ""
    },
    practicalApplication: "Taalanalyse van verklaringen.",
    keyPoints: ["Taalgebruik", "Passieve vorm", "Tijdsprongen"],
    source: { author: "Driscoll", year: 1994, journal: "FBI Law Enforcement Bulletin", url: "https://leb.fbi.gov/file-repository/archives/august-1994.pdf" }
  },

  // --- FRAUDE & INTEGRITEIT ---
  {
    id: "fraud-triangle",
    title: "De Fraude Driehoek: Waarom goede mensen frauderen",
    category: "Fraude & Integriteit",
    summary: "Hét model om risico's binnen organisaties te voorspellen en begrijpen.",
    content: {
      intro: "Donald Cressey interviewde in de jaren '50 honderden veroordeelde verduisteraars. Hij ontdekte dat er altijd drie elementen aanwezig moeten zijn voordat iemand overgaat tot fraude.",
      analysis: `De **Fraud Triangle** bestaat uit:

1. **Druk (Pressure):** Een niet-deelbaar financieel probleem. Dit kan een gokschuld zijn, een echtscheiding, of simpelweg de wens om een bepaalde levensstandaard hoog te houden (status). De dader ziet geen legitieme uitweg.

2. **Gelegenheid (Opportunity):** Het gat in de controle. De medewerker weet dat hij geld kan wegnemen zonder dat iemand het merkt. Bijvoorbeeld omdat hij zowel de facturen inboekt als de betalingen goedkeurt. Dit is het enige element waar een organisatie directe invloed op heeft.

3. **Rationalisatie:** Het mentale mechanisme om de daad goed te praten. *"Ik leen het alleen maar"*, *"Ze betalen me te weinig"*, of *"Iedereen doet het"*. Hierdoor behoudt de fraudeur zijn zelfbeeld als 'eerlijk mens'.

**Toepassing in onderzoek:**
Bij het onderzoeken van fraude zoeken we niet alleen naar de dader, maar reconstrueren we deze driehoek. Waar zat het lek in de organisatie (gelegenheid)? Wat was de trigger (druk)? Dit helpt niet alleen bij het bewijzen van de opzet, maar ook bij het voorkomen van herhaling.`,
      methodology: "",
      conclusion: ""
    },
    practicalApplication: "Risico-analyse en preventie.",
    keyPoints: ["Druk (Motief)", "Gelegenheid (Het lek)", "Rationalisatie (Geweten)"],
    source: { author: "Donald R. Cressey", year: 1953, url: "https://www.ojp.gov/ncjrs/virtual-library/abstracts/other-peoples-money-study-social-psychology-embezzlement" }
  },
  {
    id: "inventory-shrinkage",
    title: "Interne Diefstal: Het gevaar van binnenuit",
    category: "Fraude & Integriteit",
    summary: "Waarom werknemers vaker stelen dan winkeldieven.",
    content: {
      intro: "Veel bedrijven focussen hun beveiliging op externe bedreigingen, terwijl de grootste schade vaak wordt aangericht door het eigen personeel.",
      analysis: `Onderzoek toont aan dat 'internal shrinkage' (diefstal door personeel) verantwoordelijk is voor een groot deel van de voorraadverschillen. Medewerkers kennen de blinde vlekken van de camera's en de procedures.

Methoden zijn divers:
*   **Sweethearting:** Een caissière slaat artikelen niet aan voor vrienden of familie.
*   **Trash runs:** Goederen worden in de vuilnisbak naar buiten gesmokkeld en later opgehaald.
*   **Retourfraude:** Het fingeren van retouren en het geld in eigen zak steken.

Omdat er een vertrouwensrelatie is, duurt het vaak lang voordat een werkgever ingrijpt. Objectief data-onderzoek (kassalogfiles koppelen aan camerabeelden) is essentieel.`,
      methodology: "",
      conclusion: ""
    },
    practicalApplication: "Koppeling data en observatie.",
    keyPoints: ["Sweethearting", "Kennis van procedures", "Vertrouwensbreuk"],
    source: { author: "Hollinger & Davis", year: 2003, journal: "Security Journal", url: "https://link.springer.com/journal/41284" }
  },
  {
    id: "procurement-fraud",
    title: "Inkoopfraude: De verborgen kostenpost",
    category: "Fraude & Integriteit",
    summary: "Hoe inkoopafdelingen kwetsbaar zijn voor corruptie en vriendjespolitiek.",
    content: {
      intro: "Inkoopfraude is een van de meest voorkomende en kostbare vormen van fraude binnen bedrijven. Het vindt plaats wanneer medewerkers hun positie misbruiken om bepaalde leveranciers te bevoordelen in ruil voor 'kickbacks'.",
      analysis: `De OESO en andere instanties waarschuwen voor 'Bid Rigging' en 'Kickbacks'. Signalen zijn vaak subtiel:
- Een inkoper die altijd dezelfde leverancier kiest, ook als deze duurder is.
- Offertes die net onder de aanbestedingsgrens blijven ('Salami Slicing').
- Een onverklaarbare stijging in de levensstandaard van de inkoper.

Onderzoek naar inkoopfraude vereist **datamining**: het analyseren van de relaties tussen medewerkers en leveranciers (bijv. gedeelde adressen, connecties op social media) en het vergelijken van marktprijzen. Vaak wordt zichtbaar dat de 'objectieve' keuze voor een leverancier helemaal niet objectief was.`,
      methodology: "",
      conclusion: ""
    },
    practicalApplication: "Relatie-analyse en data-analyse.",
    keyPoints: ["Kickbacks", "Belangenverstrengeling", "Data-analyse"],
    source: { author: "OECD", year: 2016, url: "https://www.oecd.org/gov/ethics/preventing-corruption-in-public-procurement.htm" }
  },
  {
    id: "ghost-employees",
    title: "Ghost Employees: Spoken op de loonlijst",
    category: "Fraude & Integriteit",
    summary: "Salaris uitbetalen aan medewerkers die niet bestaan of niet werken.",
    content: {
      intro: "Een klassieke vorm van fraude in grotere organisaties: de 'Ghost Employee'. Iemand staat op de loonlijst, maar voert geen werk uit.",
      analysis: `De Association of Certified Fraud Examiners (ACFE) identificeert dit als een veelvoorkomend schema.
*   **De fictieve medewerker:** Een HR-medewerker of manager creëert een vals profiel en laat het salaris op zijn eigen rekening (of die van een partner) storten.
*   **De ex-medewerker:** Iemand is uit dienst, maar wordt niet uit het systeem gehaald. Het salaris loopt door en wordt afgeroomd.

**Detectie:**
Een audit van de loonlijst is nodig. Zoek naar dubbele bankrekeningnummers, dubbele adressen, of medewerkers die nooit inloggen op het netwerk of geen vakantie opnemen.`,
      methodology: "",
      conclusion: ""
    },
    practicalApplication: "Audit van personeelsbestanden.",
    keyPoints: ["Loonlijstfraude", "Dubbele rekeningen", "ACFE"],
    source: { author: "ACFE", year: 2022, url: "https://www.acfe.com/fraud-resources/payroll-fraud" }
  },
  {
    id: "bankruptcy-fraud",
    title: "Faillissementsfraude: De lege huls",
    category: "Fraude & Integriteit",
    summary: "Hoe ondernemers activa wegsluizen voordat het schip zinkt.",
    content: {
      intro: "Faillissementsfraude benadeelt schuldeisers en de maatschappij. Een veelvoorkomende methode is het leeghalen van de vennootschap vlak voor het faillissement (paulianeus handelen).",
      analysis: `Onderzoekers zoals Levi (2008) beschrijven hoe 'georganiseerde' fraudeurs bedrijven gebruiken als wegwerpartikelen. Ze bouwen schulden op, sluizen voorraden en machines weg naar een nieuwe BV (de 'sterfhuisconstructie') en laten de oude BV ploffen.

**Indicatoren:**
- Ongebruikelijke transacties vlak voor datum faillissement.
- Verkoop van activa tegen onzakelijke (te lage) prijzen aan gelieerde partijen.
- Ontbrekende administratie.

Het bewijzen van faillissementsfraude vereist een reconstructie van de geldstromen en goederenbewegingen in de periode voorafgaand aan het faillissement.`,
      methodology: "",
      conclusion: ""
    },
    practicalApplication: "Reconstructie van geldstromen.",
    keyPoints: ["Paulianeus handelen", "Sterfhuisconstructie", "Activa onttrekking"],
    source: { author: "Michael Levi", year: 2008, journal: "Criminology & Criminal Justice", doi: "10.1177/1748895808096470" }
  },
  {
    id: "ponzi-schemes",
    title: "Ponzi-schema's: De illusie van winst",
    category: "Fraude & Integriteit",
    summary: "Beleggingsfraude waarbij inleg van nieuwe klanten wordt gebruikt om oude klanten te betalen.",
    content: {
      intro: "Genoemd naar Charles Ponzi, maar nog steeds actueel (denk aan Madoff). Het lijkt een legitieme investering met hoog rendement, maar er is geen onderliggende waarde.",
      analysis: `Frankel (2012) analyseerde de structuur van Ponzi-schema's. Ze storten in zodra de stroom nieuwe investeerders opdroogt.
Kenmerken:
*   **Ongewoon stabiel rendement:** De markt fluctueert, maar de Ponzi-investering gaat altijd omhoog.
*   **Geheimzinnigheid:** De 'strategie' is te complex om uit te leggen.
*   **Druk om te herinvesteren:** Uitbetalingen worden ontmoedigd.

Onderzoek richt zich op 'asset tracing': waar is het geld echt gebleven? Vaak is het besteed aan de levensstijl van de fraudeur.`,
      methodology: "",
      conclusion: ""
    },
    practicalApplication: "Due diligence en asset tracing.",
    keyPoints: ["Geen onderliggende waarde", "Nieuw geld betaalt oud", "Stabiel rendement is verdacht"],
    source: { author: "Tamar Frankel", year: 2012, url: "https://global.oup.com/academic/product/the-ponzi-scheme-puzzle-9780199926619" }
  },
  {
    id: "insurance-fraud",
    title: "Verzekeringsfraude: Geënsceneerde ongevallen",
    category: "Fraude & Integriteit",
    summary: "Het opzettelijk veroorzaken of veinzen van schade voor uitkering.",
    content: {
      intro: "Van een geclaimde diefstal van een auto die al verkocht was, tot het opzettelijk veroorzaken van aanrijdingen ('crash for cash').",
      analysis: `Verzekeringsfraudeurs werken vaak in netwerken. Derrig (2002) toonde aan dat patronen zichtbaar worden in data-analyse: dezelfde 'getuigen' die opduiken bij verschillende claims, of schadebeelden die niet overeenkomen met de beschreven toedracht.

Bij letselschade wordt vaak geclaimd dat men niet meer kan werken, terwijl observatie aantoont dat de persoon zware fysieke activiteiten verricht.`,
      methodology: "",
      conclusion: ""
    },
    practicalApplication: "Toedrachtonderzoek en observatie.",
    keyPoints: ["Inscenering", "Inconsistente schade", "Crash for cash"],
    source: { author: "Richard A. Derrig", year: 2002, journal: "Risk Management and Insurance Review", doi: "10.1111/1098-1616.00006" }
  },
  {
    id: "resume-fraud",
    title: "CV-Fraude: Liegen op papier",
    category: "Fraude & Integriteit",
    summary: "Het vervalsen van diploma's en werkervaring.",
    content: {
      intro: "In de strijd om een baan 'pimpen' kandidaten hun CV. Maar de grens tussen verfraaien en frauderen is dun.",
      analysis: `Onderzoek toont aan dat meer dan 50% van de CV's onwaarheden bevat. Dit varieert van het rekken van data (om gaten te dichten) tot het verzinnen van complete diploma's of werkgevers.
Het risico voor de werkgever is groot: een incompetente medewerker op een sleutelpositie kan enorme schade aanrichten.

**Validatie:**
Pre-employment screening is de enige remedie. Het verifiëren van de bron (het instituut bellen, niet het nummer op het CV) is essentieel.`,
      methodology: "",
      conclusion: ""
    },
    practicalApplication: "Pre-employment screening.",
    keyPoints: ["Diplomavervalsing", "Gaten dichten", "Bronverificatie"],
    source: { author: "HireRight", year: 2023, url: "https://www.hireright.com/resources/benchmark-report" }
  },

  // --- AFHANKELIJKHEIDSRELATIES ---
  {
    id: "coercive-control",
    title: "Dwingende Controle: Het onzichtbare geweld",
    category: "Afhankelijkheidsrelaties",
    summary: "Geweld is niet alleen slaan. Stark's model verklaart hoe vrijheidsberoving werkt in relaties.",
    content: {
      intro: "Jarenlang werd huiselijk geweld enkel gezien als fysieke mishandeling. Evan Stark (2007) veranderde dit paradigma met zijn concept van **Coercive Control** (Dwingende Controle).",
      analysis: `Stark betoogt dat het primaire doel van de dader niet fysiek letsel is, maar **vrijheidsberoving**. Fysiek geweld is slechts één van de middelen om dominantie af te dwingen. De kern van het misbruik zit in een patroon van:

*   **Isolatie:** Het contact met vrienden en familie afsnijden.
*   **Intimidatie:** Dreigen met geweld, zelfmoord of het afpakken van kinderen.
*   **Controle:** Beheer over financiën, kledingkeuze, en zelfs slaap- en eetpatronen.

**Het effect:**
Het slachtoffer verliest haar autonomie en wordt een 'gijzelaar' in eigen huis. Omdat er vaak geen blauwe plekken zijn, wordt de ernst door politie en hulpverlening vaak onderschat. Stark toonde aan dat deze vorm van controle een sterkere voorspeller is voor fataal geweld dan incidentele fysieke agressie.

**Bewijsvoering:**
In onderzoekssituaties is het cruciaal om niet te zoeken naar incidenten, maar naar het **patroon**. Het documenteren van isolatie, financiële controle en micro-regulering bouwt een dossier op dat de ernst van de situatie juridisch aannemelijk maakt.`,
      methodology: "",
      conclusion: ""
    },
    practicalApplication: "Patroonherkenning in dossiers.",
    keyPoints: ["Vrijheidsberoving als doel", "Patroon vs. Incident", "Voorspeller van escalatie"],
    source: { author: "Evan Stark", year: 2007, doi: "10.1093/acprof:oso/9780195176368.001.0001" }
  },
  {
    id: "trauma-bonding",
    title: "Trauma Bonding: Waarom ze blijven",
    category: "Afhankelijkheidsrelaties",
    summary: "De hormonale verslaving aan een mishandelende partner.",
    content: {
      intro: "Buitenstaanders vragen vaak: 'Waarom ga je niet gewoon weg?' Het antwoord is Trauma Bonding, een krachtig psychologisch mechanisme.",
      analysis: `Dutton & Painter (1981) beschreven hoe een cyclus van misbruik gevolgd door liefdevolle momenten ('intermittent reinforcement') zorgt voor een sterke emotionele binding.
Het is vergelijkbaar met het **Stockholm Syndroom**. De dader is de bron van angst, maar óók de enige bron van troost. Dit creëert een biochemische afhankelijkheid (dopamine/oxytocine) die sterker is dan rationeel denken.

Slachtoffers verdedigen hun dader vaak tegenover de buitenwereld en politie. Dit maakt onderzoek complex; de verklaring van het slachtoffer is soms onbetrouwbaar door deze binding.`,
      methodology: "",
      conclusion: ""
    },
    practicalApplication: "Begrip van slachtoffergedrag.",
    keyPoints: ["Stockholm Syndroom", "Intermittent reinforcement", "Biochemische binding"],
    source: { author: "Dutton & Painter", year: 1981, journal: "Victimology", url: "https://www.ojp.gov/ncjrs/virtual-library/abstracts/traumatic-bonding-development-emotional-attachments-battered-women" }
  },
  {
    id: "gaslighting-sociology",
    title: "Gaslighting: Het ondermijnen van de realiteit",
    category: "Afhankelijkheidsrelaties",
    summary: "Een sociologische blik op hoe daders twijfel zaaien om macht te behouden.",
    content: {
      intro: "Gaslighting is meer dan liegen; het is een strategie om iemand aan zijn eigen verstandelijke vermogens te laten twijfelen.",
      analysis: `De term komt uit de film 'Gaslight' (1944), maar is wetenschappelijk uitgewerkt door sociologen zoals Paige Sweet (2019). Zij stelt dat gaslighting werkt door in te spelen op bestaande ongelijkheden en stereotypen.

Een dader labelt het slachtoffer bijvoorbeeld als 'hysterisch', 'overgevoelig' of 'in de war'. Door dit consequent te herhalen, en door feiten te ontkennen (*"Dat is nooit gebeurd, je verbeeldt het je"*), begint het slachtoffer haar eigen waarneming te wantrouwen.

Dit is verwoestend in juridische procedures. Slachtoffers komen vaak warrig en emotioneel over (door de langdurige stress en twijfel), terwijl de dader zich kalm en rationeel presenteert.

**De rol van onderzoek:**
Het doel van onderzoek bij gaslighting is het **externaliseren van de waarheid**. Door een feitenrelaas op te bouwen met data (berichten, tijdlijnen), krijgt het slachtoffer een 'anker' in de realiteit. *"Zie je wel, het is wel gebeurd. Hier staat het zwart op wit."*`,
      methodology: "",
      conclusion: ""
    },
    practicalApplication: "Herstel van realiteitszin door feiten.",
    keyPoints: ["Aanval op realiteitszin", "Stereotypering", "Externe validatie"],
    source: { author: "Paige L. Sweet", year: 2019, journal: "American Sociological Review", doi: "10.1177/0003122419874855" }
  },
  {
    id: "stalking-typologies",
    title: "Typologieën van Stalkers",
    category: "Afhankelijkheidsrelaties",
    summary: "Niet elke stalker is hetzelfde. Het model van Mullen helpt risico's inschatten.",
    content: {
      intro: "Om stalking te stoppen, moet je de motivatie van de dader begrijpen. Mullen et al. (1999) onderscheiden vijf types.",
      analysis: `1. **De Afgewezen Stalker:** De meest voorkomende (ex-partner). Wil de relatie herstellen of wraak nemen. Hoog risico op geweld.
2. **De Intimiteitzoeker:** Denkt dat het slachtoffer zijn/haar ware liefde is (erotomanie).
3. **De Incompetente Minnaar:** Sociaal onhandig, zoekt contact maar snapt sociale regels niet.
4. **De Wrokkoesteraar:** Voelt zich onrecht aangedaan (bv. ex-werknemer) en wil het slachtoffer angst aanjagen.
5. **De Roofstalker:** Bereidt een seksueel delict voor (zeldzaam, zeer gevaarlijk).

**Onderzoeksaanpak:**
De aanpak verschilt per type. Een incompetente minnaar stopt vaak na een juridische waarschuwing. Een afgewezen stalker kan juist escaleren bij confrontatie.`,
      methodology: "",
      conclusion: ""
    },
    practicalApplication: "Risicotaxatie en interventiestrategie.",
    keyPoints: ["Afgewezen (Ex)", "Wrok", "Erotomanie"],
    source: { author: "Mullen et al.", year: 1999, journal: "American Journal of Psychiatry", doi: "10.1176/ajp.156.8.1244" }
  },
  {
    id: "financial-infidelity",
    title: "Financiële Ontrouw: Het verbergen van vermogen",
    category: "Afhankelijkheidsrelaties",
    summary: "Geld verzwijgen voor een partner is een vorm van verraad.",
    content: {
      intro: "Bij echtscheidingen komt vaak aan het licht dat een partner jarenlang geld heeft weggesluisd of schulden heeft gemaakt.",
      analysis: `Vogler (1998) onderzocht machtsdynamiek rond geld. Financiële ontrouw varieert van het hebben van een geheime creditcard tot het verbergen van grote erfenissen of bonussen.
In scheidingsprocedures (verdeling, alimentatie) is het cruciaal om het **werkelijke** financiële plaatje te reconstrueren.

**Onderzoek:**
Het analyseren van bankafschriften op patronen: regelmatige contante opnames, overboekingen naar onbekende rekeningen, of een levensstijl die niet past bij het opgegeven inkomen.`,
      methodology: "",
      conclusion: ""
    },
    practicalApplication: "Financieel onderzoek bij scheiding.",
    keyPoints: ["Verborgen assets", "Levensstijl analyse", "Machtsmiddel"],
    source: { author: "Carolyn Vogler", year: 1998, journal: "The Sociological Review", doi: "10.1111/j.1467-954X.1998.tb03482.x" }
  },
  {
    id: "estrangement",
    title: "Ouderverstoting (PAS): Een vorm van kindermishandeling",
    category: "Afhankelijkheidsrelaties",
    summary: "Hoe een ouder een kind als wapen gebruikt tegen de andere ouder.",
    content: {
      intro: "Bij vechtscheidingen komt het voor dat een kind een ouder volledig afwijst zonder gegronde reden. Dit wordt Parental Alienation (ouderverstoting) genoemd.",
      analysis: `Gardner (1985) en latere onderzoekers beschrijven dit als een proces waarbij de ene ouder het kind manipuleert om de andere ouder te haten of vrezen. Dit gebeurt door:
-   Slecht praten over de andere ouder.
-   Het kind betrekken in volwassen conflicten.
-   Het kind het gevoel geven dat het moet kiezen ('Loyaliteitsconflict').

Het kind gaat de denkwijze van de verzorgende ouder overnemen om de eigen veiligheid of rust te waarborgen.

**Fact-finding:**
In dergelijke complexe gezinssituaties is het essentieel om feiten van emoties te scheiden. Wat is er daadwerkelijk gebeurd tijdens overdrachtsmomenten? Worden afspraken nagekomen? Een objectief feitenrelaas kan de rechtbank helpen door de dynamiek bloot te leggen.`,
      methodology: "",
      conclusion: ""
    },
    practicalApplication: "Objectivering van omgangsproblematiek.",
    keyPoints: ["Loyaliteitsconflict", "Manipulatie", "Kind als wapen"],
    source: { author: "Richard A. Gardner", year: 1998, url: "https://www.worldcat.org/title/parental-alienation-syndrome/oclc/39723824" }
  },
  {
    id: "flying-monkeys",
    title: "Flying Monkeys: Misbruik via derden",
    category: "Afhankelijkheidsrelaties",
    summary: "Hoe daders hun omgeving inzetten om het slachtoffer te pesten.",
    content: {
      intro: "Een term uit 'The Wizard of Oz', gebruikt in de psychologie om mensen te beschrijven die (bewust of onbewust) de vuile klusjes van een narcist opknappen.",
      analysis: `Daders manipuleren vrienden, familie of collega's om het slachtoffer lastig te vallen, te bespioneren of geruchten te verspreiden.
De 'Flying Monkeys' denken vaak dat ze helpen ("Ik bel je alleen omdat Piet zich zo'n zorgen om je maakt"), maar ze worden gebruikt als instrument voor controle.

Dit maakt isolatie van het slachtoffer compleet: niemand lijkt meer te vertrouwen.`,
      methodology: "",
      conclusion: ""
    },
    practicalApplication: "Netwerkanalyse.",
    keyPoints: ["Proxy abuse", "Sociale isolatie", "Manipulatie van omgeving"],
    source: { author: "Atkinson", year: 2017, url: "https://psychcentral.com/blog/recovering-narcissist/2017/08/narcissists-flying-monkeys" }
  },

  // --- ZORG & ONDERMIJNING ---
  {
    id: "pgb-fraud",
    title: "PGB-Fraude: Zorgbudget als melkkoe",
    category: "Zorg & Ondermijning",
    summary: "Hoe malafide zorgbureaus kwetsbare cliënten en de maatschappij bestelen.",
    content: {
      intro: "Het Persoonsgebonden Budget (PGB) is bedoeld voor eigen regie, maar is fraudegevoelig. Criminelen ronselen cliënten en beheren hun DigiD.",
      analysis: `Onderzoek van de Nederlandse Arbeidsinspectie toont patronen:
*   **Geen zorg:** Er wordt gedeclareerd, maar er komt niemand.
*   **Ondermaatse zorg:** Ongekwalificeerd personeel voor specialistische tarieven.
*   **Gedwongen winkelnering:** De cliënt moet bij de 'zorgverlener' wonen en huur betalen.

De cliënt is vaak dubbel slachtoffer: hij krijgt geen zorg én is financieel aansprakelijk voor de fraude.`,
      methodology: "",
      conclusion: ""
    },
    practicalApplication: "Dossieronderzoek en observatie van zorglevering.",
    keyPoints: ["DigiD misbruik", "Niet-geleverde zorg", "Uitbuiting"],
    source: { author: "Arbeidsinspectie", year: 2020, url: "https://www.nla.nl/" }
  },
  {
    id: "munchausen-by-proxy",
    title: "Munchausen by Proxy (PCFI): Ziekte als middel",
    category: "Zorg & Ondermijning",
    summary: "Wanneer een verzorger ziekte veinst of veroorzaakt bij een afhankelijke.",
    content: {
      intro: "Pediatric Condition Falsification (voorheen Munchausen by Proxy) is een ernstige vorm van kindermishandeling waarbij een verzorger medische symptomen bij een kind verzint of veroorzaakt.",
      analysis: `Schreier & Libow (1993) beschrijven de motieven vaak als een pathologische behoefte aan aandacht en erkenning als 'zorgzame ouder'. De verzorger is vaak medisch onderlegd en manipuleert artsen.

Kenmerken zijn:
-   Symptomen die alleen optreden in aanwezigheid van de verzorger.
-   Symptomen die niet verklaren zijn door medisch onderzoek.
-   Een verzorger die niet opgelucht is als er niets wordt gevonden, maar juist aandringt op meer (invasieve) testen.

**Video-observatie:**
In extreme gevallen is verborgen cameratoezicht (in een ziekenhuis of thuis) de enige manier om te bewijzen dat de ouder het kind verstikt, vergiftigt of anderszins mishandelt om symptomen op te wekken.`,
      methodology: "",
      conclusion: ""
    },
    practicalApplication: "Toezicht ter bescherming van kwetsbaren.",
    keyPoints: ["Aandacht als motief", "Medische manipulatie", "Cameratoezicht"],
    source: { author: "Schreier & Libow", year: 1993, url: "https://psycnet.apa.org/record/1993-98272-000" }
  },
  {
    id: "elder-abuse",
    title: "Financiële uitbuiting van ouderen",
    category: "Zorg & Ondermijning",
    summary: "Misbruik van afhankelijkheid bij ouderen door familie of zorgverleners.",
    content: {
      intro: "Ouderenmishandeling is vaak financieel van aard. Pinnen met de pas van oma, het wijzigen van testamenten of het 'lenen' van grote bedragen zonder terugbetaling.",
      analysis: `Het risico neemt toe naarmate de oudere afhankelijker wordt (dementie, fysieke beperkingen). De dader is vaak een bekende: een kind met schulden of een 'nieuwe vriend'.

Acierno et al. (2010) vonden dat financiële uitbuiting een van de meest voorkomende vormen van ouderenmisbruik is. Het is lastig te bewijzen omdat de dader vaak een volmacht heeft gekregen.

**Onderzoek:**
Het in kaart brengen van transacties, het verifiëren van handtekeningen en het interviewen van de omgeving kan aantonen dat er sprake is van misbruik van omstandigheden en wilsontbreken.`,
      methodology: "",
      conclusion: ""
    },
    practicalApplication: "Onderzoek naar financieel beheer.",
    keyPoints: ["Afhankelijkheid", "Volmacht misbruik", "Familiaire daders"],
    source: { author: "Acierno et al.", year: 2010, journal: "American Journal of Public Health", doi: "10.2105/AJPH.2009.163089" }
  },
  {
    id: "undermining",
    title: "Ondermijning: De verwevenheid van onder- en bovenwereld",
    category: "Zorg & Ondermijning",
    summary: "Hoe criminelen misbruik maken van legitieme structuren in zorg en vastgoed.",
    content: {
      intro: "Criminelen hebben de bovenwereld nodig. Ze hebben huizen nodig om in te wonen, vergunningen voor bedrijven, en zorgstructuren om geld wit te wassen.",
      analysis: `Tops & Tromp (2019) beschrijven ondermijning als een sluipend proces. Criminelen nestelen zich in wijken en branches.
      
**Zorgfraude:**
Een specifiek zorgwekkende trend is de infiltratie in de zorgsector (PGB-fraude). Criminelen richten zorgbureaus op, ronselen kwetsbare cliënten en declareren zorg die nooit of slecht wordt geleverd. De cliënt wordt verwaarloosd, de maatschappij betaalt, en de crimineel strijkt de winst op.

**Vastgoed:**
Ook in de verhuurmarkt wordt vaak contant geld witgewassen of worden panden gebruikt voor illegale activiteiten (drugslabs, prostitutie). Voor een verhuurder of woningcorporatie levert dit enorme risico's op, waaronder sluiting van het pand door de burgemeester (Wet Damocles).

**Preventie:**
Integriteitsscreening van zakelijke relaties en huurders is de enige verdedigingslinie. Weten met wie je zakendoet voorkomt dat je onbewust faciliteert aan georganiseerde misdaad.`,
      methodology: "",
      conclusion: ""
    },
    practicalApplication: "Screening en ondermijningsbeelden.",
    keyPoints: ["Verwevenheid", "PGB-fraude", "Faciliteren"],
    source: { author: "Tops & Tromp", year: 2019, url: "https://www.politieacademie.nl/kennisenonderzoek/kennis/mediatheek/PDF/93513.pdf" }
  },

  // --- CYBERCRIME & DIGITAL ---
  {
    id: "cyberstalking",
    title: "Cyberstalking: De 24-uurs dreiging",
    category: "Cybercrime & Digital",
    summary: "Waarom online belaging net zo schadelijk is als fysieke stalking.",
    content: {
      intro: "Vaak wordt gezegd: *'Zet je computer gewoon uit.'* Maar onderzoek toont aan dat dit advies de impact van cyberstalking miskent.",
      analysis: `Dressing et al. (2014) toonden aan dat de psychologische impact van cyberstalking (angst, trauma, slaapgebrek) gelijk is aan die van fysieke stalking. De dader is via de smartphone 24/7 aanwezig in het leven van het slachtoffer. Er is geen 'veilige plek' meer.

Bovendien is de drempel voor de dader lager (anonimiteit, afstand), waardoor de frequentie van intimidatie vaak hoger ligt.

**Digitaal Onderzoek:**
Het verzamelen van bewijs bij cyberstalking vereist technische expertise. IP-adressen, metadata van afbeeldingen en header-informatie van e-mails zijn nodig om de dader achter het anonieme profiel te identificeren. Screenshots alleen zijn vaak juridisch onvoldoende.`,
      methodology: "",
      conclusion: ""
    },
    practicalApplication: "Identificatie via digitaal sporenonderzoek.",
    keyPoints: ["Geen veilige plek", "Anonimiteit dader", "Technische bewijslast"],
    source: { author: "Dressing et al.", year: 2014, journal: "Cyberpsychology, Behavior, and Social Networking", doi: "10.1089/cyber.2012.0541" }
  },
  {
    id: "deepfakes",
    title: "Deepfakes: Als zien geen geloven meer is",
    category: "Cybercrime & Digital",
    summary: "De dreiging van AI-gemanipuleerd beeld en geluid voor bewijsvoering en reputatie.",
    content: {
      intro: "Met AI kan iedereen een video maken waarin iemand iets zegt of doet wat nooit is gebeurd. Dit vormt een enorm risico voor chantage en fraude.",
      analysis: `Deepfakes worden gebruikt voor:
*   **CEO-fraude:** Een gekloonde stem van de directeur belt om geld over te maken.
*   **Wraakporno:** Het hoofd van een slachtoffer wordt op een pornofilm gemonteerd.
*   **Disinformatie:** Nepnieuws om reputaties te vernietigen.

Het detecteren van deepfakes is een wapenwedloop. Forensische software kijkt naar onnatuurlijke pixels, knippergedrag van ogen of asynchrone audio. Voor een leek is het verschil nauwelijks meer te zien.`,
      methodology: "",
      conclusion: ""
    },
    practicalApplication: "Authenticiteitsverificatie van media.",
    keyPoints: ["AI-manipulatie", "Stemklonen", "Reputatieschade"],
    source: { author: "Westerlund", year: 2019, journal: "Technology Innovation Management Review", doi: "10.22215/timreview/1282" }
  },
  {
    id: "romance-scams",
    title: "Romance Scams: Liefde als wapen",
    category: "Cybercrime & Digital",
    summary: "De psychologische manipulatie achter datingfraude.",
    content: {
      intro: "Bij datingfraude wordt een emotionele band opgebouwd met als enig doel financieel gewin. Slachtoffers raken vaak niet alleen hun geld kwijt, maar ook hun vertrouwen in mensen.",
      analysis: `Rege (2009) analyseerde de technieken van 'Romance Scammers'. Ze gebruiken scripts die inspelen op eenzaamheid en de behoefte aan connectie. Het proces verloopt in fasen:
1.  **Profiling:** Het slachtoffer selecteren op basis van kwetsbaarheid (weduwe/weduwnaar, leeftijd).
2.  **Grooming:** Intensief contact, 'love bombing', en het creëren van een gezamenlijke toekomstfantasie.
3.  **De Crisis:** Er gebeurt iets ergs (ongeluk, vast in buitenland) waardoor er *nu* geld nodig is.

Omdat het slachtoffer al emotioneel geïnvesteerd is, is de drempel om te betalen lager. Schaamte voorkomt vaak dat slachtoffers naar de politie stappen.

**Onderzoek:**
Reverse image search en taalanalyse van de berichten kunnen vaak snel aantonen dat de 'persoon' niet bestaat of foto's gebruikt van modellen/militairen.`,
      methodology: "",
      conclusion: ""
    },
    practicalApplication: "Verificatie van online identiteiten.",
    keyPoints: ["Love bombing", "Urgentie creëren", "Identiteitsfraude"],
    source: { author: "Aunshul Rege", year: 2009, journal: "Journal of Forensic Sciences", doi: "10.1111/j.1556-4029.2009.01018.x" }
  },
  {
    id: "doxing",
    title: "Doxing: Privégegevens als wapen",
    category: "Cybercrime & Digital",
    summary: "Het openbaar maken van adresgegevens om iemand te intimideren.",
    content: {
      intro: "Doxing is het verzamelen en publiceren van privégegevens (adres, telefoonnummer, werkgever) van een individu met kwaadaardige bedoelingen.",
      analysis: `Het doel is vaak intimidatie: de dader roept anderen op om het slachtoffer lastig te vallen. In Nederland is doxing sinds 2024 strafbaar gesteld.
Doxers gebruiken OSINT-technieken om informatie te vinden die mensen onbewust zelf online hebben gezet (via Kadaster, oude tweets, foto's).

**Preventie:**
Een 'Digital Footprint Analysis' kan in kaart brengen welke informatie over u of uw medewerkers online te vinden is, zodat u dit kunt verwijderen voordat het misbruikt wordt.`,
      methodology: "",
      conclusion: ""
    },
    practicalApplication: "Verwijderen van online NAW-gegevens.",
    keyPoints: ["Intimidatie", "Strafbaarstelling", "Digital Footprint"],
    source: { author: "Rijksoverheid", year: 2024, url: "https://www.rijksoverheid.nl/onderwerpen/criminaliteit/aanpak-doxing" }
  },
  {
    id: "money-mules",
    title: "Geldezels: Criminelen ronselen uw kind",
    category: "Cybercrime & Digital",
    summary: "Hoe jongeren worden misbruikt om crimineel geld wit te wassen.",
    content: {
      intro: "Jongeren worden vaak via social media (Snapchat, Instagram) benaderd om 'snel geld te verdienen'. Ze hoeven alleen hun bankpas en pincode uit te lenen.",
      analysis: `Europol waarschuwt voor dit fenomeen. Criminelen storten gestolen geld (bijv. uit phishing) op de rekening van de 'geldezel' (Money Mule) en pinnen het direct contant op.
De crimineel blijft buiten beeld, maar de geldezel wordt gepakt.

**Gevolgen:**
De jongere is strafbaar voor witwassen, moet het gestolen bedrag terugbetalen en komt op de zwarte lijst van banken (EVR), waardoor ze jarenlang geen rekening, lening of hypotheek kunnen krijgen.`,
      methodology: "",
      conclusion: ""
    },
    practicalApplication: "Onderzoek naar herkomst van gelden.",
    keyPoints: ["Witwassen", "Ronselen via social media", "EVR-registratie"],
    source: { author: "Europol", year: 2023, url: "https://www.europol.europa.eu/operations-services-and-innovation/public-awareness-and-prevention-guides/money-muling" }
  },

  // --- ONDERZOEKSMETHODIEK & RECHT ---
  {
    id: "osint-ethics",
    title: "OSINT en Privacy: Wat mag er online?",
    category: "Onderzoeksmethodiek & Recht",
    summary: "De juridische grenzen van Open Source Intelligence (OSINT).",
    content: {
      intro: "Het internet staat vol informatie. Maar dat iets openbaar is, betekent niet dat je het zomaar mag gebruiken in een onderzoek.",
      analysis: `De Autoriteit Persoonsgegevens en de rechtspraak hebben strikte kaders gesteld aan online onderzoek. Het structureel monitoren van iemands sociale media gedurende een langere periode wordt gezien als een **stelselmatige inbreuk op de privacy**. Hiervoor is een gerechtvaardigd belang en een vergunning (POB) vereist.

Een werkgever die zelf even de Facebook van een zieke werknemer in de gaten houdt, overtreedt vaak de wet. Het bewijs dat hiermee wordt verkregen, kan door de rechter als **onrechtmatig** worden terzijde geschoven.

**Professionele aanpak:**
Erkend rechercheurs werken volgens de **Privacygedragscode**. Dit betekent dat elk onderzoek getoetst moet worden aan proportionaliteit (staat het middel in verhouding tot het doel?) en subsidiariteit (kan het niet op een minder ingrijpende manier?). Alleen dan is het verkregen bewijs bruikbaar in een rechtszaak.`,
      methodology: "",
      conclusion: ""
    },
    practicalApplication: "Rechtmatigheid van bewijs borgen.",
    keyPoints: ["Openbaar ≠ Vogelvrij", "Stelselmatigheid", "Privacygedragscode"],
    source: { author: "Autoriteit Persoonsgegevens", year: 2021, url: "https://autoriteitpersoonsgegevens.nl/" }
  },
  {
    id: "hidden-cameras",
    title: "Verborgen Camera's: Mag dat zomaar?",
    category: "Onderzoeksmethodiek & Recht",
    summary: "De strenge voorwaarden voor heimelijk cameratoezicht op de werkvloer.",
    content: {
      intro: "Een greep uit de kas? Veel ondernemers willen direct een verborgen camera ophangen. Dit is echter een zwaar middel dat aan strikte eisen moet voldoen.",
      analysis: `De Hoge Raad en de AP stellen dat heimelijk toezicht alleen mag als:
1.  Er een concreet vermoeden is van een misdrijf (diefstal/fraude).
2.  Andere middelen (open camera's, controles) niets hebben opgeleverd (subsidiariteit).
3.  Het toezicht tijdelijk is.
4.  De inbreuk zo klein mogelijk is (niet op het toilet of in de kantine).
5.  De ondernemingsraad (OR) soms instemming moet geven.

Wordt hier niet aan voldaan? Dan riskeert de werkgever een hoge boete van de AP en is het bewijs mogelijk onbruikbaar voor ontslag.`,
      methodology: "",
      conclusion: ""
    },
    practicalApplication: "Toetsing inzet middelen.",
    keyPoints: ["Ultimum remedium", "Tijdelijkheid", "Privacytoets"],
    source: { author: "Hoge Raad", year: 2014, doi: "ECLI:NL:HR:2014:896" }
  },
  {
    id: "gps-tracking",
    title: "GPS-Trackers: Volgen van personen",
    category: "Onderzoeksmethodiek & Recht",
    summary: "Wanneer mag je een auto volgen met een baken?",
    content: {
      intro: "Het plaatsen van een GPS-tracker onder een auto is technisch simpel, maar juridisch complex. Het is een inbreuk op de persoonlijke levenssfeer.",
      analysis: `Rechtspraak toont aan dat het volgen van een werknemer of ex-partner met GPS alleen mag bij een zeer zwaarwegend belang.
Bijvoorbeeld: een werknemer die verdacht wordt van structureel nevenwerk tijdens ziekteverzuim, waarbij eerdere controles faalden.

Het lukraak volgen van een partner bij verdenking van overspel is voor een particulier recherchebureau **niet** toegestaan volgens de Privacygedragscode, tenzij er sprake is van andere zwaarwegende belangen (zoals veiligheid of alimentatiefraude in extreme vorm).`,
      methodology: "",
      conclusion: ""
    },
    practicalApplication: "Proportionele inzet technische middelen.",
    keyPoints: ["Zwaarwegend belang", "Alleen zakelijke voertuigen?", "Proportionaliteit"],
    source: { author: "Gerechtshof Den Bosch", year: 2014, doi: "ECLI:NL:GHSHE:2014:14" }
  },
  {
    id: "interview-techniques",
    title: "De PEACE-methode: Ethisch interviewen",
    category: "Onderzoeksmethodiek & Recht",
    summary: "De gouden standaard voor onderzoeksinterviews: informatie verzamelen zonder dwang.",
    content: {
      intro: "De tijd van 'bad cop' en dwingende verhoren is voorbij. De wetenschap toont aan dat druk leidt tot valse bekentenissen. De PEACE-methode is het alternatief.",
      analysis: `PEACE staat voor:
-   **P**lanning & Preparation
-   **E**ngage & Explain
-   **A**ccount
-   **C**losure
-   **E**valuation

Deze methode, ontwikkeld in het VK, richt zich op het opbouwen van verstandhouding (rapport) en het laten vertellen van het verhaal door de betrokkene. De interviewer stelt open vragen en confronteert pas later met bewijs.

**Waarom dit werkt:**
Door de betrokkene eerst vrijuit te laten praten, kan deze zichzelf vastpraten in controleerbare leugens. Als je direct al je bewijs op tafel gooit, past de leugenaar zijn verhaal daarop aan.`,
      methodology: "",
      conclusion: ""
    },
    practicalApplication: "Waarheidsvinding door strategische vragen.",
    keyPoints: ["Geen dwang", "Informatie verzamelen", "Strategische confrontatie"],
    source: { author: "Clarke & Milne", year: 2001, url: "https://researchportal.port.ac.uk/en/publications/national-evaluation-of-the-peace-investigative-interviewing-cours" }
  },
  {
    id: "digital-footprints",
    title: "Digitale Sporen: Metadata liegt niet",
    category: "Onderzoeksmethodiek & Recht",
    summary: "Hoe onzichtbare data in bestanden en foto's de waarheid onthult.",
    content: {
      intro: "Elk digitaal bestand bevat meer informatie dan je op het scherm ziet. Deze 'metadata' kan cruciaal zijn voor waarheidsvinding.",
      analysis: `Metadata is 'data over data'. Een foto bevat bijvoorbeeld vaak GPS-coördinaten, het type camera, en de exacte tijd van opname (EXIF-data). Een Word-document bevat informatie over de auteur en bewerkingstijd.

Criminelen of fraudeurs proberen vaak de inhoud te manipuleren (bijvoorbeeld een datum op een factuur aanpassen), maar vergeten de metadata.

**Voorbeeld:**
Een werknemer stuurt een foto van een positieve coronatest als bewijs voor verzuim. Analyse van de metadata toont aan dat de foto een jaar eerder is genomen, of gedownload is van internet. Hiermee is de fraude onomstotelijk bewezen.`,
      methodology: "",
      conclusion: ""
    },
    practicalApplication: "Forensische analyse van bestanden.",
    keyPoints: ["EXIF-data", "Bestandsanalyse", "Onweerlegbaar bewijs"],
    source: { author: "Garfinkel & Shelat", year: 2005, url: "https://simson.net/clips/academic/2005.IEEE.Remembrance.pdf" }
  },
  {
    id: "right-to-silence",
    title: "Zwijgrecht in Arbeidszaken?",
    category: "Onderzoeksmethodiek & Recht",
    summary: "Mag een werknemer zwijgen tijdens een intern onderzoek?",
    content: {
      intro: "In het strafrecht mag een verdachte zwijgen ('nemo tenetur'). Maar geldt dit ook in de relatie werknemer-werkgever?",
      analysis: `Het antwoord is genuanceerd. Een werknemer moet zich als 'goed werknemer' gedragen (art 7:611 BW). Dit houdt in dat hij openheid van zaken moet geven en verantwoording moet afleggen aan zijn werkgever.

Volledig zwijgen kan worden uitgelegd als werkweigering of het niet meewerken aan redelijke voorschriften, wat arbeidsrechtelijke consequenties kan hebben. Echter, de werkgever mag geen ongepaste druk uitoefenen.

**Onderzoek:**
Een professioneel interviewer wijst de betrokkene op zijn rechten en plichten, maar legt ook uit dat zwijgen kan betekenen dat de werkgever een beslissing neemt op basis van de *wel* beschikbare feiten (die vaak nadelig zijn).`,
      methodology: "",
      conclusion: ""
    },
    practicalApplication: "Arbeidsrechtelijke interviewkaders.",
    keyPoints: ["Goed werknemerschap", "Openheid van zaken", "Geen strafrecht"],
    source: { author: "Hoge Raad", year: 2001, url: "https://uitspraken.rechtspraak.nl/" }
  }
];
