export const API_SERVER_URL =
  "https://palindromically-gorgeous-sacha.ngrok-free.dev";

// export const API_SERVER_URL = "http://localhost:3000";

export const QUERY_KEYS = {
  user: {
    me: ["user", "me"],
  },
  planet: {
    universe: ["planet", "universe"],
    orbit: ["planet", "orbit"],
    userList: (userId: string) => ["planet", "userList", userId],
    byId: (postId: number) => ["planet", "byId", postId],
  },
};
