export interface Member {
  id: string;
  nameKo: string;
  name: string;
  color: string;
  ink: string;
  avatar: string;
}

export const MEMBERS: Member[] = [
  {
    id: 'mocoparfe',
    nameKo: '모코 파르페',
    name: 'Moco Parfe',
    color: '#fba7d2',
    ink: '#6b2350',
    avatar: '/members/mocoparfe.avif',
  },
  {
    id: 'hanseorin',
    nameKo: '한서린',
    name: 'Han Seorin',
    color: '#f8515f',
    ink: '#5a1016',
    avatar: '/members/hanseorin.avif',
  },
  {
    id: 'dangkey',
    nameKo: '댕키',
    name: 'Dangkey',
    color: '#ffce90',
    ink: '#6b4a12',
    avatar: '/members/dangkey.avif',
  },
  {
    id: 'uuhee',
    nameKo: '유우희',
    name: 'Uuhee',
    color: '#ceb4f1',
    ink: '#3f2a63',
    avatar: '/members/uuhee.avif',
  },
  {
    id: 'aerusolstice',
    nameKo: '에루 솔스티스',
    name: 'Aeru Solstice',
    color: '#a7cdfb',
    ink: '#123a63',
    avatar: '/members/aerusolstice.avif',
  },
];
