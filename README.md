# Todo List (Next.js)

할 일을 생성·조회·수정·삭제할 수 있는 Todo 서비스입니다.
진행 중(TODO)과 완료(DONE) 상태를 분리해 관리할 수 있으며,
상세 페이지에서 할 일의 상태, 메모, 이미지를 수정할 수 있습니다.

## Demo
- 배포 URL: https://todo-list-delta-liard-44.vercel.app/

## Tech Stack
- Next.js (App Router)
- TypeScript
- CSS Modules
- Vercel (Deploy)

## Features
### 공통
- 컬러 시스템 적용 (CSS Variables)
- 재사용 가능한 공용 컴포넌트 구성
- 반응형 레이아웃 지원 (Mobile / Tablet / Desktop)

### 할 일 목록 페이지(`/`)
- 목록 조회: TODO / DONE 섹션 분리
- 할 일 추가: 입력 후 `추가하기` 클릭 또는 Enter
- 할 일 완료 토글: 체크 버튼 클릭으로 진행/완료 전환
- 로고 클릭 시 `/`로 이동(새로고침)

### 할 일 상세 페이지(`/items/{itemId}`)
- 할 일 수정
  - 이름 수정
  - 상태(진행/완료) 토글
  - 메모 작성/수정
  - 이미지 1개 첨부
    - 파일명: 영문만 허용
    - 크기: 5MB 이하
  - `수정 완료` 클릭 시 수정 사항 반영되고, 상세 페이지 갱신
- 할 일 삭제
  - `삭제하기` 클릭 시 삭제 후 목록(`/`)으로 이동