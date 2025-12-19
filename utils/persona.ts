

export const detectPersona = (text: string): 'business' | 'private' => {
  const bizHits = [
    "directie", "hr", "manager", "bedrijf", "werkgever", "magazijn", "erp", 
    "klant", "leverancier", "medewerker", "collega", "personeel", "salaris",
    "arbeidscontract", "zakelijk", "kantoor", "afdeling", "leidinggevende",
    "baas", "chef", "organisatie", "stichting", "bv", "nv", "werk", "functie",
    "verzuim", "ziekte", "diefstal op het werk", "concurrentie", "concurrentiebeding"
  ];
  const isBiz = bizHits.some(w => text.toLowerCase().includes(w));
  return isBiz ? "business" : "private";
}