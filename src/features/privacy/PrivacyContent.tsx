const LINK = 'font-bold text-accent underline-offset-4 hover:underline';

export function PrivacyContent() {
  return (
    <article className='mx-auto flex max-w-2xl flex-col gap-8 leading-relaxed'>
      <header>
        <p className='text-xs font-bold tracking-eyebrow text-text-muted'>PRIVACY</p>
        <h1 className='mt-2 font-display font-heavy text-3xl tracking-tight sm:text-4xl'>개인정보처리방침</h1>
      </header>

      <section className='flex flex-col gap-2'>
        <h2 className='font-heavy text-lg'>수집하는 정보</h2>
        <p className='text-text-muted'>
          이 사이트는 회원가입, 로그인, 댓글 기능이 없으며 방문자의 개인정보를 직접 수집하거나 저장하지 않습니다. 화면
          테마 설정만 방문자의 브라우저(localStorage)에 저장됩니다.
        </p>
      </section>

      <section className='flex flex-col gap-2'>
        <h2 className='font-heavy text-lg'>YouTube API 서비스</h2>
        <p className='text-text-muted'>
          커버곡 페이지는 YouTube API 서비스를 사용해 공개된 영상 정보를 가져오고, YouTube 플레이어로 영상을 재생합니다.
          이 페이지를 이용하면{' '}
          <a href='https://www.youtube.com/t/terms' target='_blank' rel='noopener noreferrer' className={LINK}>
            YouTube 서비스 약관
          </a>
          에 동의하는 것으로 간주됩니다. YouTube 플레이어가 처리하는 정보는{' '}
          <a href='https://policies.google.com/privacy' target='_blank' rel='noopener noreferrer' className={LINK}>
            Google 개인정보처리방침
          </a>
          을 따릅니다.
        </p>
        <p className='text-text-muted'>
          플레이어는 개인정보 보호 강화 모드(youtube-nocookie.com)로 삽입되며, 영상 정보는 서버에서 최대 6시간 동안만
          임시로 보관한 뒤 다시 받아옵니다. Google 계정의 데이터 접근 권한은{' '}
          <a href='https://myaccount.google.com/permissions' target='_blank' rel='noopener noreferrer' className={LINK}>
            Google 보안 설정
          </a>
          에서 관리할 수 있습니다.
        </p>
      </section>

      <section className='flex flex-col gap-2'>
        <h2 className='font-heavy text-lg'>문의</h2>
        <p className='text-text-muted'>
          문의는{' '}
          <a
            href='https://github.com/go-tiger/cafe-carte/issues'
            target='_blank'
            rel='noopener noreferrer'
            className={LINK}
          >
            GitHub 이슈
          </a>
          로 남겨 주세요.
        </p>
      </section>
    </article>
  );
}
