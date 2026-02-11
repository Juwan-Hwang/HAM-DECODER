# HAM DECODER - 아마추어 무선 호출부호 해독기

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-3.5.0-green.svg)]()

[English](README.md) | [日本語](README_JA.md) | [한국어](README_KO.md) | [中文](README_ZH.md)

**HAM DECODER**는 전 세계 아마추어 무선 호출부호를 해독하고 분석하기 위해 설계된 전문적이고 현대적인 웹 애플리케이션입니다. 중국 호출부호(MIIT 규칙 기반)에 대해 심층적으로 최적화되어 있으며, 통합된 ITU 할당표를 통해 국제 호출부호 분석도 지원합니다.

## ✨ 주요 기능

### 🇨🇳 중국 호출부호 심층 분석 (CN Ham)
- **정밀한 지리적 위치 파악**: `B[유형][구역][접미사]` 형식을 기반으로 성(省) 및 상세 행정 구역(예: 베이징, 상하이, 장쑤 등)을 정확하게 파악합니다.
- **발급 순위 계산**: 독자적인 알고리즘을 사용하여 해당 성 및 카테고리 내에서 호출부호의 정확한 발급 순서(예: 105번째 발급된 면허)를 계산합니다.
- **자원 할당 분석**: 현재 블록(예: G 시리즈, H 시리즈)의 자원 사용량과 남은 용량을 시각화합니다.
- **히스토리 추적**: 발급 이력 순서(G -> H -> I -> D -> A ...)를 표시하여 호출부호가 역사적으로 어느 단계에 있는지 명확히 보여줍니다.

### 🌏 국제 지원 (Global Ham)
- **ITU 접두사 인식**: 내장된 포괄적인 국제전기통신연합(ITU) 접두사 할당표를 통해 전 세계 국가 및 지역을 식별합니다.
- **CQ / ITU 구역**: 호출부호에 해당하는 CQ 구역과 ITU 구역을 자동으로 매칭하고 표시하여 콘테스트 및 DX 통신을 지원합니다.
- **특수 규칙 파싱**: 일부 국가(예: 일본, 한국, 러시아, 미국 등)의 내부 지역 로직(예: JA1은 관동 지방) 분석을 지원합니다.

### 🖥️ 현대적인 UI
- **사이버펑크/글라스모피즘 디자인**: 부드러운 애니메이션 효과가 적용된 고급스러운 다크 모드 UI.
- **반응형 레이아웃**: 데스크톱과 모바일 기기 모두에 완벽하게 적응합니다.
- **실시간 피드백**: 입력하는 즉시 해독되며 새로고침이 필요 없습니다.

## 🚀 빠른 시작

👉 브라우저에서 `standalone.html`을 직접 여세요.  
빌드나 종속성이 필요 없습니다.

### 온라인 데모
전체 기능을 체험하려면 [데모 링크](#) (실제 링크로 교체 필요)를 방문하세요.

### 로컬 설치

1.  **저장소 복제**
    ```bash
    git clone https://github.com/yourusername/ham-decoder.git
    cd ham-decoder
    ```

2.  **의존성 설치**
    ```bash
    npm install
    # 또는
    yarn install
    ```

3.  **개발 서버 시작**
    ```bash
    npm start
    # 또는
    yarn start
    ```

4.  브라우저에서 `http://localhost:3000`을 엽니다.

## 🛠️ 기술 스택

- **프론트엔드 프레임워크**: [React](https://reactjs.org/) (TypeScript)
- **스타일링**: [Tailwind CSS](https://tailwindcss.com/)
- **차트**: [Recharts](https://recharts.org/)
- **번들러**: Webpack / Parcel (설정에 따라 다름)

## 📂 프로젝트 구조

```
src/
├── components/       # UI 컴포넌트 (차트, 정보 카드 등)
├── services/         # 핵심 로직
│   ├── analyzer.ts       # 분석 진입점
│   ├── coreLogic.ts      # 중국 호출부호용 핵심 알고리즘
│   ├── internationalData.ts # 국제 ITU 데이터
│   └── translations.ts   # 다국어 지원
├── types.ts          # TypeScript 타입 정의
└── App.tsx           # 메인 애플리케이션 진입
```

## 📝 기여하기

기여는 언제나 환영합니다! 파싱 오류를 발견하거나 새로운 기능을 추가하고 싶다면:

1.  이 프로젝트를 Fork 합니다.
2.  새로운 기능 브랜치를 만듭니다 (`git checkout -b feature/AmazingFeature`).
3.  변경 사항을 커밋합니다 (`git commit -m 'Add some AmazingFeature'`).
4.  브랜치에 Push 합니다 (`git push origin feature/AmazingFeature`).
5.  Pull Request를 엽니다.

## 📜 라이선스

MIT 라이선스에 따라 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

---
HAM을 위해 HAM이 만들었습니다. 73!
