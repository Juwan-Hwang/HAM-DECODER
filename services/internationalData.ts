// Data derived from provided ITU Allocation documents
// Format: Range Start, Range End, Entity Name, Logic Key (optional), Continent, ITU, CQ

export interface CountryInfo {
  entity: string;
  itu?: number;
  cq?: number;
  continent?: string;
  note?: string;
}

// Logic for countries with complex internal structure (from document)
const REGIONAL_MATCHERS: Record<string, (prefix: string, numeral: string, suffix: string) => string> = {
  'BY_EU': (p, n, s) => { // Belarus
     const r: Record<string, string> = { '1':'Minsk City', '2':'Minsk Reg', '3':'Brest', '4':'Grodno', '6':'Vitebsk', '7':'Mogilev', '8':'Gomel' };
     return `Belarus - ${r[n] || 'General'}`;
  },
  'DE': (p, n, s) => { // Germany
      let t = "Class A";
      if(p.startsWith('DO')) t = "Class E";
      if(p.startsWith('DN')) t = "Training";
      return `Germany - ${t}`;
  },
  'IT': (p, n, s) => { // Italy
     const r: Record<string, string> = { '1':'Piemonte/Liguria', '2':'Lombardia', '3':'Veneto', '4':'Emilia-Romagna', '5':'Toscana', '6':'Marche/Abruzzo', '7':'Puglia', '8':'Campania/Calabria', '0':'Lazio/Umbria', '9':'Sicily' };
     if(p.startsWith('IT9')) return 'Italy - Sicily';
     if(p.startsWith('IS0')) return 'Italy - Sardinia';
     if(p.startsWith('IX1')) return 'Italy - Valle d\'Aosta';
     return `Italy - ${r[n] || 'General'}`;
  },
  'JP': (p, n, s) => { // Japan
      const r: Record<string, string> = { '1':'Kanto', '2':'Tokai', '3':'Kinki', '4':'Chugoku', '5':'Shikoku', '6':'Kyushu', '7':'Tohoku', '8':'Hokkaido', '9':'Hokuriku', '0':'Shin\'etsu' };
      return `Japan - ${r[n] || 'General'}`;
  },
  'KR': (p, n, s) => { // Korea
      const r: Record<string, string> = { '1':'Seoul', '2':'Incheon/Gyeonggi', '3':'Daejeon', '4':'Gwangju', '5':'Busan', '8':'Antarctic', '9':'US Personnel' };
      return `South Korea - ${r[n] || 'General'}`;
  },
  'RU': (p, n, s) => { // Russia (Simplified)
      // European Russia: 1, 3, 4, 6, 7
      // Asian Russia: 8, 9, 0
      if(['1','2','3','4','5','6','7'].includes(n)) return 'European Russia';
      if(['8','9','0'].includes(n)) return 'Asian Russia';
      return 'Russia';
  },
  'US': (p, n, s) => { // USA
      const r: Record<string, string> = { '1':'New England', '2':'NY/NJ', '3':'PA/DE/MD', '4':'Southeast', '5':'South Central', '6':'California', '7':'Northwest', '8':'Great Lakes', '9':'Midwest', '0':'Central' };
      return `USA - ${r[n] || 'General'}`;
  },
  'CA': (p, n, s) => { // Canada
      const r: Record<string, string> = { '1':'Nova Scotia/NB', '2':'Quebec', '3':'Ontario', '4':'Manitoba', '5':'Saskatchewan', '6':'Alberta', '7':'BC', '8':'NWT', '9':'NB/Yukon', '0':'Nunavut/Maritimes' };
      return `Canada - ${r[n] || 'General'}`;
  }
};

