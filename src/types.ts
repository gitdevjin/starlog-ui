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
  nickname?: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
  dob?: Date;
};
