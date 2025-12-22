// export const API_SERVER_URL =
//   "https://palindromically-gorgeous-sacha.ngrok-free.dev";

export const API_SERVER_URL = "http://localhost:3000";

export const QUERY_KEYS = {
  user: {
    me: ["user", "me"],
  },
  post: {
    list: ["post", "list"],
    userList: (userId: string) => ["post", "userList", userId],
    byId: (postId: number) => ["post", "byId", postId],
  },
};
