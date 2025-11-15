

export const detectPersona = (text: string): 'business' | 'private' => {
  const bizHits = ["directie","hr","manager","bedrijf","werkgever","magazijn","erp","klant","leverancier", "medewerker", "collega"];
  const isBiz = bizHits.some(w => text.toLowerCase().includes(w));
  return isBiz ? "business" : "private";
}