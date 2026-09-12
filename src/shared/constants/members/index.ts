import { mocoparfe } from './mocoparfe';
import { hanseorin } from './hanseorin';
import type { MemberDetail } from './types';

export type { MemberDetail };

export interface Member {
  id: string;
  nameKo: string;
  name: string;
  ink: string;
  color: string;
  avatar: string;
  position: string;
}

export const MEMBER_DETAILS: Record<string, MemberDetail | undefined> = {
  mocoparfe,
  hanseorin,
};

export const MEMBERS: Member[] = [
  {
    id: 'mocoparfe',
    nameKo: '모코 파르페',
    name: 'Moco Parfe',
    ink: '#6b2350',
    color: '#FF99FF',
    avatar: '/members/mocoparfe.png',
    position: '바리스타',
  },
  {
    id: 'hanseorin',
    nameKo: '한서린',
    name: 'Han Seorin',
    ink: '#5a1016',
    color: '#FF6666',
    avatar: '/members/hanseorin.png',
    position: '매니저',
  },
  {
    id: 'dangkey',
    nameKo: '댕키',
    name: 'Dangkey',
    ink: '#6b4a12',
    color: '#FFCC33',
    avatar: '/members/dangkey.png',
    position: '경비견',
  },
  {
    id: 'uuhee',
    nameKo: '유우희',
    name: 'Uuhee',
    ink: '#3f2a63',
    color: '#CC99FF',
    avatar: '/members/uuhee.png',
    position: '청소부 (자칭 마스코트)',
  },
  {
    id: 'aerusolstice',
    nameKo: '에루 솔스티스',
    name: 'Aeru Solstice',
    ink: '#123a63',
    color: '#CCFFFF',
    avatar: '/members/aerusolstice.png',
    position: '서빙',
  },
];
