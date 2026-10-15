import { asset } from '@/shared/lib';

/** 이모지를 public/emoji 의 Twemoji SVG 로 렌더링한다. 새 이모지는 같은 이름의 SVG 를 추가해야 한다. */
interface EmojiProps {
  children: string;
  className?: string;
}

const VARIATION_SELECTOR_16 = 0xfe0f;

function toCodePoints(segment: string): string {
  return Array.from(segment)
    .map(char => char.codePointAt(0))
    .filter((code): code is number => code !== undefined && code !== VARIATION_SELECTOR_16)
    .map(code => code.toString(16))
    .join('-');
}

export function Emoji({ children, className }: EmojiProps) {
  const segments = Array.from(new Intl.Segmenter().segment(children), s => s.segment);

  return (
    <>
      {segments.map((segment, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={`${segment}-${i}`}
          src={asset(`/emoji/${toCodePoints(segment)}.svg`)}
          alt={segment}
          className={className ?? 'inline-block size-[1.1em] align-[-0.15em]'}
        />
      ))}
    </>
  );
}
