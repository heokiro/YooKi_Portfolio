# YooKi Portfolio

Kiro와 Yooni 두 사람의 포트폴리오 사이트를 위한 React 프로젝트입니다.

## 기술 스택

- React
- Vite
- Styled Components

## 프로젝트 구조

```
src/
├── content/
│   ├── kiro/
│   │   └── index.js      # Kiro의 포트폴리오 데이터
│   └── yooni/
│       └── index.js       # Yooni의 포트폴리오 데이터
├── utils/
│   └── contentLoader.js   # 환경변수 기반 content 로더
├── App.jsx                # 메인 컴포넌트
└── main.jsx               # 엔트리 포인트
```

## 사용 방법

### 개발 서버 실행

```bash
# 기본 (kiro)
npm run dev

# Kiro용 개발 서버
npm run dev:kiro

# Yooni용 개발 서버
npm run dev:yooni
```

### 빌드

```bash
# Kiro용 빌드
npm run build:kiro

# Yooni용 빌드
npm run build:yooni
```

빌드된 파일은 `dist` 폴더에 생성됩니다.

## 환경변수

프로젝트는 환경변수 `VITE_PERSON`을 사용하여 kiro 또는 yooni의 데이터를 로드합니다.

- `.env.kiro` 파일에 `VITE_PERSON=kiro` 설정
- `.env.yooni` 파일에 `VITE_PERSON=yooni` 설정

빌드 시 `--mode` 옵션을 사용하면 해당 모드의 `.env` 파일이 자동으로 로드됩니다.

## 데이터 추가

각 사람의 포트폴리오 데이터는 `src/content/kiro/index.js` 또는 `src/content/yooni/index.js` 파일에 추가하세요.

```javascript
export const kiroContent = {
  name: 'Kiro',
  title: 'Developer',
  // 여기에 데이터 추가
}
```

`src/utils/contentLoader.js`의 `getContent()` 함수를 사용하여 컴포넌트에서 데이터를 가져올 수 있습니다.
