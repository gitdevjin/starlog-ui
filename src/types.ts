export type MutationCallbacks = {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  onMutate?: () => void;
  onSettled?: () => void;
};

export type UserEntity = {
  id: string;
  email: string;
  password?: string;
  githubId?: string;
  createdAt: Date;
  profile?: ProfileEntity;
};

export type ProfileEntity = {
  id: number;
  nickname?: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
  dob?: Date;
};

export type PostEntity = {
  id: number;
  content: string;
  imageUrls: string[];
  view: number;
  likeCount: number;
  authorId: string;
  createdAt: Date;
  user: UserEntity;
};
