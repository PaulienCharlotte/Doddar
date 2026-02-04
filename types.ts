
export interface UserInput {
  leeftijd: string;
  relatietype: string;
  casus_bron: string;
  beschrijving: string;
  datum: string;
  emotie: string;
  doel_analyse: string;
}

export interface WetenschappelijkeReferentie {
  titel: string;
  doi: string;
  jaar: number; // NEW
}

export interface ImpactOnderbouwing {
  titel: string;
  onderbouwing: string;
  referenties: WetenschappelijkeReferentie[];
}

export interface WettelijkeOvertreding {
  wetboek: string;
  artikel: string;
  omschrijving: string;
  bron: string; // NEW
}

// --- Nieuwe, vereenvoudigde adviesstructuur ---
export interface Advies {
  minderjarig: boolean;
  veiligheidsadvies: string;
  professioneel_advies: string;
  juridische_opmerking: string;
}

export interface BevoegdheidscheckResult {
  is_bevoegd: boolean;
  motivering: string;
  kaders: string[];
}
// --- Einde nieuwe structuur ---

export interface Onderzoeksmethode {
  icoon: string;
  titel: string;
  omschrijving: string;
  prijsindicatie: string;
}

export interface AanbevolenOnderzoeksmethode {
  id: string;
  omschrijving: string;
}

export interface AnalysisResponse {
  samenvatting: string;
  gedragskenmerken: string[];
  mogelijke_wettelijke_overtredingen: WettelijkeOvertreding[];
  bevoegdheidscheck: BevoegdheidscheckResult;
  aanvullende_vragen: string[];
  mogelijke_onderzoeksmethoden: AanbevolenOnderzoeksmethode[]; // Changed from string[]
  advies: Advies;
  impact_onderbouwing: ImpactOnderbouwing[];
}

// FIX: Add missing type definitions that are used in various components but were not exported.
export interface Fysiologie {
  stressniveau?: number;
  slaapkwaliteit?: number;
  lichamelijke_spanning?: number;
  trend?: string;
}

export interface Kansinschatting {
  basis_context: string[];
  prior_schatting_0_1: number;
  signaal_likelihood_0_1: number;
  posterior_kans_0_1: number;
  uitleg: string;
}

export enum InputType {
  YES_NO = 'YES_NO',
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  SCALE_0_4 = 'SCALE_0_4',
  FREE_TEXT = 'FREE_TEXT',
}

export interface Verduidelijkingsvraag {
  question_id: string;
  vraag: string;
  waarom_relevant?: string;
  input_type: InputType;
  options?: string[];
  placeholder?: string;
  priority: number;
}

export interface Gedragspatroon {
  label: string;
  relevance_label: "Aanwezig" | "Nader te onderzoeken" | "Indicatief";
  why_short: string;
}

export interface Bevoegdheid {
  is_bevoegd: boolean;
  reden: string;
  advies: string;
}

export interface InitialAnalysisResponse {
  relevance_label: "Hoog prioriteit" | "Gemiddeld" | "Laag" | "Nader onderzoek nodig"; // Replaces veiligheidsscore
  gedragspatronen: Gedragspatroon[];
  verduidelijkingsvragen: Verduidelijkingsvraag[];
  bevoegdheid: Bevoegdheid;
  minor_involved: boolean;
  minor_risk_assessment: string;
}

export interface AnalysisContext {
  summary: string;
  advice: string;
  patterns: string[];
  legal_factors?: string[];
  scientific_context?: string[];
  methods?: string[];
}
