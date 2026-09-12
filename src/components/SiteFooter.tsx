export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className='border-t border-border px-6 py-16 sm:px-10'>
      <div className='mx-auto flex max-w-5xl flex-col items-center gap-3 text-center'>
        <p className='text-xs leading-relaxed text-text-muted'>
          비공식 팬사이트입니다. Twillet Studio 및 Cafe Carte 공식과 무관하며, 모든 캐릭터·이미지·상표의 권리는
          <br className='hidden sm:block' /> 각 원저작권자에게 있습니다.
        </p>
        <p className='text-xs text-text-muted'>Cafe Carte / Twillet Studio · &copy; {year} go-tiger</p>
      </div>
    </footer>
  );
}
