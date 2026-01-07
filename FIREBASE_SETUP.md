# Firebase 배포 설정 가이드

## 1. Firebase 프로젝트 생성

Firebase Console (https://console.firebase.google.com/)에서 두 개의 프로젝트를 생성하세요:
- Kiro 포트폴리오용 프로젝트
- Yooni 포트폴리오용 프로젝트

## 2. Firebase CLI 로그인

```bash
npx firebase login
```

## 3. Firebase 프로젝트 초기화

### Kiro 프로젝트 초기화
```bash
npx firebase init hosting --project kiro
```

질문에 답변:
- What do you want to use as your public directory? → `dist`
- Configure as a single-page app? → `Yes`
- Set up automatic builds and deploys with GitHub? → `No` (또는 원하는 대로)

### Yooni 프로젝트 초기화
```bash
npx firebase init hosting --project yooni
```

동일한 설정으로 진행하세요.

## 4. .firebaserc 파일 설정

프로젝트 루트에 `.firebaserc` 파일을 생성하고 다음과 같이 설정하세요:

```json
{
  "projects": {
    "kiro": "your-kiro-firebase-project-id",
    "yooni": "your-yooni-firebase-project-id"
  }
}
```

`your-kiro-firebase-project-id`와 `your-yooni-firebase-project-id`를 실제 Firebase 프로젝트 ID로 변경하세요.

프로젝트 ID는 Firebase Console의 프로젝트 설정에서 확인할 수 있습니다.

## 5. 배포

### Kiro 배포
```bash
npm run deploy:kiro
```

### Yooni 배포
```bash
npm run deploy:yooni
```

각 명령어는:
1. 해당 모드로 빌드 (`npm run build:kiro` 또는 `npm run build:yooni`)
2. Firebase에 배포 (`firebase deploy --project kiro` 또는 `firebase deploy --project yooni`)

## 6. 배포 확인

배포가 완료되면 Firebase Console에서 호스팅 URL을 확인할 수 있습니다.
각 프로젝트마다 고유한 URL이 생성됩니다.

