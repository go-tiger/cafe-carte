# 기여 가이드

Cafe Carte 팬사이트에 관심 가져 주셔서 감사합니다. 버그 수정, 문구 다듬기, 디자인, 문서, 데이터, 코드 모두 환영합니다.

## 시작하기 전

- 이슈와 논의를 먼저 확인해 주세요.
- 외부 기여는 fork 후 짧은 브랜치명을 사용합니다: `fix/hero-hover`, `docs/readme` 등.
- 작업 전 [README](README.md#로컬-실행)의 로컬 실행 가이드대로 환경을 구성하세요. 패키지 매니저는 `npm`을 사용합니다.

## 일반적인 기여

1. `main`에서 분기합니다.
2. 문제를 푸는 가장 작은 변경을 합니다.
3. 관련 문서·문구도 함께 갱신합니다.
4. 아래 "작업 확인"을 실행합니다.
5. `main`을 대상으로 Pull Request를 엽니다.

- **PR 하나 = 문제 하나.** 작업 중 다른 문제를 발견하면 별도 이슈나 PR로 분리합니다.
- 커밋 메시지는 `type: 한글 설명` 형식, 제목 한 줄, 본문 없음. 타입: `feat` · `fix` · `chore` · `refactor` · `docs` ·
  `style`

## 코드가 사는 곳

| 경로                     | 용도                                |
| ------------------------ | ----------------------------------- |
| `src/app/`               | 라우팅, 레이아웃, 페이지 메타데이터 |
| `src/features/<도메인>/` | 도메인별 컴포넌트·훅·로직           |
| `src/shared/`            | 재사용 UI, 유틸, providers, 상수    |
| `src/components/`        | 사이트 셸 공유 컴포넌트             |

- deep relative import 대신 `@/features/*` · `@/shared/*` 별칭과 슬라이스 배럴(`index.ts`)을 사용합니다.
- 섹션 파일이 1개면 flat, 2개 이상이면 폴더로 만듭니다.

## 코드 작성

- strict TypeScript. `any`로 오류를 넘기지 말고, 기존 타입을 먼저 재사용합니다.
- early return을 쓰고, 미사용 import·변수·죽은 코드는 제거합니다.
- 스타일은 Tailwind CSS v4와 `globals.css`의 시맨틱 토큰을 사용합니다. `text-[10px]` 같은 arbitrary 값, 하드코딩 색상,
  인라인 SVG 아이콘은 지양합니다.
- 조건부 클래스는 `@/shared/lib`의 `cn`을 사용합니다.
- 멤버색 대비가 필요하면 `src/shared/lib/color.ts`의 `getContrastColor` / `getMemberSurface`를 사용합니다.
- `prefers-reduced-motion` 설정을 존중합니다.

## 작업 확인

PR을 열기 전에 실행하세요:

```bash
npm run lint
npm run build
```

## Pull Request

리뷰하기 좋은 PR:

- [ ] 문제와 해결 방법 요약
- [ ] 관련 이슈·논의 링크
- [ ] UI 변경은 스크린샷 (필요하면 모바일 포함)

다음은 포함하지 마세요:

- 자격 증명, 생성 파일
- 무관한 리팩터, 저장소 전체 포맷 변경

리뷰 피드백은 후속 커밋으로 반영하고, 요청받지 않는 한 리뷰 맥락을 지우는 force-push는 하지 않습니다.

## 라이선스와 저작권

기여하면 자체 제작 코드는 MIT, 자체 제작 비코드 콘텐츠는 CC BY-NC-SA 4.0으로 배포되는 데 동의하는 것으로 봅니다. 자세한
내용은 [LICENSE](LICENSE)를 참고하세요.

이 프로젝트는 비공식 팬 프로젝트입니다. Cafe Carte, Twillit Studio 및 그 밖의 원저작권자의 권리를 존중해 주세요.
