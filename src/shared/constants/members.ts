export interface Member {
  id: string;
  nameKo: string;
  name: string;
  color: string;
  ink: string;
  avatar: string;
  position: string;
}

export const MEMBERS: Member[] = [
  {
    id: 'mocoparfe',
    nameKo: '모코 파르페',
    name: 'Moco Parfe',
    color: '#fba7d2',
    ink: '#6b2350',
    avatar: '/members/mocoparfe.png',
    position: '바리스타',
  },
  {
    id: 'hanseorin',
    nameKo: '한서린',
    name: 'Han Seorin',
    color: '#f8515f',
    ink: '#5a1016',
    avatar: '/members/hanseorin.png',
    position: '매니저',
  },
  {
    id: 'dangkey',
    nameKo: '댕키',
    name: 'Dangkey',
    color: '#ffce90',
    ink: '#6b4a12',
    avatar: '/members/dangkey.png',
    position: '경비견',
  },
  {
    id: 'uuhee',
    nameKo: '유우희',
    name: 'Uuhee',
    color: '#ceb4f1',
    ink: '#3f2a63',
    avatar: '/members/uuhee.png',
    position: '청소부 (자칭 마스코트)',
  },
  {
    id: 'aerusolstice',
    nameKo: '에루 솔스티스',
    name: 'Aeru Solstice',
    color: '#a7cdfb',
    ink: '#123a63',
    avatar: '/members/aerusolstice.png',
    position: '서빙',
  },
];
