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
  }

export interface ProfileState {
    targetUserId: string | null,
    targetUserName: string | null,
    targetUserReputation: number,
    targetUserEmail: string | null,
    posts: (Post)[];
    comments: (Comment)[];
    loading: boolean;
    error: string | null;
    nextPagePost: number;
    nextPageComment: number;
  }
  
  const initialState: ProfileState = {
    targetUserId: null,
    targetUserName: null,
    targetUserReputation: 0,
    targetUserEmail: null,
    posts: [],
    comments: [],
    loading: false,
    error: null,
    nextPagePost: 0,
    nextPageComment: 0,
  };

  export const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
      // Add a reducer to update the state with new posts
      setTargetUser(state, action){
        state.targetUserId=action.payload.id;
        state.targetUserEmail=action.payload.email;
        state.targetUserName=action.payload.username;
        state.targetUserReputation=action.payload.reputation;
      },
      setPosts(state, action) {
        console.log('inside slice');
        console.log(action.payload.posts);
        state.posts = [...state.posts, ...action.payload.posts];
        state.nextPagePost = action.payload.hasMorePages ? state.nextPagePost + 1 : -2;
        //state.nextPage = action.payload.hasMorePages ? state.nextPage + 1 : -2;
      },
      setComments(state, action) {
        console.log('inside slice');
        console.log(action.payload.comments);
        state.comments = [...state.comments, ...action.payload.comments];
        state.nextPageComment = action.payload.hasMorePages ? state.nextPageComment + 1 : -2;
      },
      // Add a reducer to set the loading state
      setLoading(state, action) {
        state.loading = action.payload;
      },
      // Add a reducer to set an error message
      setError(state, action) {
        state.error = action.payload;
      },
      clearProfile(state){
        state.posts=[];
        state.nextPageComment=0;
        state.nextPagePost=0;
        state.comments=[];
        state.targetUserReputation=0;
      },
      upvoteFromProfile(state, action){
        // console.log(action.payload.postId);
        // state.posts.map((post) =>
        //     post.id === action.payload.postId
        //     ? { ...post, score: post.score + 1, hasUpvoted: true, hasDownvoted: false }
        //     : post
        // )
        console.log(action.payload.postId);
        if(action.payload.postId.startsWith('p')){
            const updatedPosts = state.posts.map((post) =>
            post.id === action.payload.postId
              ? { ...post, score: post.score + (post.hasDownvoted?2:1), hasUpvoted: true, hasDownvoted: false }
              : post
          );
        
          return {
            ...state,
            posts: updatedPosts,
          };
        }
        const updatedPosts = state.comments.map((post) =>
          post.id === action.payload.postId
            ? { ...post, score: post.score + (post.hasDownvoted?2:1), hasUpvoted: true, hasDownvoted: false }
            : post
        );
      
        return {
          ...state,
          comments: updatedPosts,
        };
      },
      downvoteFromProfile(state, action){
        // state.posts.map((post) =>
        //     post.id === action.payload.postId
        //     ? { ...post, score: post.score - 1,hasUpvoted: false, hasDownvoted: true }
        //     : post
        // )
        if(action.payload.postId.startsWith('p')){
            const updatedPosts = state.posts.map((post) =>
            post.id === action.payload.postId
              ? { ...post, score: post.score - (post.hasUpvoted?2:1), hasUpvoted: false, hasDownvoted: true }
              : post
          );
        
          return {
            ...state,
            posts: updatedPosts,
          };
        }
        const updatedPosts = state.comments.map((post) =>
          post.id === action.payload.postId
            ? { ...post, score: post.score - (post.hasUpvoted?2:1), hasUpvoted: false, hasDownvoted: true }
            : post
        );
      
        return {
          ...state,
          comments: updatedPosts,
        };
      },
      undoUpvoteFromProfile(state, action){
        // state.posts.map((post) =>
        //     post.id === action.payload.postId
        //     ? { ...post, score: post.score - 1, hasUpvoted: false }
        //     : post
        // )
        if(action.payload.postId.startsWith('p')){
            const updatedPosts = state.posts.map((post) =>
            post.id === action.payload.postId
              ? { ...post, score: post.score - 1, hasUpvoted: false }
              : post
          );
        
          return {
            ...state,
            posts: updatedPosts,
          };
        }
        const updatedPosts = state.comments.map((post) =>
          post.id === action.payload.postId
            ? { ...post, score: post.score - 1, hasUpvoted: false }
            : post
        );
      
        return {
          ...state,
          comments: updatedPosts,
        };
      },
      undoDownvoteFromProfile(state, action){
        // state.posts.map((post) =>
        //     post.id === action.payload.postId
        //     ? { ...post, score: post.score + 1, hasDownvoted: false}
        //     : post
        // )
        if(action.payload.postId.startsWith('p')){
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
        const updatedPosts = state.comments.map((post) =>
          post.id === action.payload.postId
            ? { ...post, score: post.score + 1, hasDownvoted: false }
            : post
        );
      
        return {
          ...state,
          comments: updatedPosts,
        };
      }
      // You can add more reducers here for specific actions related to post management
    },
  });
  
  // Export the actions
export const { setTargetUser, setPosts, setComments, setLoading, setError, clearProfile, upvoteFromProfile, downvoteFromProfile, undoUpvoteFromProfile, undoDownvoteFromProfile } = profileSlice.actions;


export default profileSlice.reducer;