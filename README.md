# Cafe Carte 팬사이트

[Twillit Studio](https://cafe.naver.com/twillitstudio) 소속 버추얼 그룹 **Cafe Carte**의 비공식 팬사이트.

사이트: **https://go-tiger.github.io/cafe-carte/**

비공식, 비영리 팬 사이트입니다. Twillit Studio 및 Cafe Carte 공식과 어떠한 제휴 관계도 없습니다.

## 스택

- **Next.js 16** (App Router, 정적 export), **React 19**, **TypeScript**
- **Tailwind CSS v4** + 자체 디자인 토큰
- **next-themes** (라이트/다크)
- **GitHub Pages** 정적 배포 (GitHub Actions)

## 로컬 실행

```bash
git clone git@github.com:go-tiger/cafe-carte.git && cd cafe-carte
npm install
npm run dev        # http://localhost:3000
```

| 명령            | 설명                        |
| --------------- | --------------------------- |
| `npm run dev`   | 개발 서버                   |
| `npm run build` | 프로덕션 정적 빌드 (`out/`) |
| `npm run lint`  | ESLint                      |

배포 빌드는 `PAGES_BASE_PATH=/cafe-carte` 환경 변수로 base path를 주입합니다 (로컬은 루트 `/`).

## 프로젝트 구조

```
src/
  app/                 라우팅, 레이아웃, 페이지 메타데이터
  features/<도메인>/    도메인별 컴포넌트, 훅, 로직 (예: features/home)
  shared/
    ui/                재사용 UI 컴포넌트 (Button, Card, Badge 등)
    lib/               유틸 (cn, asset, color, shuffle 등)
    constants/         정적 데이터 (members 등)
    providers/         ThemeProvider
  components/           사이트 셸 공유 컴포넌트 (SiteHeader 등)
```

코드 작성 규칙은 [CONTRIBUTING.md](CONTRIBUTING.md#폴더-구조)에 있습니다.

## 에셋 출처

| 자산               | 출처                                                      | 권리                     |
| ------------------ | --------------------------------------------------------- | ------------------------ |
| 멤버 프로필 이미지 | Twillit Studio 네이버 카페 대문 이미지                    | 원저작권자(Twillit) 소유 |
| 로고               | Cafe Carte 관련 이미지                                    | 원저작권자 소유          |
| 본문 폰트          | [NanumSquareNeo](https://hangeul.naver.com/font) (네이버) | 네이버 폰트 라이선스     |
| 브랜드 아이콘      | YouTube, X, 네이버 카페, 치지직 로고를 단순화한 SVG       | 각 서비스 상표권자 소유  |

이미지, 로고, 브랜드 아이콘의 권리는 원저작권자에게 있고, 이 저장소는 팬 활동 목적으로만 사용합니다. 자세한 내용은
[LICENSE](LICENSE) 참고.

## 기여

[CONTRIBUTING.md](CONTRIBUTING.md)를 참고해 주세요.

## 라이선스

- 자체 제작 **소스 코드**: [MIT License](LICENSE)
- 자체 제작 **비코드 콘텐츠**: CC BY-NC-SA 4.0
- **Cafe Carte / Twillit Studio 자산**: 각 원저작권자 소유

전문과 팬 프로젝트 고지는 [LICENSE](LICENSE)에 있습니다. 문제가 되는 콘텐츠는 이슈로 알려 주시면 삭제하겠습니다.
