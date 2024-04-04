import { configureStore } from "@reduxjs/toolkit";
import feedReducer from "./reducers/feedSlice";
import postCommentReducer from "./reducers/postCommentSlice";
import commentReducer from "./reducers/commentSlice";
import profileReducer from "./reducers/profileSlice";
import communityReducer from "./reducers/communitySlice";
import searchReducer from "./reducers/searchSlice"
import createPostReducer from "./reducers/createPostSlice" 
import createCommentReducer from "./reducers/createCommentSlice" 
import createCommunityReducer from "./reducers/createCommunitySlice"
import loginReducer from "./reducers/loginSlice" 

export const store = configureStore({
  reducer: {
    feed: feedReducer,
    postComment: postCommentReducer,
    comment: commentReducer,
    profile: profileReducer,
    community: communityReducer,
    search: searchReducer,
    createPost: createPostReducer,
    createComment: createCommentReducer,
    createCommunity: createCommunityReducer,
    login: loginReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;