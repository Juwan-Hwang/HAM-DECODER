/**
 * 中国业余电台呼号解码器 v2.0
 * 依据《业余无线电台呼号编制和核发要求》省级一般业余电台号段
 * logic ported to TypeScript
 */

export interface ProvinceData {
  name: string;
  zone: number;
  dualStart: string;
  dualCount: number;
  triStart: string;
  triCount: number;
  excludeTri?: boolean;
  excludeQOU?: boolean;
  extraExclude?: string[];
  _excludeList?: string[];
}

export interface DecodeResult {
  success: boolean;
  data?: {
    province: string;
    seqRegional: number;
    dualCount: number;
    triCount: number;
    part2Order: number;
    dualRange: string;
    triRange: string;
  };
  error?: string;
}

// 电台种类核发顺序（G、H、I、D、A、B、C、E、F、K、L）
export const PART2_ORDER = ['G', 'H', 'I', 'D', 'A', 'B', 'C', 'E', 'F', 'K', 'L'];

// 省级分配数据
export const PROVINCES: ProvinceData[] = [
  // 分区 1
  { name: '北京 (Beijing)', zone: 1, dualStart: 'AA', dualCount: 624, triStart: 'AAA', triCount: 16039,
    excludeTri: true, excludeQOU: true, extraExclude: ['SOS', 'XXX', 'TTT'] },
  // 分区 2
  { name: '黑龙江 (Heilongjiang)', zone: 2, dualStart: 'AA', dualCount: 208, triStart: 'AAA', triCount: 5408 },
  { name: '吉林 (Jilin)', zone: 2, dualStart: 'IA', dualCount: 208, triStart: 'IAA', triCount: 5408 },
  { name: '辽宁 (Liaoning)', zone: 2, dualStart: 'QA', dualCount: 208, triStart: 'QAA', triCount: 5223,
    excludeTri: true, excludeQOU: true, extraExclude: ['SOS', 'XXX', 'TTT'] },
  // 分区 3
  { name: '天津 (Tianjin)', zone: 3, dualStart: 'AA', dualCount: 156, triStart: 'AAA', triCount: 4056 },
  { name: '内蒙古 (Inner Mongolia)', zone: 3, dualStart: 'GA', dualCount: 156, triStart: 'GAA', triCount: 4056 },
  { name: '河北 (Hebei)', zone: 3, dualStart: 'MA', dualCount: 156, triStart: 'MAA', triCount: 4056 },
  { name: '山西 (Shanxi)', zone: 3, dualStart: 'SA', dualCount: 156, triStart: 'SAA', triCount: 4054,
    excludeTri: true, extraExclude: ['SOS', 'XXX'] },
  // 分区 4
  { name: '上海 (Shanghai)', zone: 4, dualStart: 'AA', dualCount: 208, triStart: 'AAA', triCount: 5408 },
  { name: '山东 (Shandong)', zone: 4, dualStart: 'IA', dualCount: 208, triStart: 'IAA', triCount: 5408 },
  { name: '江苏 (Jiangsu)', zone: 4, dualStart: 'QA', dualCount: 208, triStart: 'QAA', triCount: 5223,
    excludeTri: true, excludeQOU: true, extraExclude: ['SOS', 'XXX', 'TTT'] },
  // 分区 5
  { name: '浙江 (Zhejiang)', zone: 5, dualStart: 'AA', dualCount: 208, triStart: 'AAA', triCount: 5408 },
  { name: '江西 (Jiangxi)', zone: 5, dualStart: 'IA', dualCount: 208, triStart: 'IAA', triCount: 5408 },
  { name: '福建 (Fujian)', zone: 5, dualStart: 'QA', dualCount: 208, triStart: 'QAA', triCount: 5223,
    excludeTri: true, excludeQOU: true, extraExclude: ['SOS', 'XXX', 'TTT'] },
  // 分区 6
  { name: '安徽 (Anhui)', zone: 6, dualStart: 'AA', dualCount: 208, triStart: 'AAA', triCount: 5408 },
  { name: '河南 (Henan)', zone: 6, dualStart: 'IA', dualCount: 208, triStart: 'IAA', triCount: 5408 },
  { name: '湖北 (Hubei)', zone: 6, dualStart: 'QA', dualCount: 208, triStart: 'QAA', triCount: 5223,
    excludeTri: true, excludeQOU: true, extraExclude: ['SOS', 'XXX', 'TTT'] },
  // 分区 7
  { name: '湖南 (Hunan)', zone: 7, dualStart: 'AA', dualCount: 156, triStart: 'AAA', triCount: 4056 },
  { name: '广东 (Guangdong)', zone: 7, dualStart: 'GA', dualCount: 156, triStart: 'GAA', triCount: 4056 },
  { name: '广西 (Guangxi)', zone: 7, dualStart: 'MA', dualCount: 156, triStart: 'MAA', triCount: 4056 },
  { name: '海南 (Hainan)', zone: 7, dualStart: 'SA', dualCount: 156, triStart: 'SAA', triCount: 4056 },
  // 分区 8
  { name: '四川 (Sichuan)', zone: 8, dualStart: 'AA', dualCount: 156, triStart: 'AAA', triCount: 4056 },
  { name: '重庆 (Chongqing)', zone: 8, dualStart: 'GA', dualCount: 156, triStart: 'GAA', triCount: 4056 },
  { name: '贵州 (Guizhou)', zone: 8, dualStart: 'MA', dualCount: 156, triStart: 'MAA', triCount: 4056 },
  { name: '云南 (Yunnan)', zone: 8, dualStart: 'SA', dualCount: 156, triStart: 'SAA', triCount: 4056 },
  // 分区 9
  { name: '陕西 (Shaanxi)', zone: 9, dualStart: 'AA', dualCount: 156, triStart: 'AAA', triCount: 4056 },
  { name: '甘肃 (Gansu)', zone: 9, dualStart: 'GA', dualCount: 156, triStart: 'GAA', triCount: 4056 },
  { name: '宁夏 (Ningxia)', zone: 9, dualStart: 'MA', dualCount: 156, triStart: 'MAA', triCount: 4056 },
  { name: '青海 (Qinghai)', zone: 9, dualStart: 'SA', dualCount: 156, triStart: 'SAA', triCount: 4056 },
  // 分区 0
  { name: '新疆 (Xinjiang)', zone: 0, dualStart: 'AA', dualCount: 338, triStart: 'AAA', triCount: 8788 }, // Approx split A-M
  { name: '西藏 (Xizang)', zone: 0, dualStart: 'NA', dualCount: 338, triStart: 'NAA', triCount: 8788 }  // Approx split N-Z
];

