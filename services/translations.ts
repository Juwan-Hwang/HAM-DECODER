export type Lang = 'zh' | 'en';

export const translations = {
  zh: {
    // Header & Status
    system_status: "多国核心就绪 // GLOBAL CORE",
    title_main: "HAM DECODER",
    title_sub: "业余无线电呼号解码专业工具 (全球版)",
    input_placeholder: "输入呼号 (如 BG1AA, K1ABC)",
    
    // Components Titles
    structure_title: "呼号结构解析",
    detail_title: "详细数据流",
    resource_title: "资源占用分析",
    region_stats_title: "地区总量分析 (宏观)",
    chart_title: "号段容量分布",
    history_title: "发证时序",

    // Labels
    region: "所属实体/地区",
    category: "电台性质",
    rank: "发证序号",
    format: "后缀格式",
    phonetics: "字母解释",
    series_label: "系列",
    itu_zone: "ITU 分区",
    cq_zone: "CQ 分区",
    continent: "大洲",
    
    // Stats
    issued: "已发放",
    total: "总容量",
    remaining: "剩余",
    start: "起始",
    current: "当前",
    end: "结束",
    progress: "分配进度",
    region_occupancy: "地区占用率",
    region_capacity: "地区总容量",

    // Sequence
    seq_done: "已满",
    seq_now: "当前",
    seq_wait: "候补",

    // Structure Parts
    prefix: "前缀",
    type: "类型",
    zone: "分区",
    suffix: "后缀",

    // Radio Types
    type_general: '一般业余无线电台',
    type_space: '空间业余无线电台',
    type_repeater: '业余中继台/信标台',
    type_reserved: '保留呼号',
    type_unknown: '通用/未知类型',
    
    // Misc
    error_prefix: "错误",
    zone_label: "分区",
    type_label: "系列",
    live_tag: "精密算法"
  },
  en: {
    // Header & Status
    system_status: "GLOBAL CORE READY",
    title_main: "HAM DECODER",
    title_sub: "Global Callsign Analysis Tool",
    input_placeholder: "INPUT CALLSIGN (e.g. BG1AA, K1ABC)",

    // Components Titles
    structure_title: "Signal Structure",
    detail_title: "Data Stream",
    resource_title: "Allocation Analysis",
    region_stats_title: "Regional Capacity (Macro)",
    chart_title: "Block Capacity",
    history_title: "Issuance Sequence",

    // Labels
    region: "Entity/Region",
    category: "Category",
    rank: "Issuance Rank",
    format: "Suffix Format",
    phonetics: "Phonetics",
    series_label: "Series",
    itu_zone: "ITU Zone",
    cq_zone: "CQ Zone",
    continent: "Continent",

    // Stats
    issued: "Issued",
    total: "Total",
    remaining: "Remaining",
    start: "Start",
    current: "Current",
    end: "End",
    progress: "Progress",
    region_occupancy: "Occupancy",
    region_capacity: "Regional Cap",

    // Sequence
    seq_done: "FULL",
    seq_now: "NOW",
    seq_wait: "WAIT",

    // Structure Parts
    prefix: "Prefix",
    type: "Type",
    zone: "Zone",
    suffix: "Suffix",

    // Radio Types
    type_general: 'General Station',
    type_space: 'Space Station',
    type_repeater: 'Repeater/Beacon',
    type_reserved: 'Reserved',
    type_unknown: 'General/Unknown',

    // Misc
    error_prefix: "ERROR",
    zone_label: "ZONE",
    type_label: "SERIES",
    live_tag: "ALGORITHM"
  }
};