# RAG AI 챗봇 관리 시스템 - 프론트엔드

RAG 기반 카카오워크 AI 챗봇 및 데이터 관리 시스템의 웹 어드민 인터페이스입니다.

## 🚀 주요 기능

### 인증 및 회원 관리
- 로그인 / 회원가입
- 이메일 기반 초대 시스템
- 권한 기반 접근 제어 (User, Admin, Master, Super Master)

### 대시보드
- 실시간 통계 (질의 수, 응답 성공률, 평균 응답 시간, 사용자 만족도)
- 일별 질의량 추이 그래프
- 응답 유형 분포 (FAQ, 용어정의, 스몰톡)
- 가장 많이 참조된 문서 TOP 5
- FAQ 등록 제안 승인/거절

### 문서 관리
- 문서 업로드 (PDF, DOCX, TXT, XLSX, CSV, JSON - 최대 5MB)
- 문서 검색 및 필터링
- 접근 권한 설정 (전체 공개, 부서 내 공개, 관리자만)
- 문서 상태 관리 (승인됨, 대기중, 거절됨)
- 태그 기반 분류

### FAQ 관리
- FAQ 등록, 수정, 삭제
- 태그 기반 분류 및 검색
- 부서별 FAQ 관리
- 참고 문헌 연결

### 부서 관리
- 부서 생성, 수정, 삭제
- 조직도 시각화
- 계층형 부서 구조
- 사용자 초대 및 권한 할당

### 챗봇 테스트
- 실시간 챗봇 응답 테스트
- 응답 타입 설정 (더 자세하게, 더 빠르게, 혼합)
- 응답 시간 및 참조 문서 확인
- 응답 유형 태그 표시

### 로그 관리
- 질문 로그 (질의/응답, 응답 시간, 피드백)
- 관리자 활동 로그
- 에러 로그
- 로그 검색 및 필터링
- 로그 내보내기 (CSV/XLSX)

### 마이페이지
- 프로필 정보 확인
- 닉네임 수정
- 비밀번호 변경

## 🛠️ 기술 스택

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React

## 📦 설치 및 실행

### 1. 의존성 설치
```bash
npm install
```

### 2. 개발 서버 실행
```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

### 3. 프로덕션 빌드
```bash
npm run build
npm start
```

## 🔐 테스트 계정

- **이메일**: admin@company.com
- **비밀번호**: password
- **권한**: Master

## 📁 프로젝트 구조

```
rag-admin-frontend/
├── app/
│   ├── login/              # 로그인 페이지
│   ├── signup/             # 회원가입 페이지
│   ├── dashboard/          # 대시보드
│   ├── documents/          # 문서 관리
│   ├── faq/                # FAQ 관리
│   ├── departments/        # 부서 관리
│   ├── chatbot-test/       # 챗봇 테스트
│   ├── logs/               # 로그 관리
│   ├── profile/            # 마이페이지
│   ├── layout.tsx          # 루트 레이아웃
│   ├── page.tsx            # 홈 페이지
│   └── globals.css         # 글로벌 스타일
├── components/
│   └── Sidebar.tsx         # 사이드바 네비게이션
├── lib/
│   └── mockData.ts         # Mock 데이터
└── public/                 # 정적 파일
```

## 🎨 주요 페이지

### 대시보드
- URL: `/dashboard`
- 시스템 전체 통계 및 분석
- FAQ 제안 승인/거절
- 실시간 데이터 시각화

### 문서 관리
- URL: `/documents`
- 문서 업로드, 조회, 수정, 삭제
- 문서 검색 및 필터링
- 접근 권한 관리

### FAQ 관리
- URL: `/faq`
- FAQ 등록, 수정, 삭제
- 태그 기반 분류
- 부서별 관리

### 챗봇 테스트
- URL: `/chatbot-test`
- 실시간 챗봇 테스트
- 응답 타입 설정
- 성능 모니터링

## 📝 Mock 데이터

현재 프로젝트는 Mock 데이터를 사용하고 있습니다. API 연동 시 다음 파일을 수정하세요:
- `lib/mockData.ts`: Mock 데이터 정의
- 각 페이지 컴포넌트: API 호출 로직 추가

## 🔄 API 연동 가이드

1. **환경 변수 설정**
   `.env.local` 파일 생성:
   ```
   NEXT_PUBLIC_API_URL=http://your-api-url
   ```

2. **API 클라이언트 생성**
   `lib/api.ts` 파일을 만들어 API 호출 로직 구현

3. **Mock 데이터 대체**
   각 페이지에서 `mockData` import를 실제 API 호출로 교체

## 🎯 향후 개선 사항

- [ ] 실제 API 연동
- [ ] 실시간 알림 시스템
- [ ] 다크 모드
- [ ] 다국어 지원
- [ ] 고급 검색 필터
- [ ] 문서 미리보기
- [ ] 파일 드래그 앤 드롭
- [ ] 무한 스크롤 / 페이지네이션
- [ ] 응답 캐싱

## 📄 라이센스

이 프로젝트는 내부 사용을 위한 것입니다.

## 👥 개발팀

G.O.A.T Team
- Backend: 김경규(TL), 한웅재, 김원종, 심세원
- Frontend: 추민기, 정명성
- Infrastructure: 정장우
- AI: 권도윤
