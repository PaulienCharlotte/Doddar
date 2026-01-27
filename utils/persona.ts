export const detectPersona = (text: string): 'business' | 'private' => {
  const bizHits = [
    "directie", "hr-afdeling", "hr-manager", "bedrijfsrecherche", "werkgever", 
    "personeelszaken", "arbeidscontract", "concurrentiebeding", "relatiebeding",
    "integriteitsschending", "verzuimfraude", "nevenactiviteiten", "salarisadministratie",
    "bedrijfseigendommen", "zakelijk mandaat", "compliance officer"
  ];
  const lowerText = text.toLowerCase();
  const isBiz = bizHits.some(w => lowerText.includes(w));
  return isBiz ? "business" : "private";
}