const ITU_DATA: [string, string, string, string?, string?, number?, number?][] = [
    // A Series
    ['AAA', 'ALZ', 'United States', 'US', 'NA', 6, 3],
    ['AMA', 'AOZ', 'Spain', undefined, 'EU', 27, 14],
    ['APA', 'ASZ', 'Pakistan', undefined, 'AS', 41, 21],
    ['ATA', 'AWZ', 'India', undefined, 'AS', 41, 22],
    ['AXA', 'AXZ', 'Australia', undefined, 'OC', 55, 30],
    ['AYA', 'AZZ', 'Argentina', undefined, 'SA', 14, 13],
    ['A2A', 'A2Z', 'Botswana', undefined, 'AF', 57, 38],
    ['A3A', 'A3Z', 'Tonga', undefined, 'OC', 62, 32],
    ['A4A', 'A4Z', 'Oman', undefined, 'AS', 39, 21],
    ['A5A', 'A5Z', 'Bhutan', undefined, 'AS', 41, 22],
    ['A6A', 'A6Z', 'United Arab Emirates', undefined, 'AS', 39, 21],
    ['A7A', 'A7Z', 'Qatar', undefined, 'AS', 39, 21],
    ['A8A', 'A8Z', 'Liberia', undefined, 'AF', 46, 35],
    ['A9A', 'A9Z', 'Bahrain', undefined, 'AS', 39, 21],

    // B Series
    ['BAA', 'BZZ', 'China', 'CN_MAIN', 'AS', 44, 24], // Base logic
    ['BMA', 'BXZ', 'Taiwan', undefined, 'AS', 44, 24], // Specific Taiwan blocks handled in regex usually, but covered here

    // C Series
    ['CAA', 'CEZ', 'Chile', undefined, 'SA', 14, 12],
    ['CFA', 'CKZ', 'Canada', 'CA', 'NA', 9, 5],
    ['CLA', 'CMZ', 'Cuba', undefined, 'NA', 11, 8],
    ['CNA', 'CNZ', 'Morocco', undefined, 'AF', 37, 33],
    ['COA', 'COZ', 'Cuba', undefined, 'NA', 11, 8],
    ['CPA', 'CPZ', 'Bolivia', undefined, 'SA', 12, 10],
    ['CQA', 'CUZ', 'Portugal', undefined, 'EU', 37, 14],
    ['CVA', 'CXZ', 'Uruguay', undefined, 'SA', 14, 13],
    ['CYA', 'CZZ', 'Canada', 'CA', 'NA', 9, 5],
    ['C2A', 'C2Z', 'Nauru', undefined, 'OC', 65, 31],
    ['C3A', 'C3Z', 'Andorra', undefined, 'EU', 27, 14],
    ['C4A', 'C4Z', 'Cyprus', undefined, 'AS', 39, 20],
    ['C5A', 'C5Z', 'Gambia', undefined, 'AF', 46, 35],
    ['C6A', 'C6Z', 'Bahamas', undefined, 'NA', 11, 8],
    ['C8A', 'C9Z', 'Mozambique', undefined, 'AF', 53, 37],

    // D Series
    ['DAA', 'DRZ', 'Germany', 'DE', 'EU', 27, 14],
    ['DSA', 'DTZ', 'South Korea', 'KR', 'AS', 44, 25],
    ['DUA', 'DZZ', 'Philippines', undefined, 'OC', 50, 27],
    ['D2A', 'D3Z', 'Angola', undefined, 'AF', 52, 36],
    ['D4A', 'D4Z', 'Cape Verde', undefined, 'AF', 46, 35],
    ['D5A', 'D5Z', 'Liberia', undefined, 'AF', 46, 35],
    ['D6A', 'D6Z', 'Comoros', undefined, 'AF', 53, 39],
    ['D7A', 'D9Z', 'South Korea', 'KR', 'AS', 44, 25],

    // E Series
    ['EAA', 'EHZ', 'Spain', undefined, 'EU', 27, 14],
    ['EIA', 'EJZ', 'Ireland', undefined, 'EU', 27, 14],
    ['EKA', 'EKZ', 'Armenia', undefined, 'AS', 29, 21],
    ['ELA', 'ELZ', 'Liberia', undefined, 'AF', 46, 35],
    ['EMA', 'EOZ', 'Ukraine', undefined, 'EU', 29, 16],
    ['EPA', 'EQZ', 'Iran', undefined, 'AS', 40, 21],
    ['ERA', 'ERZ', 'Moldova', undefined, 'EU', 29, 16],
    ['ESA', 'ESZ', 'Estonia', undefined, 'EU', 29, 15],
    ['ETA', 'ETZ', 'Ethiopia', undefined, 'AF', 48, 37],
    ['EUA', 'EWZ', 'Belarus', 'BY_EU', 'EU', 29, 16],
    ['EXA', 'EXZ', 'Kyrgyzstan', undefined, 'AS', 30, 17],
    ['EYA', 'EYZ', 'Tajikistan', undefined, 'AS', 30, 17],
    ['EZA', 'EZZ', 'Turkmenistan', undefined, 'AS', 30, 17],
    ['E2A', 'E2Z', 'Thailand', undefined, 'AS', 49, 26],
    ['E3A', 'E3Z', 'Eritrea', undefined, 'AF', 48, 37],
    ['E4A', 'E4Z', 'Palestine', undefined, 'AS', 39, 20],
    ['E5A', 'E5Z', 'Cook Islands', undefined, 'OC', 62, 32],
    ['E7A', 'E7Z', 'Bosnia and Herzegovina', undefined, 'EU', 28, 15],

    // F Series
    ['FAA', 'FZZ', 'France', undefined, 'EU', 27, 14],

    // G Series
    ['GAA', 'GZZ', 'United Kingdom', undefined, 'EU', 27, 14],

    // H Series
    ['HAA', 'HAZ', 'Hungary', undefined, 'EU', 28, 15],
    ['HBA', 'HBZ', 'Switzerland', undefined, 'EU', 28, 14],
    ['HCA', 'HDZ', 'Ecuador', undefined, 'SA', 12, 10],
    ['HEA', 'HEZ', 'Switzerland', undefined, 'EU', 28, 14],
    ['HFA', 'HFZ', 'Poland', undefined, 'EU', 28, 15],
    ['HGA', 'HGZ', 'Hungary', undefined, 'EU', 28, 15],
    ['HHA', 'HHZ', 'Haiti', undefined, 'NA', 11, 8],
    ['HIA', 'HIZ', 'Dominican Republic', undefined, 'NA', 11, 8],
    ['HJA', 'HKZ', 'Colombia', undefined, 'SA', 12, 9],
    ['HLA', 'HLZ', 'South Korea', 'KR', 'AS', 44, 25],
    ['HMA', 'HMZ', 'North Korea', undefined, 'AS', 44, 25],
    ['HNA', 'HNZ', 'Iraq', undefined, 'AS', 39, 21],
    ['HOA', 'HPZ', 'Panama', undefined, 'NA', 11, 7],
    ['HQA', 'HRZ', 'Honduras', undefined, 'NA', 11, 7],
    ['HSA', 'HSZ', 'Thailand', undefined, 'AS', 49, 26],
    ['HTA', 'HTZ', 'Nicaragua', undefined, 'NA', 11, 7],
    ['HUA', 'HUZ', 'El Salvador', undefined, 'NA', 11, 7],
    ['HVA', 'HVZ', 'Vatican', undefined, 'EU', 28, 15],
    ['HWA', 'HYZ', 'France', undefined, 'EU', 27, 14],
    ['HZA', 'HZZ', 'Saudi Arabia', undefined, 'AS', 39, 21],
    ['H2A', 'H2Z', 'Cyprus', undefined, 'AS', 39, 20],
    ['H3A', 'H3Z', 'Panama', undefined, 'NA', 11, 7],
    ['H4A', 'H4Z', 'Solomon Islands', undefined, 'OC', 51, 28],
    ['H6A', 'H7Z', 'Nicaragua', undefined, 'NA', 11, 7],
    ['H8A', 'H9Z', 'Panama', undefined, 'NA', 11, 7],

    // I Series
    ['IAA', 'IZZ', 'Italy', 'IT', 'EU', 28, 15],

    // J Series
    ['JAA', 'JSZ', 'Japan', 'JP', 'AS', 45, 25],
    ['JTA', 'JVZ', 'Mongolia', undefined, 'AS', 32, 23],
    ['JWA', 'JXZ', 'Norway', undefined, 'EU', 18, 14],
    ['JYA', 'JYZ', 'Jordan', undefined, 'AS', 39, 20],
    ['JZA', 'JZZ', 'Indonesia', undefined, 'OC', 54, 28],
    ['J2A', 'J2Z', 'Djibouti', undefined, 'AF', 48, 37],
    ['J3A', 'J3Z', 'Grenada', undefined, 'NA', 11, 8],
    ['J4A', 'J4Z', 'Greece', undefined, 'EU', 28, 20],
    ['J5A', 'J5Z', 'Guinea-Bissau', undefined, 'AF', 46, 35],
    ['J6A', 'J6Z', 'Saint Lucia', undefined, 'NA', 11, 8],
    ['J7A', 'J7Z', 'Dominica', undefined, 'NA', 11, 8],
    ['J8A', 'J8Z', 'Saint Vincent', undefined, 'NA', 11, 8],

    // K Series
    ['KAA', 'KZZ', 'United States', 'US', 'NA', 8, 5],

    // L Series
    ['LAA', 'LNZ', 'Norway', undefined, 'EU', 18, 14],
    ['LOA', 'LWZ', 'Argentina', undefined, 'SA', 14, 13],
    ['LXA', 'LXZ', 'Luxembourg', undefined, 'EU', 27, 14],
    ['LYA', 'LYZ', 'Lithuania', undefined, 'EU', 29, 15],
    ['LZA', 'LZZ', 'Bulgaria', undefined, 'EU', 28, 20],
    ['L2A', 'L9Z', 'Argentina', undefined, 'SA', 14, 13],

    // M Series
    ['MAA', 'MZZ', 'United Kingdom', undefined, 'EU', 27, 14],

    // N Series
    ['NAA', 'NZZ', 'United States', 'US', 'NA', 8, 5],

    // O Series
    ['OAA', 'OCZ', 'Peru', undefined, 'SA', 12, 10],
    ['ODA', 'ODZ', 'Lebanon', undefined, 'AS', 39, 20],
    ['OEA', 'OEZ', 'Austria', undefined, 'EU', 28, 15],
    ['OFA', 'OJZ', 'Finland', undefined, 'EU', 18, 15],
    ['OKA', 'OLZ', 'Czech Republic', undefined, 'EU', 28, 15],
    ['OMA', 'OMZ', 'Slovakia', undefined, 'EU', 28, 15],
    ['ONA', 'OTZ', 'Belgium', undefined, 'EU', 27, 14],
    ['OUA', 'OZZ', 'Denmark', undefined, 'EU', 18, 14],

    // P Series
    ['PAA', 'PIZ', 'Netherlands', undefined, 'EU', 27, 14],
    ['PJA', 'PJZ', 'Netherlands Antilles', undefined, 'NA', 11, 9],
    ['PKA', 'POZ', 'Indonesia', undefined, 'OC', 54, 28],
    ['PPA', 'PYZ', 'Brazil', undefined, 'SA', 15, 11],
    ['PZA', 'PZZ', 'Suriname', undefined, 'SA', 12, 9],
    ['P2A', 'P2Z', 'Papua New Guinea', undefined, 'OC', 51, 28],
    ['P3A', 'P3Z', 'Cyprus', undefined, 'AS', 39, 20],
    ['P4A', 'P4Z', 'Aruba', undefined, 'SA', 11, 9],
    ['P5A', 'P9Z', 'North Korea', undefined, 'AS', 44, 25],

    // R Series
    ['RAA', 'RZZ', 'Russia', 'RU', 'EU', 29, 16],

    // S Series
    ['SAA', 'SMZ', 'Sweden', undefined, 'EU', 18, 14],
    ['SNA', 'SRZ', 'Poland', undefined, 'EU', 28, 15],
    ['SSA', 'SSM', 'Egypt', undefined, 'AF', 38, 34],
    ['SSN', 'STZ', 'Sudan', undefined, 'AF', 48, 34],
    ['SUA', 'SUZ', 'Egypt', undefined, 'AF', 38, 34],
    ['SVA', 'SZZ', 'Greece', undefined, 'EU', 28, 20],
    ['S2A', 'S3Z', 'Bangladesh', undefined, 'AS', 41, 22],
    ['S5A', 'S5Z', 'Slovenia', undefined, 'EU', 28, 15],
    ['S6A', 'S6Z', 'Singapore', undefined, 'AS', 54, 28],
    ['S7A', 'S7Z', 'Seychelles', undefined, 'AF', 53, 39],
    ['S8A', 'S8Z', 'South Africa', undefined, 'AF', 57, 38],
    ['S9A', 'S9Z', 'Sao Tome', undefined, 'AF', 47, 36],

    // T Series
    ['TAA', 'TCZ', 'Turkey', undefined, 'EU', 39, 20],
    ['TDA', 'TDZ', 'Guatemala', undefined, 'NA', 11, 7],
    ['TEA', 'TEZ', 'Costa Rica', undefined, 'NA', 11, 7],
    ['TFA', 'TFZ', 'Iceland', undefined, 'EU', 17, 40],
    ['TGA', 'TGZ', 'Guatemala', undefined, 'NA', 11, 7],
    ['THA', 'THZ', 'France', undefined, 'EU', 27, 14],
    ['TIA', 'TIZ', 'Costa Rica', undefined, 'NA', 11, 7],
    ['TJA', 'TJZ', 'Cameroon', undefined, 'AF', 47, 36],
    ['TKA', 'TKZ', 'France', undefined, 'EU', 27, 14],
    ['TLA', 'TLZ', 'Central African Republic', undefined, 'AF', 47, 36],
    ['TMA', 'TMZ', 'France', undefined, 'EU', 27, 14],
    ['TNA', 'TNZ', 'Congo (Republic)', undefined, 'AF', 52, 36],
    ['TOA', 'TQZ', 'France', undefined, 'EU', 27, 14],
    ['TRA', 'TRZ', 'Gabon', undefined, 'AF', 52, 36],
    ['TSA', 'TSZ', 'Tunisia', undefined, 'AF', 37, 33],
    ['TTA', 'TTZ', 'Chad', undefined, 'AF', 47, 36],
    ['TUA', 'TUZ', 'Ivory Coast', undefined, 'AF', 46, 35],
    ['TVA', 'TXZ', 'France', undefined, 'EU', 27, 14],
    ['TYA', 'TYZ', 'Benin', undefined, 'AF', 46, 35],
    ['TZA', 'TZZ', 'Mali', undefined, 'AF', 46, 35],
    ['T2A', 'T2Z', 'Tuvalu', undefined, 'OC', 65, 31],
    ['T3A', 'T3Z', 'Kiribati', undefined, 'OC', 65, 31],
    ['T4A', 'T4Z', 'Cuba', undefined, 'NA', 11, 8],
    ['T5A', 'T5Z', 'Somalia', undefined, 'AF', 48, 37],
    ['T6A', 'T6Z', 'Afghanistan', undefined, 'AS', 40, 21],
    ['T7A', 'T7Z', 'San Marino', undefined, 'EU', 28, 15],
    ['T8A', 'T8Z', 'Palau', undefined, 'OC', 64, 27],

    // U Series
    ['UAA', 'UIZ', 'Russia', 'RU', 'EU', 29, 16],
    ['UJA', 'UMZ', 'Uzbekistan', undefined, 'AS', 30, 17],
    ['UNA', 'UQZ', 'Kazakhstan', undefined, 'AS', 30, 17],
    ['URA', 'UZZ', 'Ukraine', undefined, 'EU', 29, 16],

    // V Series
    ['VAA', 'VGZ', 'Canada', 'CA', 'NA', 9, 5],
    ['VHA', 'VNZ', 'Australia', undefined, 'OC', 55, 30],
    ['VOA', 'VOZ', 'Canada', 'CA', 'NA', 9, 5],
    ['VPA', 'VQZ', 'United Kingdom (Overseas)', undefined, 'NA', 11, 8],
    ['VRA', 'VRZ', 'Hong Kong', undefined, 'AS', 44, 24],
    ['VSA', 'VSZ', 'United Kingdom', undefined, 'EU', 27, 14],
    ['VTA', 'VWZ', 'India', undefined, 'AS', 41, 22],
    ['VXA', 'VYZ', 'Canada', 'CA', 'NA', 9, 5],
    ['VZA', 'VZZ', 'Australia', undefined, 'OC', 55, 30],
    ['V2A', 'V2Z', 'Antigua and Barbuda', undefined, 'NA', 11, 8],
    ['V3A', 'V3Z', 'Belize', undefined, 'NA', 11, 7],
    ['V4A', 'V4Z', 'Saint Kitts and Nevis', undefined, 'NA', 11, 8],
    ['V5A', 'V5Z', 'Namibia', undefined, 'AF', 57, 38],
    ['V6A', 'V6Z', 'Micronesia', undefined, 'OC', 65, 27],
    ['V7A', 'V7Z', 'Marshall Islands', undefined, 'OC', 65, 31],
    ['V8A', 'V8Z', 'Brunei', undefined, 'OC', 65, 31],

    // W Series
    ['WAA', 'WZZ', 'United States', 'US', 'NA', 8, 5],

    // X Series
    ['XAA', 'XIZ', 'Mexico', undefined, 'NA', 10, 6],
    ['XJA', 'XOZ', 'Canada', 'CA', 'NA', 9, 5],
    ['XPA', 'XPZ', 'Denmark', undefined, 'EU', 18, 14],
    ['XQA', 'XRZ', 'Chile', undefined, 'SA', 14, 12],
    ['XSA', 'XSZ', 'China', 'CN_MAIN', 'AS', 44, 24],
    ['XTA', 'XTZ', 'Burkina Faso', undefined, 'AF', 46, 35],
    ['XUA', 'XUZ', 'Cambodia', undefined, 'AS', 49, 26],
    ['XVA', 'XVZ', 'Vietnam', undefined, 'AS', 49, 26],
    ['XWA', 'XWZ', 'Laos', undefined, 'AS', 49, 26],
    ['XXA', 'XXZ', 'Macau', undefined, 'AS', 44, 24],
    ['XYA', 'XZZ', 'Myanmar', undefined, 'AS', 49, 26],

    // Y Series
    ['YAA', 'YAZ', 'Afghanistan', undefined, 'AS', 40, 21],
    ['YBA', 'YHZ', 'Indonesia', undefined, 'OC', 54, 28],
    ['YIA', 'YIZ', 'Iraq', undefined, 'AS', 39, 21],
    ['YJA', 'YJZ', 'Vanuatu', undefined, 'OC', 56, 32],
    ['YKA', 'YKZ', 'Syria', undefined, 'AS', 39, 20],
    ['YLA', 'YLZ', 'Latvia', undefined, 'EU', 29, 15],
    ['YMA', 'YMZ', 'Turkey', undefined, 'EU', 39, 20],
    ['YNA', 'YNZ', 'Nicaragua', undefined, 'NA', 11, 7],
    ['YOA', 'YRZ', 'Romania', undefined, 'EU', 28, 20],
    ['YSA', 'YSZ', 'El Salvador', undefined, 'NA', 11, 7],
    ['YTA', 'YUZ', 'Serbia', undefined, 'EU', 28, 15],
    ['YVA', 'YYZ', 'Venezuela', undefined, 'SA', 12, 9],
    ['Y2A', 'Y9Z', 'Germany', 'DE', 'EU', 27, 14],

    // Z Series
    ['ZAA', 'ZAZ', 'Albania', undefined, 'EU', 28, 15],
    ['ZBA', 'ZJZ', 'United Kingdom', undefined, 'EU', 27, 14],
    ['ZKA', 'ZMZ', 'New Zealand', undefined, 'OC', 60, 32],
    ['ZNA', 'ZOZ', 'United Kingdom', undefined, 'EU', 27, 14],
    ['ZPA', 'ZPZ', 'Paraguay', undefined, 'SA', 14, 11],
    ['ZQA', 'ZQZ', 'United Kingdom', undefined, 'EU', 27, 14],
    ['ZRA', 'ZUZ', 'South Africa', undefined, 'AF', 57, 38],
    ['ZVA', 'ZZZ', 'Brazil', undefined, 'SA', 15, 11],
    ['Z2A', 'Z2Z', 'Zimbabwe', undefined, 'AF', 53, 38],
    ['Z3A', 'Z3Z', 'North Macedonia', undefined, 'EU', 28, 15],
    ['Z8A', 'Z8Z', 'South Sudan', undefined, 'AF', 47, 34],

    // Numbers
    ['2AA', '2ZZ', 'United Kingdom', undefined, 'EU', 27, 14],
    ['3AA', '3AZ', 'Monaco', undefined, 'EU', 27, 14],
    ['3BA', '3BZ', 'Mauritius', undefined, 'AF', 53, 39],
    ['3CA', '3CZ', 'Equatorial Guinea', undefined, 'AF', 47, 36],
    ['3DA', '3DM', 'Eswatini', undefined, 'AF', 57, 38],
    ['3DN', '3DZ', 'Fiji', undefined, 'OC', 56, 32],
    ['3EA', '3FZ', 'Panama', undefined, 'NA', 11, 7],
    ['3GA', '3GZ', 'Chile', undefined, 'SA', 14, 12],
    ['3HA', '3UZ', 'China', 'CN_MAIN', 'AS', 44, 24],
    ['3VA', '3VZ', 'Tunisia', undefined, 'AF', 37, 33],
    ['3WA', '3WZ', 'Vietnam', undefined, 'AS', 49, 26],
    ['3XA', '3XZ', 'Guinea', undefined, 'AF', 46, 35],
    ['3YA', '3YZ', 'Norway', undefined, 'EU', 18, 14],
    ['3ZA', '3ZZ', 'Poland', undefined, 'EU', 28, 15],
    ['4AA', '4CZ', 'Mexico', undefined, 'NA', 10, 6],
    ['4DA', '4IZ', 'Philippines', undefined, 'OC', 50, 27],
    ['4JA', '4KZ', 'Azerbaijan', undefined, 'AS', 29, 21],
    ['4LA', '4LZ', 'Georgia', undefined, 'AS', 29, 21],
    ['4MA', '4MZ', 'Venezuela', undefined, 'SA', 12, 9],
    ['4OA', '4OZ', 'Montenegro', undefined, 'EU', 28, 15],
    ['4PA', '4SZ', 'Sri Lanka', undefined, 'AS', 41, 22],
    ['4TA', '4TZ', 'Peru', undefined, 'SA', 12, 10],
    ['4UA', '4UZ', 'United Nations', undefined, 'EU', 28, 14],
    ['4VA', '4VZ', 'Haiti', undefined, 'NA', 11, 8],
    ['4WA', '4WZ', 'Timor-Leste', undefined, 'OC', 54, 28],
    ['4XA', '4XZ', 'Israel', undefined, 'AS', 39, 20],
    ['4YA', '4YZ', 'ICAO', undefined, 'NA', 9, 5],
    ['4ZA', '4ZZ', 'Israel', undefined, 'AS', 39, 20],
    ['5AA', '5AZ', 'Libya', undefined, 'AF', 38, 34],
    ['5BA', '5BZ', 'Cyprus', undefined, 'AS', 39, 20],
    ['5CA', '5GZ', 'Morocco', undefined, 'AF', 37, 33],
    ['5HA', '5IZ', 'Tanzania', undefined, 'AF', 53, 37],
    ['5JA', '5KZ', 'Colombia', undefined, 'SA', 12, 9],
    ['5LA', '5MZ', 'Liberia', undefined, 'AF', 46, 35],
    ['5NA', '5OZ', 'Nigeria', undefined, 'AF', 46, 35],
    ['5PA', '5QZ', 'Denmark', undefined, 'EU', 18, 14],
    ['5RA', '5SZ', 'Madagascar', undefined, 'AF', 53, 39],
    ['5TA', '5TZ', 'Mauritania', undefined, 'AF', 46, 35],
    ['5UA', '5UZ', 'Niger', undefined, 'AF', 46, 35],
    ['5VA', '5VZ', 'Togo', undefined, 'AF', 46, 35],
    ['5WA', '5WZ', 'Samoa', undefined, 'OC', 62, 32],
    ['5XA', '5XZ', 'Uganda', undefined, 'AF', 48, 37],
    ['5YA', '5ZZ', 'Kenya', undefined, 'AF', 48, 37],
    ['6AA', '6BZ', 'Egypt', undefined, 'AF', 38, 34],
    ['6CA', '6CZ', 'Syria', undefined, 'AS', 39, 20],
    ['6DA', '6JZ', 'Mexico', undefined, 'NA', 10, 6],
    ['6KA', '6NZ', 'South Korea', 'KR', 'AS', 44, 25],
    ['6OA', '6OZ', 'Somalia', undefined, 'AF', 48, 37],
    ['6PA', '6SZ', 'Pakistan', undefined, 'AS', 41, 21],
    ['6TA', '6UZ', 'Sudan', undefined, 'AF', 48, 34],
    ['6VA', '6WZ', 'Senegal', undefined, 'AF', 46, 35],
    ['6XA', '6XZ', 'Madagascar', undefined, 'AF', 53, 39],
    ['6YA', '6YZ', 'Jamaica', undefined, 'NA', 11, 8],
    ['6ZA', '6ZZ', 'Liberia', undefined, 'AF', 46, 35],
    ['7AA', '7IZ', 'Indonesia', undefined, 'OC', 54, 28],
    ['7JA', '7NZ', 'Japan', 'JP', 'AS', 45, 25],
    ['7OA', '7OZ', 'Yemen', undefined, 'AS', 39, 21],
    ['7PA', '7PZ', 'Lesotho', undefined, 'AF', 57, 38],
    ['7QA', '7QZ', 'Malawi', undefined, 'AF', 53, 37],
    ['7RA', '7RZ', 'Algeria', undefined, 'AF', 37, 33],
    ['7SA', '7SZ', 'Sweden', undefined, 'EU', 18, 14],
    ['7TA', '7YZ', 'Algeria', undefined, 'AF', 37, 33],
    ['7ZA', '7ZZ', 'Saudi Arabia', undefined, 'AS', 39, 21],
    ['8AA', '8IZ', 'Indonesia', undefined, 'OC', 54, 28],
    ['8JA', '8NZ', 'Japan', 'JP', 'AS', 45, 25],
    ['8OA', '8OZ', 'Botswana', undefined, 'AF', 57, 38],
    ['8PA', '8PZ', 'Barbados', undefined, 'NA', 11, 8],
    ['8QA', '8QZ', 'Maldives', undefined, 'AS', 41, 22],
    ['8RA', '8RZ', 'Guyana', undefined, 'SA', 12, 9],
    ['8SA', '8SZ', 'Sweden', undefined, 'EU', 18, 14],
    ['8TA', '8YZ', 'India', undefined, 'AS', 41, 22],
    ['8ZA', '8ZZ', 'Saudi Arabia', undefined, 'AS', 39, 21],
    ['9AA', '9AZ', 'Croatia', undefined, 'EU', 28, 15],
    ['9BA', '9DZ', 'Iran', undefined, 'AS', 40, 21],
    ['9EA', '9FZ', 'Ethiopia', undefined, 'AF', 48, 37],
    ['9GA', '9GZ', 'Ghana', undefined, 'AF', 46, 35],
    ['9HA', '9HZ', 'Malta', undefined, 'EU', 28, 15],
    ['9IA', '9JZ', 'Zambia', undefined, 'AF', 53, 36],
    ['9KA', '9KZ', 'Kuwait', undefined, 'AS', 39, 21],
    ['9LA', '9LZ', 'Sierra Leone', undefined, 'AF', 46, 35],
    ['9MA', '9MZ', 'Malaysia', undefined, 'AS', 54, 28],
    ['9NA', '9NZ', 'Nepal', undefined, 'AS', 42, 22],
    ['9OA', '9TZ', 'DR Congo', undefined, 'AF', 52, 36],
    ['9UA', '9UZ', 'Burundi', undefined, 'AF', 52, 36],
    ['9VA', '9VZ', 'Singapore', undefined, 'AS', 54, 28],
    ['9WA', '9WZ', 'Malaysia', undefined, 'AS', 54, 28],
    ['9XA', '9XZ', 'Rwanda', undefined, 'AF', 52, 36],
    ['9YA', '9ZZ', 'Trinidad and Tobago', undefined, 'SA', 11, 9]
];

export const getInternationalInfo = (prefix: string, numeral: string, suffix: string) => {
    // Normalize prefix to 3 chars for comparison (e.g. "K" -> "KAA")
    const pFull = prefix.length === 1 ? prefix + "AA" : (prefix.length === 2 ? prefix + "A" : prefix);
    
    for (const [start, end, entity, logicKey, cont, itu, cq] of ITU_DATA) {
        if (pFull >= start && pFull <= end) {
            let entityName = entity;
            
            // Apply specific country logic if available
            if (logicKey && REGIONAL_MATCHERS[logicKey]) {
                entityName = REGIONAL_MATCHERS[logicKey](prefix, numeral, suffix);
            }
            
            return {
                entity: entityName,
                continent: cont,
                itu,
                cq,
                success: true
            };
        }
    }
    
    return { success: false };
}