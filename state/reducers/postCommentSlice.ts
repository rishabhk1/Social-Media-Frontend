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
    isAppealed: boolean;
    hasShowvoted: boolean;
    hasHidevoted: boolean;
  }

  interface Comment {
    id: string; // should start with c
    content: string;
    author: string;
    score: number;
    createdAt: string; // Assuming it's a string representation of a date/time
    replies: string[]; // list of ids
    hidden: boolean;
    community: string;
    hideCount: number;
    showCount: number;
    authorName: string;
    communityName: string;
    hasUpvoted: boolean;
    hasDownvoted: boolean;
    isAppealed: boolean;
    hasShowvoted: boolean;
    hasHidevoted: boolean;
  }

export interface PostCommentState {
    posts: (Post | Comment)[];
    loading: boolean;
    error: string | null;
    nextPage: number;
  }
  
  const initialState: PostCommentState = {
    posts: [],
    loading: false,
    error: null,
    nextPage: 0
  };

  export const postCommentSlice = createSlice({
    name: "postComment",
    initialState,
    reducers: {
      // Add a reducer to update the state with new posts
      setPost(state, action) {
        console.log('inside slice');
        console.log(action.payload.posts);
        if(!action.payload.posts.hidden){
          state.posts = [action.payload.posts];
        }
        //state.nextPage = action.payload.hasMorePages ? state.nextPage + 1 : -2;
      },
      setComments(state, action) {
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
      clearPostComment(state){
        state.posts=[];
        state.nextPage=0;
        state.loading=false;
        state.error=null;
      },
      upvoteFromPC(state, action){
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
      downvoteFromPC(state, action){
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
      undoUpvoteFromPC(state, action){
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
      undoDownvoteFromPC(state, action){
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
      },
      deleteFromPC(state,action){
        const updatedPosts = state.posts.filter((post) =>
          post.id !== action.payload.postId
        )
        return {
          ...state,
          posts: updatedPosts,
        };
      },
      appealFromPC(state,action){
        const updatedPosts = state.posts.map((post) =>
          post.id === action.payload.postId
            ? { ...post, isAppealed: true }
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
export const { appealFromPC, deleteFromPC, setPost, setComments, setLoading, setError, clearPostComment, upvoteFromPC, downvoteFromPC, undoUpvoteFromPC, undoDownvoteFromPC } = postCommentSlice.actions;


export default postCommentSlice.reducer;