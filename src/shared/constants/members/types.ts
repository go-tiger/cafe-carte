export interface MemberDetail {
  bio: string;
  age: string;
  anniversary: string;
  anniversaryLabel?: string;
  debutDate: string;
  fanName: string;
  mark: string;
  tags: {
    unified: string;
    clip: string;
    art: string;
  };
  links: {
    chzzk?: string;
    x?: string;
    youtube?: { url: string; label: string }[];
  };
}