// Helper to check if a char is in a range (inclusive)
const inRange = (char: string, start: string, end: string) => {
    return char >= start && char <= end;
}

// Get the end character for a range based on count
// This is a simplified estimation for the UI range display
const getEndChar = (startChar: string, count: number, isTri: boolean) => {
    const lettersPerBlock = isTri ? 26 * 26 : 26;
    const numBlocks = Math.ceil(count / lettersPerBlock);
    const startCode = startChar.charCodeAt(0);
    const endCode = startCode + numBlocks - 1;
    return String.fromCharCode(endCode);
}

export const decodeCallsign = (callsign: string): DecodeResult => {
    // Expected format B[TYPE][ZONE][SUFFIX]
    // Regex validation should be done before calling this, but we parse here safely
    const match = callsign.match(/^B([A-Z])([0-9])([A-Z0-9]{2,3})$/);
    if (!match) {
        return { success: false, error: "Format mismatch" };
    }

    const typeLetter = match[1];
    const zone = parseInt(match[2]);
    const suffix = match[3];

    // Find candidates for this zone
    const candidates = PROVINCES.filter(p => p.zone === zone);
    if (candidates.length === 0) {
        return { success: false, error: `Invalid zone: ${zone}` };
    }

    let matchedProvince: ProvinceData | null = null;
    let suffixIsTri = suffix.length === 3;

    // Determine Province based on Suffix Range
    for (const p of candidates) {
        // Check First Letter of Suffix against allocation
        // Simplified Logic: 
        // If province has Dual Start 'AA' and count 208 (8 blocks), it covers A-H.
        // If province has Tri Start 'AAA' and count 5408 (8 blocks), it covers A-H.
        
        const startLetter = suffixIsTri ? p.triStart[0] : p.dualStart[0];
        
        // Calculate number of first-letters assigned to this province
        const capacity = suffixIsTri ? p.triCount : p.dualCount;
        const blockSize = suffixIsTri ? 26 * 26 : 26;
        const numLetters = Math.ceil(capacity / blockSize); // e.g. 208/26 = 8 letters (A-H)
        
        const startCode = startLetter.charCodeAt(0);
        const endCode = startCode + numLetters - 1;
        const suffixFirstCode = suffix[0].charCodeAt(0);

        if (suffixFirstCode >= startCode && suffixFirstCode <= endCode) {
            matchedProvince = p;
            break;
        }
    }

    if (!matchedProvince) {
        // Fallback or specific error if suffix is out of all ranges
        return { success: false, error: "Suffix out of regional allocation" };
    }

    // Check specific exclusions
    if (matchedProvince.extraExclude && matchedProvince.extraExclude.includes(suffix)) {
        return { success: false, error: "Restricted suffix (Reserved)" };
    }
    
    // Calculate Rank
    // 1. Previous Types (G, H...) -> (Index in PART2_ORDER) * (DualCap + TriCap)
    // 2. Current Type:
    //    If Suffix is Dual: Index in Dual Range
    //    If Suffix is Tri: DualCap + Index in Tri Range
    
    const typeIndex = PART2_ORDER.indexOf(typeLetter);
    if (typeIndex === -1) {
        return { success: false, error: "Invalid Type Letter for General Station" };
    }

    const totalPerType = matchedProvince.dualCount + matchedProvince.triCount;
    const baseRank = typeIndex * totalPerType;
    
    let currentTypeRank = 0;
    
    // Helper to calculate offset of suffix within a range
    // Assuming continuous block. Real logic is complex with Q/O/U exclusions, 
    // but for this UI we approximate linear mapping for simplicity unless exclusion is critical.
    
    const getOffset = (s: string, startS: string) => {
        // Treat as base-26 number
        const toVal = (str: string) => {
            let val = 0;
            for (let i = 0; i < str.length; i++) {
                val = val * 26 + (str.charCodeAt(i) - 65);
            }
            return val;
        };
        return toVal(s) - toVal(startS);
    };

    if (suffixIsTri) {
        // Start after all Duals
        currentTypeRank += matchedProvince.dualCount;
        currentTypeRank += getOffset(suffix, matchedProvince.triStart) + 1;
    } else {
        currentTypeRank += getOffset(suffix, matchedProvince.dualStart) + 1;
    }

    // Construct Range Strings for UI
    const dualEndChar = getEndChar(matchedProvince.dualStart[0], matchedProvince.dualCount, false);
    const triEndChar = getEndChar(matchedProvince.triStart[0], matchedProvince.triCount, true);
    
    const dualRangeStr = `${matchedProvince.dualStart}~${dualEndChar}Z`;
    const triRangeStr = `${matchedProvince.triStart}~${triEndChar}ZZ`;

    return {
        success: true,
        data: {
            province: matchedProvince.name,
            seqRegional: baseRank + currentTypeRank,
            dualCount: matchedProvince.dualCount,
            triCount: matchedProvince.triCount,
            part2Order: typeIndex + 1,
            dualRange: dualRangeStr,
            triRange: triRangeStr
        }
    };
};