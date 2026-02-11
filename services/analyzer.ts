import { CallsignAnalysis, RadioType } from '../types';
import { PHONETIC_MAP } from './callsignData';
import { decodeCallsign, PART2_ORDER } from './coreLogic';
import { getInternationalInfo } from './internationalData';

// Map Chinese Domestic Zone (0-9) to ITU/CQ Zones
// Based on provided documents
const CN_ZONE_MAP: Record<string, { itu: number, cq: number }> = {
    '1': { itu: 44, cq: 24 }, // Beijing
    '2': { itu: 44, cq: 24 }, // HLJ, JL, LN
    '3': { itu: 44, cq: 24 }, // TJ, NM, HB, SX
    '4': { itu: 44, cq: 24 }, // SH, SD, JS
    '5': { itu: 44, cq: 24 }, // ZJ, JX, FJ
    '6': { itu: 44, cq: 24 }, // AH, HA, HB
    '7': { itu: 44, cq: 24 }, // HN, GD, GX, HN
    '8': { itu: 43, cq: 24 }, // SC, CQ, GZ, YN (ITU 43 for West China)
    '9': { itu: 43, cq: 23 }, // NX, QH, SX, GS (ITU 43, CQ 23 for Far West)
    '0': { itu: 42, cq: 23 }, // XJ, XZ (ITU 42, CQ 23)
};

export const analyzeCallsign = (input: string): CallsignAnalysis => {
  const cleanInput = input.toUpperCase().trim();
  
  const baseResult: CallsignAnalysis = {
    isValid: false,
    callsign: cleanInput,
    prefix: '',
    typeLetter: '',
    typeCategory: RadioType.Unknown,
    zone: '',
    suffix: '',
    province: '未知',
    phonetic: [],
  };

  if (!cleanInput) return baseResult;

  // --- 1. Attempt Standard China Mainland Decode (B-Series) ---
  const chinaRegex = /^(B)([A-Z])([0-9])([A-Z0-9]{1,5})$/;
  const chinaMatch = cleanInput.match(chinaRegex);

  // Exclude Taiwan (BM-BQ, BU-BX) from this logic to let International handler pick it up
  // Taiwan is B + (M,N,O,P,Q,U,V,W,X).
  // Mainland Core Logic is G-L (General) or J,R,S,T,Y,Z (Special)
  // BY, BZ are also mainland special.
  
  if (chinaMatch) {
      const [, prefix, typeLetter, zone, suffix] = chinaMatch;
      
      const isMainlandType = PART2_ORDER.includes(typeLetter) || ['J','R','S','T','Y','Z'].includes(typeLetter);
      
      if (isMainlandType) {
          baseResult.prefix = prefix;
          baseResult.typeLetter = typeLetter;
          baseResult.zone = zone;
          baseResult.suffix = suffix;
          baseResult.phonetic = cleanInput.split('').map(char => PHONETIC_MAP[char] || char);
          
          // Inject China Zones
          if (CN_ZONE_MAP[zone]) {
              baseResult.ituZone = CN_ZONE_MAP[zone].itu;
              baseResult.cqZone = CN_ZONE_MAP[zone].cq;
              baseResult.contient = 'AS';
          }

          if (PART2_ORDER.includes(typeLetter)) {
              baseResult.typeCategory = RadioType.General;
              const coreResult = decodeCallsign(cleanInput);
              if (coreResult.success && coreResult.data) {
                  const d = coreResult.data;
                  baseResult.isValid = true;
                  baseResult.province = d.province;
                  baseResult.issuanceRank = d.seqRegional;
                  baseResult.maxPerType = d.dualCount + d.triCount;
                  baseResult.regionTotalCapacity = baseResult.maxPerType * 11;
                  const prevTypesCount = (d.part2Order - 1) * baseResult.maxPerType;
                  baseResult.currentTypeRank = d.seqRegional - prevTypesCount;
                  
                  const startStr = d.dualRange.split('~')[0] || "AA";
                  const endStr = d.triRange.split('~')[1] || "ZZZ";
                  baseResult.rangeString = `${startStr}~${endStr}`;
              } else {
                  baseResult.isValid = false;
                  baseResult.error = coreResult.error;
              }
              return baseResult;
          }
          
          // Special types (J, R, etc)
          baseResult.isValid = true;
          if (typeLetter === 'J') {
              baseResult.typeCategory = RadioType.Space;
              baseResult.province = "卫星/空间电台";
          } else if (typeLetter === 'R') {
              baseResult.typeCategory = RadioType.Repeater;
              baseResult.province = `第 ${zone} 区中继/信标`;
          } else {
              baseResult.typeCategory = RadioType.Reserved;
              baseResult.province = "保留前缀";
          }
          return baseResult;
      }
  }

  // --- 2. International / Non-Standard Decode ---
  const intlMatch = cleanInput.match(/^([A-Z0-9]{1,3})([0-9])([A-Z0-9]{1,5})$/);
  
  if (intlMatch) {
      const [, p, n, s] = intlMatch;
      const intlInfo = getInternationalInfo(p, n, s);
      
      if (intlInfo.success) {
          baseResult.isValid = true;
          baseResult.isInternational = true;
          baseResult.callsign = cleanInput;
          baseResult.prefix = p;
          baseResult.typeLetter = ""; 
          baseResult.zone = n;
          baseResult.suffix = s;
          baseResult.province = intlInfo.entity || "Unknown Entity";
          baseResult.typeCategory = RadioType.General;
          baseResult.phonetic = cleanInput.split('').map(char => PHONETIC_MAP[char] || char);
          
          baseResult.ituZone = intlInfo.itu;
          baseResult.cqZone = intlInfo.cq;
          baseResult.contient = intlInfo.continent;
          
          return baseResult;
      }
  }

  baseResult.error = "无法识别的呼号格式 (Unknown Format)";
  return baseResult;
};