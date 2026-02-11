# HAM DECODER - アマチュア無線コールサインデコーダー

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-3.5.0-green.svg)]()

[English](README.md) | [日本語](README_JA.md) | [한국어](README_KO.md) | [中文](README_ZH.md)

**HAM DECODER** は、世界中のアマチュア無線コールサインを解読・分析するために設計された、プロフェッショナルでモダンなWebアプリケーションです。中国のコールサイン（MIIT規則に基づく）に対して高度に最適化されているほか、統合されたITU割り当てテーブルを通じて国際的なコールサインの解決もサポートしています。

## ✨ 主な機能

### 🇨🇳 中国コールサインの詳細分析 (CN Ham)
- **正確な地理的特定**: `B[タイプ][ゾーン][サフィックス]` の形式に基づいて、省や詳細な行政区画（北京、上海、江蘇など）を正確に解析します。
- **発給順位の計算**: 独自のアルゴリズムにより、その省およびカテゴリ内での正確な発給順序（例：105番目に発給された免許）を計算します。
- **リソース割り当て分析**: 現在のブロック（例：Gシリーズ、Hシリーズ）のリソース使用状況と残容量を視覚化します。
- **履歴追跡**: 発給履歴の順序（G -> H -> I -> D -> A ...）を表示し、コールサインがどの歴史的段階にあるかを明確にします。

### 🌏 国際対応 (Global Ham)
- **ITUプレフィックス認識**: 国際電気通信連合（ITU）のプレフィックス割り当て表を内蔵し、世界中の国と地域を識別します。
- **CQ / ITUゾーン**: コールサインに対応するCQゾーンとITUゾーンを自動的に照合・表示し、コンテストやDX通信を支援します。
- **特別ルールの解析**: 一部の国（日本、韓国、ロシア、米国など）の内部地域ロジック（例：JA1は関東地方）の解析をサポートしています。

### 🖥️ モダンなUI
- **サイバーパンク/グラスモーフィズムデザイン**: 滑らかなアニメーションを備えたハイエンドなダークモードUI。
- **レスポンシブレイアウト**: デスクトップとモバイルデバイスの両方に完全に対応。
- **リアルタイムフィードバック**: 入力と同時に即座にデコードし、リロードは不要です。

## 🚀 クイックスタート

👉 ブラウザで `standalone.html` を直接開いてください。  
ビルド不要、依存関係なし。

### オンラインデモ
[デモリンク](#) (実際のリンクに置き換えてください) にアクセスして、全機能を体験してください。

### ローカルインストール

1.  **リポジトリをクローン**
    ```bash
    git clone https://github.com/yourusername/ham-decoder.git
    cd ham-decoder
    ```

2.  **依存関係をインストール**
    ```bash
    npm install
    # または
    yarn install
    ```

3.  **開発サーバーを起動**
    ```bash
    npm start
    # または
    yarn start
    ```

4.  ブラウザで `http://localhost:3000` を開きます。

## 🛠️ 技術スタック

- **フロントエンドフレームワーク**: [React](https://reactjs.org/) (TypeScript)
- **スタイリング**: [Tailwind CSS](https://tailwindcss.com/)
- **チャート**: [Recharts](https://recharts.org/)
- **バンドラー**: Webpack / Parcel (設定による)

## 📂 プロジェクト構造

```
src/
├── components/       # UIコンポーネント (チャート, 情報カード等)
├── services/         # コアロジック
│   ├── analyzer.ts       # 解析エントリーポイント
│   ├── coreLogic.ts      # 中国コールサイン用コアアルゴリズム
│   ├── internationalData.ts # 国際ITUデータ
│   └── translations.ts   # 多言語サポート
├── types.ts          # TypeScript型定義
└── App.tsx           # メインアプリケーションエントリー
```

## 📝 貢献

貢献は大歓迎です！解析エラーを見つけた場合や、新機能を追加したい場合は以下のようにしてください：

1.  プロジェクトをForkします。
2.  機能ブランチを作成します (`git checkout -b feature/AmazingFeature`)。
3.  変更をコミットします (`git commit -m 'Add some AmazingFeature'`)。
4.  ブランチにPushします (`git push origin feature/AmazingFeature`)。
5.  Pull Requestを開きます。

## 📜 ライセンス

MITライセンスの下で公開されています。詳細は [LICENSE](LICENSE) をご覧ください。

---
HAMによって、HAMのために作られました。 73!
