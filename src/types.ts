export type MutationCallbacks = {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  onMutate?: () => void;
  onSettled?: () => void;
};

export type User = {
  id: string;
  email: string;
  password?: string;
  githubId?: string;
  createdAt: Date;
  stargate?: Stargate;
};

export type Stargate = {
  id: number;
  starname?: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
  dob?: Date;
};

export type Planet = {
  id: number;
  content: string;
  imageUrls: string[];
  viewCount: number;
  gravityCount: number;
  moonCount: number;
  createdAt: Date;
  creatorId: string;
  isGravityOn: boolean;
  creator: User;
  // gravities?: Gravity[];
};
