import { mocoparfe } from './mocoparfe';
import { hanseorin } from './hanseorin';
import { dangkey } from './dangkey';
import { uuhee } from './uuhee';
import { aerusolstice } from './aerusolstice';
import type { MemberDetail } from './types';

export type { MemberDetail };

export interface Member {
  id: string;
  nameKo: string;
  name: string;
  ink: string;
  color: string;
  avatar: string;
  profile?: string;
  position: string;
}

export const MEMBER_DETAILS: Record<string, MemberDetail | undefined> = {
  mocoparfe,
  hanseorin,
  dangkey,
  uuhee,
  aerusolstice,
};

export const MEMBERS: Member[] = [
  {
    id: 'mocoparfe',
    nameKo: '모코 파르페',
    name: 'Moco Parfe',
    ink: '#6b2350',
    color: '#FF99FF',
    avatar: '/members/mocoparfe.png',
    profile: '/members/mocoparfe/profile.jpg',
    position: '바리스타',
  },
  {
    id: 'hanseorin',
    nameKo: '한서린',
    name: 'Han Seorin',
    ink: '#5a1016',
    color: '#FF6666',
    avatar: '/members/hanseorin.png',
    profile: '/members/hanseorin/profile.jpg',
    position: '매니저',
  },
  {
    id: 'dangkey',
    nameKo: '댕키',
    name: 'Dangkey',
    ink: '#6b4a12',
    color: '#FFCC33',
    avatar: '/members/dangkey.png',
    profile: '/members/dangkey/profile.jpg',
    position: '경비견',
  },
  {
    id: 'uuhee',
    nameKo: '유우희',
    name: 'Uuhee',
    ink: '#3f2a63',
    color: '#CC99FF',
    avatar: '/members/uuhee.png',
    profile: '/members/uuhee/profile.jpg',
    position: '청소부 (자칭 마스코트)',
  },
  {
    id: 'aerusolstice',
    nameKo: '에루 솔스티스',
    name: 'Aeru Solstice',
    ink: '#123a63',
    color: '#CCFFFF',
    avatar: '/members/aerusolstice.png',
    profile: '/members/aerusolstice/profile.jpg',
    position: '서빙',
  },
];
