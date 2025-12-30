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
  creator: User;
  isGravityOn: boolean;
  gravities?: Gravity[];
};

export type Gravity = {
  id: number;
  planetId: number;
  planet: Planet;
  createdAt: Date;
  creatorId: string;
  creator: User;
};
