import { configureStore } from "@reduxjs/toolkit";
import feedReducer from "./reducers/feedSlice";
import postCommentReducer from "./reducers/postCommentSlice";
import commentReducer from "./reducers/commentSlice";
import profileReducer from "./reducers/profileSlice";
import communityReducer from "./reducers/communitySlice";

export const store = configureStore({
  reducer: {
    feed: feedReducer,
    postComment: postCommentReducer,
    comment: commentReducer,
    profile: profileReducer,
    community: communityReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;