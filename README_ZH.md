# HAM DECODER - 业余无线电呼号解码器

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-3.5.0-green.svg)]()

[English](README.md) | [日本語](README_JA.md) | [한국어](README_KO.md) | [中文](README_ZH.md)

**HAM DECODER** 是一个专业的、现代化的 Web 应用程序，专为解码和分析全球业余无线电呼号而设计。它特别针对中国呼号（根据工信部规则）进行了深度优化，同时通过整合 ITU 分配表支持国际呼号的解析。

## ✨ 主要功能

### 🇨🇳 中国呼号深度解析 (CN Ham)
- **精准的地理定位**：基于 `B[类型][分区][后缀]` 格式，精确解析省份和详细行政区域（如北京、上海、江苏等）。
- **发证顺位计算**：独家算法，计算当前呼号在所属省份、所属类别中的具体发证序号（例如：第 105 位执照）。
- **资源占用分析**：可视化展示当前号段（如 G 系列、H 系列）的资源使用情况和剩余容量。
- **历史序列追踪**：展示呼号类型的发证历史（G -> H -> I -> D -> A ...），明确当前呼号所处的历史阶段。

### 🌏 国际呼号支持 (Global Ham)
- **ITU 前缀识别**：内置完整的国际电信联盟 (ITU) 前缀分配表，支持识别全球所有国家和地区。
- **CQ / ITU 分区**：自动匹配并显示呼号所属的 CQ 分区和 ITU 分区，辅助通联竞赛。
- **特殊规则解析**：支持部分国家（如日本、韩国、俄罗斯、美国等）的内部区域逻辑解析（例如 JA1 代表关东地区）。

### 🖥️ 现代化界面
- **赛博朋克/玻璃拟态设计**：高端的暗色系 UI，配合流畅的动画效果。
- **响应式布局**：完美适配桌面端和移动端设备。
- **实时反馈**：输入时即时解码，无需等待刷新。

## 🚀 快速开始

### 在线演示
访问 [Demo Link](#) (请替换为实际链接) 体验完整功能。

### 本地部署

1.  **克隆仓库**
    ```bash
    git clone https://github.com/yourusername/ham-decoder.git
    cd ham-decoder
    ```

2.  **安装依赖**
    ```bash
    npm install
    # 或
    yarn install
    ```

3.  **启动开发服务器**
    ```bash
    npm start
    # 或
    yarn start
    ```

4.  打开浏览器访问 `http://localhost:3000`。

## 🛠️ 技术栈

- **前端框架**: [React](https://reactjs.org/) (TypeScript)
- **样式**: [Tailwind CSS](https://tailwindcss.com/)
- **图表**: [Recharts](https://recharts.org/)
- **打包工具**: Webpack / Parcel (视具体配置而定)

## 📂 项目结构

```
src/
├── components/       # UI 组件 (图表, 信息卡片等)
├── services/         # 核心逻辑
│   ├── analyzer.ts       # 呼号解析入口
│   ├── coreLogic.ts      # 中国呼号核心算法
│   ├── internationalData.ts # 国际 ITU 数据
│   └── translations.ts   # 多语言支持
├── types.ts          # TypeScript 类型定义
└── App.tsx           # 主应用程序入口
```

## 📝 贡献指南

我们欢迎任何形式的贡献！如果您发现了解析错误或想添加新的功能：

1.  Fork 本仓库。
2.  创建您的特性分支 (`git checkout -b feature/AmazingFeature`)。
3.  提交您的更改 (`git commit -m 'Add some AmazingFeature'`)。
4.  推送到分支 (`git push origin feature/AmazingFeature`)。
5.  开启一个 Pull Request。

## 📜 许可证

本项目基于 MIT 许可证开源。详情请参阅 [LICENSE](LICENSE) 文件。

---
由 HAM 为 HAM 制作 73!
