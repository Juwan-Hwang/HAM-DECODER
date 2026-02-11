export enum RadioType {
  General = 'General',
  Space = 'Space',
  Repeater = 'Repeater',
  Reserved = 'Reserved',
  Unknown = 'Unknown'
}

export interface CallsignAnalysis {
  isValid: boolean;
  callsign: string;
  prefix: string;
  typeLetter: string; // May be empty for international calls
  typeCategory: RadioType;
  zone: string;
  suffix: string;
  province: string; // Used for "Country/Region" in international context
  issuanceRank?: number; // The Nth license issued (seqRegional) - Global across all types
  phonetic: string[];
  error?: string;
  
  // New Stats Fields
  maxPerType?: number;    // Capacity of a single type (e.g. G series total)
  currentTypeRank?: number; // Rank within the current type (e.g. Nth of G series)
  rangeString?: string;   // Display string for the range (e.g. "AA~XZ")
  
  // Region Stats
  regionTotalCapacity?: number; // Capacity of all 11 types (G-L) combined for this province

  // International Specifics
  isInternational?: boolean;
  ituZone?: number;
  cqZone?: number;
  contient?: string;
}