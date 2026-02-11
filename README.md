# HAM DECODER - Amateur Radio Callsign Decoder

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-3.5.0-green.svg)]()

[English](README.md) | [日本語](README_JA.md) | [한국어](README_KO.md) | [中文](README_ZH.md)

**HAM DECODER** is a professional, modern web application designed for decoding and analyzing amateur radio callsigns worldwide. It features deep optimization for Chinese callsigns (based on MIIT rules) while supporting international callsign resolution through integrated ITU allocation tables.

## ✨ Key Features

### 🇨🇳 Deep Analysis for Chinese Callsigns (CN Ham)
- **Precise Geolocation**: Accurately resolves provinces and detailed administrative regions (e.g., Beijing, Shanghai, Jiangsu) based on the `B[Type][Zone][Suffix]` format.
- **Issuance Rank Calculation**: Exclusive algorithm calculates the exact issuance sequence of a callsign within its province and category (e.g., the 105th license issued).
- **Resource Allocation Analysis**: Visualizes resource usage and remaining capacity for current blocks (e.g., G-Series, H-Series).
- **History Tracking**: Displays the issuance history sequence (G -> H -> I -> D -> A ...), clarifying the historical phase of the callsign.

### 🌏 International Support (Global Ham)
- **ITU Prefix Recognition**: Built-in comprehensive International Telecommunication Union (ITU) prefix table to identify countries and regions globally.
- **CQ / ITU Zones**: Automatically matches and displays the CQ Zone and ITU Zone for the callsign, aiding in contests and DXing.
- **Special Rule Parsing**: Supports internal regional logic for select countries (e.g., Japan, South Korea, Russia, USA), such as parsing JA1 as the Kanto region.

### 🖥️ Modern UI
- **Cyberpunk/Glassmorphism Design**: High-end dark UI with smooth animations.
- **Responsive Layout**: Perfectly adapted for both desktop and mobile devices.
- **Real-time Feedback**: Instant decoding as you type, no refresh required.

## 🚀 Quick Start

### Live Demo
Visit [Demo Link](#) (replace with actual link) to experience the full functionality.

### Local Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/ham-decoder.git
    cd ham-decoder
    ```

2.  **Install dependencies**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Start the development server**
    ```bash
    npm start
    # or
    yarn start
    ```

4.  Open your browser and visit `http://localhost:3000`.

## 🛠️ Tech Stack

- **Frontend Framework**: [React](https://reactjs.org/) (TypeScript)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Charts**: [Recharts](https://recharts.org/)
- **Bundler**: Webpack / Parcel (depending on configuration)

## 📂 Project Structure

```
src/
├── components/       # UI Components (Charts, Info Cards, etc.)
├── services/         # Core Logic
│   ├── analyzer.ts       # Main Analysis Entry Point
│   ├── coreLogic.ts      # Core Algorithm for CN Callsigns
│   ├── internationalData.ts # International ITU Data
│   └── translations.ts   # i18n Support
├── types.ts          # TypeScript Definitions
└── App.tsx           # Main Application Entry
```

## 📝 Contributing

Contributions are welcome! If you find a parsing error or want to add a new feature:

1.  Fork the Project.
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the Branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

## 📜 License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.

---
Made by HAMs for HAMs. 73!
