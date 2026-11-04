import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import { MEMBER_DETAILS, MEMBERS, type Member } from '@/shared/constants';
import { OG_SIZE } from '@/shared/lib';

const CREAM = '#fdfaf5';
const INK = '#2a2420';
const MUTED = '#6f655c';
const PICTOGRAPH = /\p{Extended_Pictographic}️?/gu;

async function publicImage(path: string, mime: string): Promise<string> {
  const data = await readFile(join(process.cwd(), 'public', path));
  return `data:${mime};base64,${data.toString('base64')}`;
}

async function loadFont(weight: string): Promise<Buffer> {
  return readFile(join(process.cwd(), 'node_modules/nanumsquareneo/ttf', `NanumSquareNeo-${weight}.ttf`));
}

async function render(node: React.ReactElement) {
  const [regular, heavy] = await Promise.all([loadFont('bRg'), loadFont('dEb')]);
  return new ImageResponse(node, {
    ...OG_SIZE,
    fonts: [
      { name: 'Nanum', data: regular, weight: 400, style: 'normal' },
      { name: 'Nanum', data: heavy, weight: 800, style: 'normal' },
    ],
  });
}

export async function siteOgImage() {
  const [logo, avatars] = await Promise.all([
    publicImage('/logo.png', 'image/png'),
    Promise.all(MEMBERS.map(m => publicImage(m.profile ?? m.avatar, 'image/jpeg'))),
  ]);

  return render(
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        padding: 72,
        background: CREAM,
        color: INK,
        fontFamily: 'Nanum',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
        <img src={logo} width={112} height={112} alt='' style={{ borderRadius: 56 }} />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 76, fontWeight: 800, letterSpacing: -2 }}>Cafe Carte</div>
          <div style={{ marginTop: 6, fontSize: 30, color: MUTED }}>비공식 팬사이트</div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 20, marginTop: 56 }}>
        {MEMBERS.map((m, i) => (
          <div
            key={m.id}
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: 196,
              borderRadius: 24,
              overflow: 'hidden',
              background: m.color,
            }}
          >
            <img src={avatars[i]} width={196} height={196} alt='' style={{ objectFit: 'cover' }} />
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                padding: '12px 4px',
                fontSize: 22,
                fontWeight: 800,
                color: m.ink,
              }}
            >
              {m.nameKo}
            </div>
          </div>
        ))}
      </div>
    </div>,
  );
}

export async function memberOgImage(member: Member) {
  const [profile, logo] = await Promise.all([
    publicImage(member.profile ?? member.avatar, 'image/jpeg'),
    publicImage('/logo.png', 'image/png'),
  ]);
  const bio = MEMBER_DETAILS[member.id]?.bio.replace(PICTOGRAPH, '').trim();

  return render(
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 56,
        width: '100%',
        height: '100%',
        padding: 64,
        background: member.color,
        color: member.ink,
        fontFamily: 'Nanum',
      }}
    >
      <img
        src={profile}
        width={460}
        height={460}
        alt=''
        style={{ flexShrink: 0, borderRadius: 32, objectFit: 'cover', background: '#fff' }}
      />
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
        <div
          style={{
            display: 'flex',
            alignSelf: 'flex-start',
            padding: '8px 22px',
            border: `3px solid ${member.ink}`,
            borderRadius: 999,
            fontSize: 26,
            fontWeight: 800,
          }}
        >
          {member.position}
        </div>
        <div style={{ marginTop: 22, fontSize: 78, fontWeight: 800, letterSpacing: -2, lineHeight: 1.1 }}>
          {member.nameKo}
        </div>
        <div style={{ marginTop: 8, fontSize: 34, fontWeight: 800 }}>{member.name}</div>
        {bio && <div style={{ marginTop: 22, fontSize: 28, lineHeight: 1.45 }}>{bio}</div>}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 34, fontSize: 24, fontWeight: 800 }}>
          <img src={logo} width={44} height={44} alt='' style={{ borderRadius: 22 }} />
          Cafe Carte 비공식 팬사이트
        </div>
      </div>
    </div>,
  );
}
