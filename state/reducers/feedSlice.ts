import { createSlice } from "@reduxjs/toolkit";

// interface ModalState {
//     members: boolean,
//     mod: boolean
// }
interface Post {
    id: string; // should start with p
    title: string;
    content: string;
    author: string;
    score: number;
    createdAt: string; // Assuming it's a string representation of a date/time
    comments: string[]; // list of ids
    hidden: boolean;
    community: string;
    hideCount: number;
    showCount: number;
    authorName: string;
    communityName: string;
    hasUpvoted: boolean;
    hasDownvoted: boolean;
  }

export interface PostsState {
    posts: Post[];
    loading: boolean;
    error: string | null;
    nextPage: number;
  }
  
  const initialState: PostsState = {
    posts: [],
    loading: false,
    error: null,
    nextPage: 0
  };

// const modalSlice = createSlice({
//     name: "modal",
//     initialState,
//     reducers: {
//         toggleMembers: (state) => {
//             state.members = !state.members;
//         },
//         toggleMod: (state) => {
//             state.mod = !state.mod;
//         }
//     }
// });

export const feedSlice = createSlice({
    name: "feed",
    initialState,
    reducers: {
      // Add a reducer to update the state with new posts
      setPosts(state, action) {
        console.log('inside slice');
        console.log(action.payload.posts);
        state.posts = [...state.posts, ...action.payload.posts];
        state.nextPage = action.payload.hasMorePages ? state.nextPage + 1 : -2;
      },
      // Add a reducer to set the loading state
      setLoading(state, action) {
        state.loading = action.payload;
      },
      // Add a reducer to set an error message
      setError(state, action) {
        state.error = action.payload;
      },
      clearFeed(state){
        state.posts=[];
        state.nextPage=0;
      },
      upvoteFromFeed(state, action){
        // console.log(action.payload.postId);
        // state.posts.map((post) =>
        //     post.id === action.payload.postId
        //     ? { ...post, score: post.score + 1, hasUpvoted: true, hasDownvoted: false }
        //     : post
        // )
        console.log(action.payload.postId);
        const updatedPosts = state.posts.map((post) =>
          post.id === action.payload.postId
            ? { ...post, score: post.score + (post.hasDownvoted?2:1), hasUpvoted: true, hasDownvoted: false }
            : post
        );
      
        return {
          ...state,
          posts: updatedPosts,
        };
      },
      downvoteFromFeed(state, action){
        // state.posts.map((post) =>
        //     post.id === action.payload.postId
        //     ? { ...post, score: post.score - 1,hasUpvoted: false, hasDownvoted: true }
        //     : post
        // )
        const updatedPosts = state.posts.map((post) =>
          post.id === action.payload.postId
            ? { ...post, score: post.score - (post.hasUpvoted?2:1), hasUpvoted: false, hasDownvoted: true }
            : post
        );
      
        return {
          ...state,
          posts: updatedPosts,
        };
      },
      undoUpvoteFromFeed(state, action){
        // state.posts.map((post) =>
        //     post.id === action.payload.postId
        //     ? { ...post, score: post.score - 1, hasUpvoted: false }
        //     : post
        // )
        const updatedPosts = state.posts.map((post) =>
          post.id === action.payload.postId
            ? { ...post, score: post.score - 1, hasUpvoted: false }
            : post
        );
      
        return {
          ...state,
          posts: updatedPosts,
        };
      },
      undoDownvoteFromFeed(state, action){
        // state.posts.map((post) =>
        //     post.id === action.payload.postId
        //     ? { ...post, score: post.score + 1, hasDownvoted: false}
        //     : post
        // )
        const updatedPosts = state.posts.map((post) =>
          post.id === action.payload.postId
            ? { ...post, score: post.score + 1, hasDownvoted: false }
            : post
        );
      
        return {
          ...state,
          posts: updatedPosts,
        };
      }
      // You can add more reducers here for specific actions related to post management
    },
  });
  
  // Export the actions
export const { setPosts, setLoading, setError, clearFeed, undoDownvoteFromFeed, undoUpvoteFromFeed, upvoteFromFeed, downvoteFromFeed } = feedSlice.actions;


export default feedSlice.reducer;